import type { AiAssetManifest } from "@ai-game-assets/core";
import {
  DialogRuntime,
  type DialogDesignerManifest,
  type DialogRuntimeEventMap,
  type DialogRuntimeOptions
} from "@dialog-designer/core";
import type Phaser from "phaser";

export type PhaserDialogRuntimeOptions = DialogRuntimeOptions & {
  /** Prefix used when forwarding core runtime events onto scene.events. */
  eventPrefix?: string;
};

/**
 * Core dialog traversal with an optional Phaser event-bus bridge. It does not
 * create text, choices, audio objects, cameras, or input—the game owns those.
 */
export class PhaserDialogRuntime extends DialogRuntime {
  readonly scene: Phaser.Scene;
  readonly eventPrefix: string;
  private readonly removeForwarders: Array<() => void> = [];
  private destroyed = false;

  constructor(
    scene: Phaser.Scene,
    dialogs: DialogDesignerManifest,
    aiAssets: AiAssetManifest,
    options: PhaserDialogRuntimeOptions = {}
  ) {
    super(dialogs, aiAssets, options);
    this.scene = scene;
    this.eventPrefix = options.eventPrefix ?? "dialog";

    const eventNames = [
      "dialog:start",
      "dialog:end",
      "node:enter",
      "node:skip",
      "line:ready",
      "line:said",
      "decision:ready",
      "option:selected",
      "enabled:change"
    ] as const satisfies readonly (keyof DialogRuntimeEventMap)[];

    for (const eventName of eventNames) {
      this.removeForwarders.push(this.on(eventName, (payload) => {
        this.scene.events.emit(`${this.eventPrefix}:${eventName}`, payload);
      }));
    }
    this.scene.events.once("shutdown", this.destroy, this);
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.stop();
    this.scene.events.off("shutdown", this.destroy, this);
    for (const remove of this.removeForwarders.splice(0)) remove();
  }
}
