import type {
  AiAssetDefinition,
  AiAssetManifest
} from "@ai-game-assets/core";

export type VoiceAiAsset = AiAssetDefinition & { kind: "voice" };
export type VoiceLineAiAsset = AiAssetDefinition & { kind: "voice-line" };

export function isVoiceAsset(
  asset: AiAssetDefinition | undefined
): asset is VoiceAiAsset {
  return asset?.kind === "voice";
}

export function isVoiceLineAsset(
  asset: AiAssetDefinition | undefined
): asset is VoiceLineAiAsset {
  return asset?.kind === "voice-line";
}

export function voiceAssets(manifest: AiAssetManifest): VoiceAiAsset[] {
  return Object.values(manifest.assets)
    .filter(isVoiceAsset)
    .sort((left, right) => readableAssetName(left.id).localeCompare(readableAssetName(right.id)));
}

export function voiceAssetIds(manifest: AiAssetManifest): string[] {
  return voiceAssets(manifest).map((asset) => asset.id);
}

export function voiceLineAssets(
  manifest: AiAssetManifest,
  voiceAssetId?: string
): VoiceLineAiAsset[] {
  return Object.values(manifest.assets)
    .filter(isVoiceLineAsset)
    .filter((asset) => {
      if (!voiceAssetId) return true;
      const configuredVoiceId = asset.versions[asset.activeVersion]?.voiceSettings?.voiceAssetId
        ?? asset.voiceSettings?.voiceAssetId;
      return configuredVoiceId === undefined || configuredVoiceId === voiceAssetId;
    })
    .sort((left, right) => voiceLineLabel(left).localeCompare(voiceLineLabel(right)));
}

export function voiceLineAssetIds(
  manifest: AiAssetManifest,
  voiceAssetId?: string
): string[] {
  return voiceLineAssets(manifest, voiceAssetId).map((asset) => asset.id);
}

export function voiceLineText(asset: AiAssetDefinition | undefined): string {
  if (!isVoiceLineAsset(asset)) return "";
  const version = asset.versions[asset.activeVersion];
  return version?.voiceSettings?.text
    ?? asset.voiceSettings?.text
    ?? "";
}

export function voiceLineDirection(asset: AiAssetDefinition | undefined): string | undefined {
  if (!isVoiceLineAsset(asset)) return undefined;
  const version = asset.versions[asset.activeVersion];
  return version?.voiceSettings?.direction
    ?? version?.prompt
    ?? asset.voiceSettings?.direction
    ?? asset.prompt;
}

export function voiceLineLabel(asset: VoiceLineAiAsset): string {
  const text = voiceLineText(asset).trim();
  const shortText = text.length > 58 ? `${text.slice(0, 55).trimEnd()}…` : text;
  return shortText ? `${shortText} · ${asset.id}` : readableAssetName(asset.id);
}

export function readableAssetName(id: string): string {
  return id
    .split(/[._-]+/g)
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function suggestVoiceLineAssetId(
  manifest: AiAssetManifest,
  voiceAssetId: string,
  text: string
): string {
  const voicePart = voiceAssetId
    .replace(/^voice[._-]?/i, "")
    .replace(/[^a-zA-Z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .toLowerCase() || "speaker";
  const textPart = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .split(".")
    .filter(Boolean)
    .slice(0, 6)
    .join(".") || "line";
  const base = `voice.line.${voicePart}.${textPart}`;
  if (!manifest.assets[base]) return base;

  let suffix = 2;
  while (manifest.assets[`${base}.${suffix}`]) suffix += 1;
  return `${base}.${suffix}`;
}
