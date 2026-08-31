import assert from "node:assert/strict";
import test from "node:test";
import {
  dialogAudioKey,
  referencedDialogLineAssetIds
} from "../dist/index.js";

test("collects every referenced voice line, including disabled and duplicate uses", () => {
  const manifest = {
    schemaVersion: 1,
    dialogs: {
      case: {
        id: "case",
        name: "Case",
        enabled: true,
        entryNodeId: "block",
        nodes: {
          block: {
            id: "block",
            type: "block",
            name: "Block",
            enabled: false,
            lines: [
              { id: "a", enabled: false, voiceAssetId: "voice.a", lineAssetId: "voice.line.z" },
              { id: "b", enabled: true, voiceAssetId: "voice.a", lineAssetId: "voice.line.a" },
              { id: "c", enabled: true, voiceAssetId: "voice.a", lineAssetId: "voice.line.z" }
            ]
          }
        }
      }
    }
  };

  assert.deepEqual(referencedDialogLineAssetIds(manifest), ["voice.line.a", "voice.line.z"]);
  assert.equal(dialogAudioKey("voice.line.a"), "voice.line.a");
});

test("target-specific audio keys match the assets queued by the loader", async () => {
  const { loadDialogAudioAssets } = await import("../dist/index.js");
  const loaded = [];
  const scene = {
    load: {
      audio(key, file) {
        loaded.push([key, file]);
      }
    }
  };
  const dialogs = {
    schemaVersion: 1,
    dialogs: {
      case: {
        id: "case",
        name: "Case",
        enabled: true,
        entryNodeId: "block",
        nodes: {
          block: {
            id: "block",
            type: "block",
            name: "Block",
            enabled: true,
            lines: [{
              id: "line",
              enabled: true,
              voiceAssetId: "voice.a",
              lineAssetId: "voice.line.a"
            }]
          }
        }
      }
    }
  };
  const aiAssets = {
    schemaVersion: 1,
    assets: {
      "voice.line.a": {
        id: "voice.line.a",
        kind: "voice-line",
        prompt: "Base direction",
        activeVersion: "",
        versions: {}
      },
      "voice.line.a.localized": {
        id: "voice.line.a.localized",
        kind: "voice-line",
        prompt: "Localized direction",
        activeVersion: "take",
        versions: {
          take: {
            name: "take",
            file: "/localized.mp3",
            prompt: "Localized direction",
            createdAt: "2026-01-01T00:00:00.000Z"
          }
        }
      }
    },
    targets: {
      localized: {
        id: "localized",
        variants: {
          "voice.line.a": "voice.line.a.localized"
        }
      }
    }
  };

  const queued = loadDialogAudioAssets(scene, dialogs, aiAssets, {
    targetId: "localized"
  });
  assert.equal(queued[0].asset.id, "voice.line.a.localized");
  assert.deepEqual(loaded, [["voice.line.a.localized", "/localized.mp3"]]);
  assert.equal(
    dialogAudioKey("voice.line.a", { aiAssets, targetId: "localized" }),
    loaded[0][0]
  );
});
