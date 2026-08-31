import assert from "node:assert/strict";
import test from "node:test";
import {
  DialogRuntime,
  assertDialogManifest,
  defineDialogManifest,
  resolveDialogLine,
  targetKey
} from "../dist/index.js";

const aiAssets = {
  schemaVersion: 1,
  assets: {
    "voice.detective": {
      id: "voice.detective",
      kind: "voice",
      prompt: "Measured detective voice",
      voiceSettings: { previewText: "Tell me what happened." },
      activeVersion: "",
      versions: {}
    },
    "voice.line.open": {
      id: "voice.line.open",
      kind: "voice-line",
      prompt: "Quietly observant",
      voiceSettings: {
        voiceAssetId: "voice.detective",
        text: "The clock is lying.",
        direction: "Quietly observant"
      },
      activeVersion: "",
      versions: {}
    },
    "voice.line.generated": {
      id: "voice.line.generated",
      kind: "voice-line",
      prompt: "Certain",
      voiceSettings: {
        voiceAssetId: "voice.detective",
        text: "Asset-level text"
      },
      activeVersion: "take-one",
      versions: {
        "take-one": {
          name: "take-one",
          file: "/assets/take-one.mp3",
          prompt: "Certain",
          createdAt: "2026-01-01T00:00:00.000Z",
          voiceSettings: {
            voiceAssetId: "voice.detective",
            text: "Generated text",
            direction: "Firmly"
          }
        }
      }
    }
  }
};

function manifest() {
  return defineDialogManifest({
    schemaVersion: 1,
    dialogs: {
      interview: {
        id: "interview",
        name: "Interview",
        enabled: true,
        entryNodeId: "opening",
        nodes: {
          opening: {
            id: "opening",
            type: "block",
            name: "Opening",
            enabled: true,
            lines: [
              {
                id: "cut-line",
                enabled: false,
                voiceAssetId: "voice.detective",
                lineAssetId: "voice.line.open"
              },
              {
                id: "spoken-line",
                enabled: true,
                voiceAssetId: "voice.detective",
                lineAssetId: "voice.line.open"
              }
            ],
            nextNodeId: "disabled-block"
          },
          "disabled-block": {
            id: "disabled-block",
            type: "block",
            name: "Disabled",
            enabled: false,
            lines: [],
            nextNodeId: "question"
          },
          question: {
            id: "question",
            type: "decision",
            name: "Question",
            prompt: "What next?",
            enabled: true,
            options: [
              { id: "hidden", text: "Hidden", enabled: false },
              { id: "finish", text: "Finish", enabled: true }
            ]
          }
        }
      }
    }
  });
}

test("resolves text-only and generated AI voice lines", () => {
  const dialogs = manifest();
  const textOnly = resolveDialogLine(
    dialogs,
    aiAssets,
    "interview",
    "opening",
    "spoken-line"
  );
  assert.equal(textOnly.text, "The clock is lying.");
  assert.equal(textOnly.direction, "Quietly observant");
  assert.equal(textOnly.audio, undefined);

  const generatedManifest = structuredClone(dialogs);
  generatedManifest.dialogs.interview.nodes.opening.lines[1].lineAssetId = "voice.line.generated";
  const generated = resolveDialogLine(
    generatedManifest,
    aiAssets,
    "interview",
    "opening",
    "spoken-line"
  );
  assert.equal(generated.text, "Generated text");
  assert.equal(generated.audio.file, "/assets/take-one.mp3");
});

test("voice-line prompts remain direction and cannot become spoken text", () => {
  const dialogs = manifest();
  const assets = structuredClone(aiAssets);
  const line = assets.assets["voice.line.open"];
  delete line.voiceSettings.text;
  delete line.voiceSettings.direction;

  assert.throws(
    () => resolveDialogLine(
      dialogs,
      assets,
      "interview",
      "opening",
      "spoken-line"
    ),
    /does not define spoken text/i
  );

  line.voiceSettings.text = "The clock is lying.";
  const resolved = resolveDialogLine(
    dialogs,
    assets,
    "interview",
    "opening",
    "spoken-line"
  );
  assert.equal(resolved.text, "The clock is lying.");
  assert.equal(resolved.direction, "Quietly observant");
});

test("cross-manifest validation validates the AI Assets manifest itself", () => {
  const assets = structuredClone(aiAssets);
  assets.assets["voice.detective"].activeVersion = "missing";

  assert.throws(
    () => new DialogRuntime(manifest(), assets),
    /activeVersion|no versions/i
  );
});

