import {
  resolveTargetAssetId,
  type AiAssetManifest,
  type ResolvedAiAsset
} from "@ai-game-assets/core";
import { aiTextureKey, loadAiAudioAsset } from "@ai-game-assets/phaser";
import type { DialogDesignerManifest } from "@dialog-designer/core";
import type Phaser from "phaser";

export type LoadDialogAudioOptions = {
  baseUrl?: string;
  targetId?: string;
};

export type DialogAudioKeyOptions = {
  aiAssets: AiAssetManifest;
  targetId?: string;
};

/**
 * Queues every generated voice line referenced by a dialog, including disabled
 * branches that game state may enable later. Ungenerated lines remain valid
 * text-only turns and are intentionally skipped by the Phaser loader.
 */
export function loadDialogAudioAssets(
  scene: Phaser.Scene,
  dialogs: DialogDesignerManifest,
  aiAssets: AiAssetManifest,
  options: LoadDialogAudioOptions = {}
): ResolvedAiAsset[] {
  return referencedDialogLineAssetIds(dialogs)
    .map((assetId) => loadAiAudioAsset(scene, aiAssets, assetId, options))
    .filter((asset): asset is ResolvedAiAsset => Boolean(asset));
}

export function referencedDialogLineAssetIds(manifest: DialogDesignerManifest): string[] {
  const ids = new Set<string>();
  for (const dialog of Object.values(manifest.dialogs)) {
    for (const node of Object.values(dialog.nodes)) {
      if (node.type !== "block") continue;
      for (const line of node.lines) ids.add(line.lineAssetId);
    }
  }
  return [...ids].sort((left, right) => left.localeCompare(right));
}

export function dialogAudioKey(
  lineAssetId: string,
  options?: DialogAudioKeyOptions
): string {
  const assetId = options
    ? resolveTargetAssetId(options.aiAssets, lineAssetId, options.targetId)
    : lineAssetId;
  return aiTextureKey({ assetId });
}
