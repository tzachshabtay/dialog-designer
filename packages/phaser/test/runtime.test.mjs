import assert from "node:assert/strict";
import test from "node:test";
import { PhaserDialogRuntime } from "../dist/index.js";

class SceneEvents {
  listeners = new Map();

  on(event, listener, context) {
    const entries = this.listeners.get(event) ?? [];
    entries.push({ listener, context, once: false });
    this.listeners.set(event, entries);
    return this;
  }

  once(event, listener, context) {
    const entries = this.listeners.get(event) ?? [];
    entries.push({ listener, context, once: true });
    this.listeners.set(event, entries);
    return this;
  }

  off(event, listener, context) {
    const entries = this.listeners.get(event) ?? [];
    this.listeners.set(event, entries.filter((entry) => (
      entry.listener !== listener || entry.context !== context
    )));
    return this;
  }

  emit(event, ...args) {
    const entries = [...(this.listeners.get(event) ?? [])];
    for (const entry of entries) {
      if (entry.once) this.off(event, entry.listener, entry.context);
      entry.listener.apply(entry.context, args);
    }
    return entries.length > 0;
  }
}

const dialogs = {
  schemaVersion: 1,
  dialogs: {
    witness: {
      id: "witness",
      name: "Witness",
      enabled: true,
      entryNodeId: "opening",
      nodes: {
        opening: {
          id: "opening",
          type: "block",
          name: "Opening",
          enabled: true,
          lines: [{
            id: "hello",
            enabled: true,
            voiceAssetId: "voice.witness",
            lineAssetId: "voice.line.hello"
          }]
        }
      }
    }
  }
};

const aiAssets = {
  schemaVersion: 1,
  assets: {
    "voice.witness": {
      id: "voice.witness",
      kind: "voice",
      prompt: "Witness voice",
      activeVersion: "",
      versions: {}
    },
    "voice.line.hello": {
      id: "voice.line.hello",
      kind: "voice-line",
      prompt: "Carefully",
      voiceSettings: {
        voiceAssetId: "voice.witness",
        text: "I saw the door open."
      },
      activeVersion: "",
      versions: {}
    }
  }
};

test("Phaser adapter only forwards turns and binds runtime lifetime to the scene", () => {
  const events = new SceneEvents();
  const scene = { events };
  const forwarded = [];
  events.on("case:line:ready", (turn) => forwarded.push(["line", turn.resolved.text]));
  events.on("case:dialog:end", (turn) => forwarded.push(["end", turn.reason]));

  const runtime = new PhaserDialogRuntime(scene, dialogs, aiAssets, {
    eventPrefix: "case"
  });
  const first = runtime.start("witness");
  assert.equal(first.type, "line");
  assert.deepEqual(forwarded, [["line", "I saw the door open."]]);

  events.emit("shutdown");
  assert.equal(runtime.snapshot().status, "ended");
  assert.deepEqual(forwarded, [
    ["line", "I saw the door open."],
    ["end", "stopped"]
  ]);

  runtime.start("witness");
  assert.equal(forwarded.length, 2);
});