test("runtime resolves target-specific voices, lines, text, and audio", () => {
  const assets = structuredClone(aiAssets);
  assets.assets["voice.detective.localized"] = {
    ...structuredClone(assets.assets["voice.detective"]),
    id: "voice.detective.localized"
  };
  assets.assets["voice.line.open.localized"] = {
    ...structuredClone(assets.assets["voice.line.open"]),
    id: "voice.line.open.localized",
    activeVersion: "localized",
    versions: {
      localized: {
        name: "localized",
        file: "/assets/open-localized.mp3",
        prompt: "Warmly",
        createdAt: "2026-01-01T00:00:00.000Z",
        voiceSettings: {
          voiceAssetId: "voice.detective",
          text: "The localized clock is lying."
        }
      }
    }
  };
  assets.targets = {
    localized: {
      id: "localized",
      variants: {
        "voice.detective": "voice.detective.localized",
        "voice.line.open": "voice.line.open.localized"
      }
    }
  };

  const runtime = new DialogRuntime(manifest(), assets, { targetId: "localized" });
  const turn = runtime.start("interview");
  assert.equal(turn.type, "line");
  assert.equal(turn.resolved.voiceAsset.id, "voice.detective.localized");
  assert.equal(turn.resolved.lineAsset.id, "voice.line.open.localized");
  assert.equal(turn.resolved.text, "The localized clock is lying.");
  assert.equal(turn.resolved.direction, "Warmly");
  assert.equal(turn.resolved.audio.file, "/assets/open-localized.mp3");
});

test("resolved audio merges asset and active-version playback settings", () => {
  const dialogs = manifest();
  const assets = structuredClone(aiAssets);
  const line = assets.assets["voice.line.generated"];
  line.audioPlayback = {
    volume: 0.4,
    trimStartSeconds: 0.2
  };
  line.versions["take-one"].audioPlayback = {
    volume: 0.8,
    playbackRate: 1.1
  };
  dialogs.dialogs.interview.nodes.opening.lines[1].lineAssetId = "voice.line.generated";

  const resolved = resolveDialogLine(
    dialogs,
    assets,
    "interview",
    "opening",
    "spoken-line"
  );
  assert.deepEqual(resolved.audio.playback, {
    volume: 0.8,
    trimStartSeconds: 0.2,
    playbackRate: 1.1
  });
});

test("runtime skips disabled lines and nodes, then exposes enabled choices", () => {
  const runtime = new DialogRuntime(manifest(), aiAssets);
  const skipped = [];
  const said = [];
  runtime.on("node:skip", (event) => skipped.push([event.node.id, event.reason]));
  runtime.on("line:said", (event) => said.push(event.line.id));

  const first = runtime.start("interview");
  assert.equal(first.type, "line");
  assert.equal(first.line.id, "spoken-line");

  const decision = runtime.advance();
  assert.equal(decision.type, "decision");
  assert.deepEqual(decision.options.map((option) => option.id), ["finish"]);
  assert.deepEqual(said, ["spoken-line"]);
  assert.deepEqual(skipped, [
    ["disabled-block", "disabled"]
  ]);

  const end = runtime.choose("finish");
  assert.deepEqual(end, { type: "end", dialogId: "interview", reason: "completed" });
});

test("runtime lifecycle events are ordered around game-controlled advancement", () => {
  const runtime = new DialogRuntime(manifest(), aiAssets);
  const events = [];
  for (const eventName of [
    "dialog:start",
    "node:enter",
    "node:skip",
    "line:ready",
    "line:said",
    "decision:ready",
    "option:selected",
    "dialog:end"
  ]) {
    runtime.on(eventName, () => events.push(eventName));
  }

  runtime.start("interview");
  runtime.advance();
  runtime.choose("finish");

  assert.deepEqual(events, [
    "dialog:start",
    "node:enter",
    "line:ready",
    "line:said",
    "node:skip",
    "node:enter",
    "decision:ready",
    "option:selected",
    "dialog:end"
  ]);
});

test("line reactions can change enablement before the next turn is resolved", () => {
  const dialogs = manifest();
  dialogs.dialogs.interview.nodes["disabled-block"].lines.push({
    id: "reactive-line",
    enabled: true,
    voiceAssetId: "voice.detective",
    lineAssetId: "voice.line.generated"
  });
  const runtime = new DialogRuntime(dialogs, aiAssets);
  runtime.on("line:said", ({ line }) => {
    if (line.id === "spoken-line") {
      runtime.setNodeEnabled("interview", "disabled-block", true);
    }
  });

  runtime.start("interview");
  const next = runtime.advance();
  assert.equal(next.type, "line");
  assert.equal(next.line.id, "reactive-line");
});

