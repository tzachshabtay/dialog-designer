import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { writeManifest } from "@ai-game-assets/dev";
import {
  createDialogDesignerDevServer,
  writeDialogManifestDirectory
} from "../dist/index.js";

test("dev server exposes manifest, promotion, and voice-line routes", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dialog-designer-server-"));
  const manifestPath = path.join(root, "dialogs");
  const aiAssetsManifestPath = path.join(root, "ai-assets");
  let server;

  try {
    await mkdir(aiAssetsManifestPath, { recursive: true });
    await writeDialogManifestDirectory(manifestPath, {
      schemaVersion: 1,
      dialogs: {}
    });
    await writeManifest(aiAssetsManifestPath, {
      schemaVersion: 1,
      assets: {
        "voice.detective": {
          id: "voice.detective",
          kind: "voice",
          prompt: "A focused detective.",
          voiceSettings: {
            provider: "elevenlabs",
            voiceId: "detective-provider-id"
          },
          activeVersion: "voice-v1",
          versions: {
            "voice-v1": {
              name: "voice-v1",
              file: "/assets/voice.detective.voice-v1.mp3",
              prompt: "A focused detective.",
              createdAt: "2026-01-01T00:00:00.000Z",
              voiceSettings: {
                provider: "elevenlabs",
                voiceId: "detective-provider-id"
              }
            }
          }
        }
      }
    });

    server = createDialogDesignerDevServer({
      manifestPath,
      aiAssetsManifestPath,
      port: 0
    });
    const address = await server.listen();
    const endpoint = `http://${address.host}:${address.port}`;

    const manifestResponse = await fetch(`${endpoint}/__dialog-designer/manifest`);
    assert.equal(manifestResponse.status, 200);
    assert.deepEqual(await manifestResponse.json(), {
      schemaVersion: 1,
      dialogs: {},
      dialogPaths: {}
    });

    const lineResponse = await fetch(`${endpoint}/__dialog-designer/voice-line`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voiceAssetId: "voice.detective",
        text: "Start from the beginning.",
        direction: "Firm, patient, and observant.",
        assetId: "voice.line.detective.beginning",
        label: "Start from the beginning"
      })
    });
    assert.equal(lineResponse.status, 200);
    const line = await lineResponse.json();
    assert.equal(line.lineAssetId, "voice.line.detective.beginning");
    assert.equal(line.asset.kind, "voice-line");
    assert.equal(line.aiAssets.assets[line.lineAssetId].voiceSettings.text, "Start from the beginning.");

    const saveResponse = await fetch(`${endpoint}/__dialog-designer/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        manifest: {
          schemaVersion: 1,
          dialogs: {}
        }
      })
    });
    assert.equal(saveResponse.status, 200);
    assert.deepEqual((await saveResponse.json()).manifest, {
      schemaVersion: 1,
      dialogs: {}
    });
  } finally {
    await server?.close();
    await rm(root, { recursive: true, force: true });
  }
});
