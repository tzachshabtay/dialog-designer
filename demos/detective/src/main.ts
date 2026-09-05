import type { AiAssetManifest } from "@ai-game-assets/core";
import { AiAssetDebugClient } from "@ai-game-assets/phaser";
import type { DialogDesignerManifest } from "@dialog-designer/core";
import { DialogDesignerDebugClient } from "@dialog-designer/phaser";
import Phaser from "phaser";
import { DetectiveScene } from "./DetectiveScene.js";

const params = new URLSearchParams(window.location.search);
const assetApi = params.get("assetApi") ?? "http://127.0.0.1:4097";
const dialogApi = params.get("dialogApi") ?? "http://127.0.0.1:4099";

type LoadedAiAssets = {
  manifest: AiAssetManifest;
  assetBaseUrl?: string;
  debugClient?: AiAssetDebugClient;
};

type LoadedDialogs = {
  manifest: DialogDesignerManifest;
  debugClient?: DialogDesignerDebugClient;
};

boot().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  const element = document.createElement("pre");
  element.textContent = message;
  element.style.cssText = "padding:24px;color:#ffe1cf;white-space:pre-wrap";
  document.body.append(element);
  throw error;
});

async function boot(): Promise<void> {
  const [aiAssets, dialogs] = await Promise.all([
    loadAiAssetsManifest(),
    loadDialogManifest()
  ]);

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: "game",
    width: 960,
    height: 640,
    backgroundColor: "#070a0f",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
      new DetectiveScene({
        aiAssets: aiAssets.manifest,
        aiAssetDebugClient: aiAssets.debugClient,
        assetBaseUrl: aiAssets.assetBaseUrl,
        dialogs: dialogs.manifest,
        dialogDebugClient: dialogs.debugClient,
        designersEnabled: import.meta.env.DEV
      })
    ]
  });
}

async function loadAiAssetsManifest(): Promise<LoadedAiAssets> {
  if (import.meta.env.DEV) {
    try {
      const debugClient = new AiAssetDebugClient(assetApi);
      return {
        manifest: await debugClient.getManifest(),
        assetBaseUrl: assetApi,
        debugClient
      };
    } catch (error) {
      console.warn("Falling back to bundled detective assets.", error);
    }
  }
  return {
    manifest: (await import("./assets.js")).assets,
    assetBaseUrl: import.meta.env.BASE_URL
  };
}

async function loadDialogManifest(): Promise<LoadedDialogs> {
  if (import.meta.env.DEV) {
    try {
      const debugClient = new DialogDesignerDebugClient(dialogApi);
      return {
        manifest: await debugClient.manifest(),
        debugClient
      };
    } catch (error) {
      console.warn("Falling back to bundled detective dialogs.", error);
    }
  }
  return { manifest: (await import("./dialogs.js")).dialogs };
}
