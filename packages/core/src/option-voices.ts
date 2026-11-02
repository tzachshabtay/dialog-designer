import type { AiAssetManifest } from "@ai-game-assets/core";
import type { DialogDesignerManifest } from "./types.js";

export function dialogOptionVoiceLineId(dialogId: string, nodeId: string, optionId: string): string {
  let hash = 14695981039346656037n;
  for (const byte of new TextEncoder().encode(JSON.stringify([dialogId, nodeId, optionId])))
    hash = BigInt.asUintN(64, (hash ^ BigInt(byte)) * 1099511628211n);
  return `voice.line.dialog-option.${hash.toString(16).padStart(16, "0")}`;
}

/** Fill spoken-option references in the manifest and return updated voice assets.
 * Existing takes are retained; the runtime suppresses recordings with stale wording/voice. */
export function syncDialogOptionVoiceLines(manifest: DialogDesignerManifest, source: AiAssetManifest,
  defaultVoiceAssetId?: string): AiAssetManifest {
  const assets = structuredClone(source);
  for (const dialog of Object.values(manifest.dialogs)) for (const node of Object.values(dialog.nodes)) {
    if (node.type !== "decision") continue;
    for (const option of node.options) {
      if (!option.spokenByCharacter) continue;
      const voiceId = option.voiceAssetId ?? defaultVoiceAssetId;
      const voice = voiceId ? assets.assets[voiceId] : undefined;
      if (!voice || voice.kind !== "voice") throw new Error(`Choose a voice for option "${option.text}".`);
      const id = option.lineAssetId ?? dialogOptionVoiceLineId(dialog.id, node.id, option.id);
      const existing = assets.assets[id];
      if (existing && existing.kind !== "voice-line") throw new Error(`Option voice line id is already used: ${id}`);
      const asset = existing ?? { id, kind: "voice-line" as const, prompt: "Natural conversational delivery.", activeVersion: "", versions: {} };
      asset.voiceSettings = { ...asset.voiceSettings, voiceAssetId: voice.id, text: option.text,
        direction: asset.voiceSettings?.direction ?? "Natural conversational delivery." };
      assets.assets[id] = asset;
      for (const other of Object.values(assets.assets)) if (other.kind === "voice" && other.id !== voice.id) {
        for (const [key, link] of Object.entries(other.linkedAnimationAssets ?? {})) if (link.assetId === id) delete other.linkedAnimationAssets![key];
      }
      (voice.linkedAnimationAssets ??= {})[id] = { assetId:id, label:`${dialog.name} · ${option.text}` };
      (assets.assetPaths ??= {})[id] = ["Voices"];
      option.voiceAssetId = voice.id; option.lineAssetId = id;
    }
  }
  return assets;
}