test("event handlers can stop traversal without a stale later turn being returned", () => {
  const stopWhenReady = new DialogRuntime(manifest(), aiAssets);
  stopWhenReady.on("line:ready", () => stopWhenReady.stop());
  assert.deepEqual(stopWhenReady.start("interview"), {
    type: "end",
    dialogId: "interview",
    reason: "stopped"
  });

  const stopWhenSaid = new DialogRuntime(manifest(), aiAssets);
  stopWhenSaid.start("interview");
  stopWhenSaid.on("line:said", () => stopWhenSaid.stop());
  assert.deepEqual(stopWhenSaid.advance(), {
    type: "end",
    dialogId: "interview",
    reason: "stopped"
  });

  const stopWhenSelected = new DialogRuntime(manifest(), aiAssets);
  stopWhenSelected.start("interview");
  stopWhenSelected.advance();
  stopWhenSelected.on("option:selected", () => stopWhenSelected.stop());
  assert.deepEqual(stopWhenSelected.choose("finish"), {
    type: "end",
    dialogId: "interview",
    reason: "stopped"
  });
});

test("live manifests safely end turns whose active authored elements were removed", () => {
  const lineRuntime = new DialogRuntime(manifest(), aiAssets);
  lineRuntime.start("interview");
  const withoutActiveNode = manifest();
  withoutActiveNode.dialogs.interview = {
    id: "interview",
    name: "Interview",
    enabled: true,
    entryNodeId: "replacement",
    nodes: {
      replacement: {
        id: "replacement",
        type: "block",
        name: "Replacement",
        enabled: true,
        lines: []
      }
    }
  };
  lineRuntime.setManifest(withoutActiveNode);
  assert.deepEqual(lineRuntime.advance(), {
    type: "end",
    dialogId: "interview",
    reason: "stopped"
  });

  const decisionRuntime = new DialogRuntime(manifest(), aiAssets);
  decisionRuntime.start("interview");
  decisionRuntime.advance();
  const withoutVisibleOption = manifest();
  withoutVisibleOption.dialogs.interview.nodes.question.options = [
    { id: "hidden", text: "Hidden", enabled: false }
  ];
  decisionRuntime.setManifest(withoutVisibleOption);
  assert.deepEqual(decisionRuntime.choose("finish"), {
    type: "end",
    dialogId: "interview",
    reason: "stopped"
  });
});

test("runtime enabled overrides persist across starts without mutating authored data", () => {
  const dialogs = manifest();
  const runtime = new DialogRuntime(dialogs, aiAssets);
  runtime.setEnabled({
    type: "option",
    dialogId: "interview",
    nodeId: "question",
    optionId: "hidden"
  }, true);
  runtime.setEnabled({
    type: "option",
    dialogId: "interview",
    nodeId: "question",
    optionId: "finish"
  }, false);

  runtime.start("interview");
  const decision = runtime.advance();
  assert.equal(decision.type, "decision");
  assert.deepEqual(decision.options.map((option) => option.id), ["hidden"]);
  assert.equal(dialogs.dialogs.interview.nodes.question.options[0].enabled, false);

  runtime.choose("hidden");
  runtime.start("interview");
  const decisionAgain = runtime.advance();
  assert.equal(decisionAgain.type, "decision");
  assert.deepEqual(decisionAgain.options.map((option) => option.id), ["hidden"]);
});

test("enabled-state keys cannot collide when ids contain separators", () => {
  assert.notEqual(
    targetKey({ type: "node", dialogId: "case:one", nodeId: "opening" }),
    targetKey({ type: "node", dialogId: "case", nodeId: "one:opening" })
  );
});

test("manifest validation rejects graphs that are not trees", () => {
  const dialogs = manifest();
  dialogs.dialogs.interview.nodes.question.options.push({
    id: "loop",
    text: "Loop",
    enabled: true,
    nextNodeId: "opening"
  });
  assert.throws(
    () => assertDialogManifest(dialogs),
    /cycle|parent/i
  );
});

test("cross-manifest voice references are validated eagerly", () => {
  const dialogs = manifest();
  dialogs.dialogs.interview.nodes.opening.lines[1].voiceAssetId = "voice.missing";
  assert.throws(
    () => new DialogRuntime(dialogs, aiAssets),
    /unknown or non-voice/i
  );
});

test("disabled decisions follow their authored continuation without rendering choices", () => {
  const dialogs = manifest();
  const dialog = dialogs.dialogs.interview;
  dialog.nodes.opening.nextNodeId = "question";
  dialog.nodes.question.enabled = false;
  dialog.nodes.question.nextNodeId = "epilogue";
  dialog.nodes.epilogue = {
    id: "epilogue",
    type: "block",
    name: "Epilogue",
    enabled: true,
    lines: [{
      id: "last-line",
      enabled: true,
      voiceAssetId: "voice.detective",
      lineAssetId: "voice.line.generated"
    }]
  };
  delete dialog.nodes["disabled-block"];
  assertDialogManifest(dialogs);

  const runtime = new DialogRuntime(dialogs, aiAssets);
  assert.equal(runtime.start("interview").type, "line");
  const epilogue = runtime.advance();
  assert.equal(epilogue.type, "line");
  assert.equal(epilogue.line.id, "last-line");
});
