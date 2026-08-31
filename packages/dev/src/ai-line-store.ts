import path from "node:path";
import {
  assertAsset,
  assertManifest,
  type AiAssetDefinition,
  type AiAssetManifest,
  type AiVoiceGenerationSettings
} from "@ai-game-assets/core";
import {
  readManifest,
  writeManifest,
  writeManifestModule
} from "@ai-game-assets/dev";

export type AiVoiceLineStoreOptions = {
  manifestPath: string;
  manifestModulePath?: string;
};

export type CreateAiVoiceLineRequest = {
  voiceAssetId: string;
  text: string;
  direction?: string;
  assetId?: string;
  label?: string;
};

export type CreateAiVoiceLineResult = {
  aiAssets: AiAssetManifest;
  asset: AiAssetDefinition;
  lineAssetId: string;
};

const defaultDirection = "Natural conversational delivery.";
const manifestWriteQueues = new Map<string, Promise<void>>();

export async function createAiVoiceLine(
  options: AiVoiceLineStoreOptions,
  request: CreateAiVoiceLineRequest
): Promise<CreateAiVoiceLineResult> {
  const manifestPath = path.resolve(options.manifestPath);

  return withManifestWriteLock(manifestPath, async () => {
    const normalized = normalizeRequest(request);
    const manifest = await readManifest(manifestPath);
    const voiceAsset = manifest.assets[normalized.voiceAssetId];

    if (!voiceAsset || voiceAsset.kind !== "voice") {
      throw new Error(
        `Unknown or non-voice AI asset "${normalized.voiceAssetId}".`
      );
    }

    const lineAssetId = resolveLineAssetId(manifest, normalized);
    const existing = manifest.assets[lineAssetId];
    const lineAsset = existing ?? createVoiceLineAsset(voiceAsset, lineAssetId, normalized);

    if (existing && !matchesVoiceLine(existing, normalized)) {
      throw new Error(`AI asset "${lineAssetId}" already exists with different voice-line content.`);
    }

    if (!existing) {
      assertAsset(lineAsset);
      manifest.assets[lineAssetId] = lineAsset;
      manifest.assetPaths = {
        ...manifest.assetPaths,
        [lineAssetId]: ["Voices"]
      };
    }

    linkVoiceLine(manifest, normalized.voiceAssetId, lineAssetId, normalized.label);
    assertManifest(manifest);
    await writeManifest(manifestPath, manifest);

    if (options.manifestModulePath) {
      await writeManifestModule(options.manifestModulePath, manifest);
    }

    return {
      aiAssets: manifest,
      asset: manifest.assets[lineAssetId]!,
      lineAssetId
    };
  });
}

type NormalizedVoiceLineRequest = {
  voiceAssetId: string;
  text: string;
  direction: string;
  assetId?: string;
  label: string;
};

function normalizeRequest(request: CreateAiVoiceLineRequest): NormalizedVoiceLineRequest {
  const voiceAssetId = requiredString(request.voiceAssetId, "voiceAssetId");
  const text = requiredString(request.text, "text");
  const direction = request.direction?.trim() || defaultDirection;
  const label = request.label?.trim() || truncateLabel(text);
  const assetId = request.assetId?.trim() || undefined;

  if (assetId && !isSafeAssetId(assetId)) {
    throw new Error("assetId may contain only letters, numbers, dots, underscores, and hyphens.");
  }

  return { voiceAssetId, text, direction, assetId, label };
}

function resolveLineAssetId(
  manifest: AiAssetManifest,
  request: NormalizedVoiceLineRequest
): string {
  if (request.assetId) return request.assetId;

  const suffix = slugify(request.label) || "dialog-line";
  const baseId = `voice.line.${suffix}`;
  let candidate = baseId;
  let index = 2;

  while (manifest.assets[candidate]) {
    if (matchesVoiceLine(manifest.assets[candidate]!, request)) return candidate;
    candidate = `${baseId}-${index}`;
    index += 1;
  }

  return candidate;
}

function createVoiceLineAsset(
  voiceAsset: AiAssetDefinition,
  assetId: string,
  request: NormalizedVoiceLineRequest
): AiAssetDefinition {
  const activeVoiceSettings = voiceAsset.versions[voiceAsset.activeVersion]?.voiceSettings;
  const provider = activeVoiceSettings?.provider
    ?? voiceAsset.voiceSettings?.provider
    ?? voiceAsset.audioSettings?.provider
    ?? "elevenlabs";
  const voiceSettings: AiVoiceGenerationSettings = {
    provider,
    voiceAssetId: request.voiceAssetId,
    text: request.text,
    direction: request.direction
  };

  return {
    id: assetId,
    kind: "voice-line",
    prompt: request.direction,
    audioSettings: {
      provider,
      format: voiceAsset.audioSettings?.format ?? "mp3",
      durationSeconds: voiceAsset.audioSettings?.durationSeconds ?? 2,
      loop: false
    },
    voiceSettings,
    activeVersion: "",
    versions: {}
  };
}

function matchesVoiceLine(
  asset: AiAssetDefinition,
  request: NormalizedVoiceLineRequest
): boolean {
  if (asset.kind !== "voice-line") return false;
  const settings = {
    ...asset.voiceSettings,
    ...asset.versions[asset.activeVersion]?.voiceSettings
  };

  return settings.voiceAssetId === request.voiceAssetId
    && settings.text === request.text
    && (settings.direction?.trim() || defaultDirection) === request.direction;
}

function linkVoiceLine(
  manifest: AiAssetManifest,
  voiceAssetId: string,
  lineAssetId: string,
  label: string
): void {
  const voiceAsset = manifest.assets[voiceAssetId]!;
  const linked = { ...voiceAsset.linkedAnimationAssets };
  const existing = Object.entries(linked).find(([, value]) => value.assetId === lineAssetId);

  if (!existing) {
    const baseKey = slugify(label) || slugify(lineAssetId) || "dialog-line";
    let key = baseKey;
    let index = 2;

    while (linked[key] && linked[key]!.assetId !== lineAssetId) {
      key = `${baseKey}-${index}`;
      index += 1;
    }

    linked[key] = { label, assetId: lineAssetId };
  }

  manifest.assets[voiceAssetId] = {
    ...voiceAsset,
    linkedAnimationAssets: linked
  };
}

async function withManifestWriteLock<T>(
  manifestPath: string,
  operation: () => Promise<T>
): Promise<T> {
  const previous = manifestWriteQueues.get(manifestPath) ?? Promise.resolve();
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const queued = previous.catch(() => undefined).then(() => gate);
  manifestWriteQueues.set(manifestPath, queued);

  await previous.catch(() => undefined);
  try {
    return await operation();
  } finally {
    release();
    if (manifestWriteQueues.get(manifestPath) === queued) {
      manifestWriteQueues.delete(manifestPath);
    }
  }
}

function requiredString(value: string, label: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value.trim();
}

function truncateLabel(value: string): string {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length <= 64 ? compact : `${compact.slice(0, 61).trimEnd()}...`;
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64)
    .toLowerCase();
}

function isSafeAssetId(value: string): boolean {
  return value.length <= 180 && /^[a-zA-Z0-9._-]+$/.test(value);
}
