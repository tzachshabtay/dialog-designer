import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { readManifest, writeManifest } from "@ai-game-assets/dev";
import { createAiVoiceLine } from "../dist/index.js";

function voiceManifest() {
  return {
    schemaVersion: 1,
    assets: {
      "voice.suspect": {
        id: "voice.suspect",
        kind: "voice",
        prompt: "A guarded suspect with a calm, precise voice.",
        audioSettings: {
          provider: "elevenlabs",
          format: "mp3",
          durationSeconds: 2,
          loop: false
        },
        voiceSettings: {
          provider: "elevenlabs",
          voiceId: "voice-provider-id"
        },
        activeVersion: "voice-v1",
        versions: {
          "voice-v1": {
            name: "voice-v1",
            file: "/assets/voice.suspect.voice-v1.mp3",
            prompt: "A guarded suspect with a calm, precise voice.",
            createdAt: "2026-01-01T00:00:00.000Z",
            voiceSettings: {
              provider: "elevenlabs",
              voiceId: "voice-provider-id"
            }
          }
        }
      }
    }
  };
}

test("voice-line creation is idempotent and links the base voice", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dialog-designer-ai-line-"));
  const manifestPath = path.join(root, "ai-assets");

  try {
    await mkdir(manifestPath, { recursive: true });
    await writeManifest(manifestPath, voiceManifest());
    const request = {
      voiceAssetId: "voice.suspect",
      text: "I never entered the study.",
      direction: "Measured, but hiding anxiety.",
      label: "Denies entering study"
    };
    const first = await createAiVoiceLine({ manifestPath }, request);
    const second = await createAiVoiceLine({ manifestPath }, request);

    assert.equal(second.lineAssetId, first.lineAssetId);
    assert.equal(second.asset.activeVersion, "");
    assert.deepEqual(second.asset.versions, {});
    assert.equal(second.asset.voiceSettings.voiceAssetId, "voice.suspect");
    assert.equal(second.asset.voiceSettings.text, request.text);
    assert.equal(second.asset.voiceSettings.direction, request.direction);

    const persisted = await readManifest(manifestPath);
    const links = Object.values(persisted.assets["voice.suspect"].linkedAnimationAssets ?? {});
    assert.equal(links.filter((link) => link.assetId === first.lineAssetId).length, 1);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("omitted asset ids receive a unique suffix on content collisions", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dialog-designer-ai-unique-"));
  const manifestPath = path.join(root, "ai-assets");

  try {
    await mkdir(manifestPath, { recursive: true });
    await writeManifest(manifestPath, voiceManifest());
    const first = await createAiVoiceLine({ manifestPath }, {
      voiceAssetId: "voice.suspect",
      text: "No comment.",
      label: "No comment"
    });
    const second = await createAiVoiceLine({ manifestPath }, {
      voiceAssetId: "voice.suspect",
      text: "I want my lawyer.",
      label: "No comment"
    });

    assert.equal(first.lineAssetId, "voice.line.no-comment");
    assert.equal(second.lineAssetId, "voice.line.no-comment-2");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
