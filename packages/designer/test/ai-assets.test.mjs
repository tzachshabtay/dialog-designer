import assert from "node:assert/strict";
import test from "node:test";
import {
  suggestVoiceLineAssetId,
  voiceAssetIds,
  voiceLineAssetIds,
  voiceLineDirection,
  voiceLineText
} from "../dist/index.js";

const manifest = {
  schemaVersion: 1,
  assets: {
    "voice.ada": {
      id: "voice.ada",
      kind: "voice",
      prompt: "Ada",
      activeVersion: "",
      versions: {}
    },
    "voice.bram": {
      id: "voice.bram",
      kind: "voice",
      prompt: "Bram",
      activeVersion: "",
      versions: {}
    },
    "line.moved": {
      id: "line.moved",
      kind: "voice-line",
      prompt: "Old direction",
      voiceSettings: {
        voiceAssetId: "voice.ada",
        text: "Old text"
      },
      activeVersion: "new-take",
      versions: {
        "new-take": {
          name: "new-take",
          file: "/new.mp3",
          prompt: "New direction",
          createdAt: "2026-01-01T00:00:00.000Z",
          voiceSettings: {
            voiceAssetId: "voice.bram",
            text: "New text",
            direction: "Under his breath"
          }
        }
      }
    }
  }
};

test("voice-line pickers respect active-version voice metadata", () => {
  assert.deepEqual(voiceAssetIds(manifest), ["voice.ada", "voice.bram"]);
  assert.deepEqual(voiceLineAssetIds(manifest, "voice.ada"), []);
  assert.deepEqual(voiceLineAssetIds(manifest, "voice.bram"), ["line.moved"]);
  assert.equal(voiceLineText(manifest.assets["line.moved"]), "New text");
  assert.equal(voiceLineDirection(manifest.assets["line.moved"]), "Under his breath");
});

test("director notes never become spoken text", () => {
  const notesOnly = {
    id: "line.notes-only",
    kind: "voice-line",
    prompt: "Measured, with a guarded pause",
    voiceSettings: { voiceAssetId: "voice.ada" },
    activeVersion: "take-1",
    versions: {
      "take-1": {
        name: "take-1",
        file: "/take-1.mp3",
        prompt: "A brittle whisper",
        createdAt: "2026-01-01T00:00:00.000Z"
      }
    }
  };

  assert.equal(voiceLineText(notesOnly), "");
  assert.equal(voiceLineDirection(notesOnly), "A brittle whisper");
});

test("suggested ids follow AI Assets voice.line convention and avoid collisions", () => {
  const first = suggestVoiceLineAssetId(manifest, "voice.ada", "The clock never chimed!");
  assert.equal(first, "voice.line.ada.the.clock.never.chimed");
  manifest.assets[first] = {
    id: first,
    kind: "voice-line",
    prompt: "Measured",
    voiceSettings: { voiceAssetId: "voice.ada", text: "The clock never chimed!" },
    activeVersion: "",
    versions: {}
  };
  assert.equal(
    suggestVoiceLineAssetId(manifest, "voice.ada", "The clock never chimed!"),
    `${first}.2`
  );
});
