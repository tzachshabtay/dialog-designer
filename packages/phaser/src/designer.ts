import type { AiAssetManifest } from "@ai-game-assets/core";
import type { DialogDesignerManifest } from "@dialog-designer/core";
import {
  installDialogDesigner,
  type DialogDesigner,
  type DialogDesignerOptions
} from "@dialog-designer/designer";
import type Phaser from "phaser";

export type PhaserDialogDesignerOptions = Omit<
  DialogDesignerOptions,
  "manifest" | "aiAssets"
> & {
  scene: Phaser.Scene;
  manifest: DialogDesignerManifest;
  aiAssets: AiAssetManifest;
};

export type InstalledPhaserDialogDesigner = {
  designer: DialogDesigner;
  destroy(): void;
};

/**
 * Installs the engine-neutral dialog tree panel and binds its lifecycle to a
 * Phaser scene. Gameplay rendering and conversation controls remain entirely
 * game-owned.
 */
export function installPhaserDialogDesigner(
  options: PhaserDialogDesignerOptions
): InstalledPhaserDialogDesigner {
  const designer = installDialogDesigner(options);
  let destroyed = false;
  const destroy = (): void => {
    if (destroyed) return;
    destroyed = true;
    options.scene.events.off("shutdown", destroy);
    designer.destroy();
  };
  options.scene.events.once("shutdown", destroy);
  return { designer, destroy };
}
