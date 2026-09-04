# dialog-designer

`dialog-designer` is a branching conversation authoring toolkit for TypeScript
games. It belongs beside [AI Assets](https://github.com/tzachshabtay/ai-assets)
and `scene-designer`: the packages share AI Assets' in-game tool dock, dialogs
reference AI voice and voice-line assets, and Phaser integration is provided
without forcing a playback UI on the game.

The repository contains four publishable packages:

- `@dialog-designer/core` — JSON schema, validation, factories, tree queries,
  and the headless conversation runtime.
- `@dialog-designer/designer` — the engine-neutral, docked DOM editor.
- `@dialog-designer/dev` — JSON persistence, generated TypeScript modules,
  local HTTP API, CLI, and AI voice-line creation.
- `@dialog-designer/phaser` — Phaser lifecycle, event-bus, audio-loading, and
  designer installation helpers. It does not render or advance conversations.

The `demos/detective` workspace is a complete Phaser mystery, **The Silent
Ledger**, with a mandatory ensemble case briefing, three suspects,
evidence-dependent topics, reversible hostility, disabled branches, and a
final accusation.

## Dialog model

Each dialog is an acyclic tree of blocks and decisions. A block contains ordered
voice lines and may continue to another node. A decision contains options; each
option may lead to a block or another decision. A decision can also have a
fallback continuation used when the decision or every option is disabled.

```ts
import { defineDialogManifest } from "@dialog-designer/core";

export const dialogs = defineDialogManifest({
  schemaVersion: 1,
  dialogs: {
    witness: {
      id: "witness",
      name: "Interview the witness",
      enabled: true,
      entryNodeId: "opening",
      nodes: {
        opening: {
          id: "opening",
          type: "block",
          name: "Opening",
          enabled: true,
          lines: [{
            id: "opening-1",
            enabled: true,
            voiceAssetId: "voice.witness",
            lineAssetId: "voice.line.witness.opening"
          }],
          nextNodeId: "topics"
        },
        topics: {
          id: "topics",
          type: "decision",
          name: "Topics",
          prompt: "What do you ask about?",
          enabled: true,
          options: [{
            id: "ask-clock",
            text: "The stopped clock",
            enabled: true,
            nextNodeId: "clock-answer"
          }]
        },
        "clock-answer": {
          id: "clock-answer",
          type: "block",
          name: "Clock answer",
          enabled: true,
          lines: [{
            id: "clock-1",
            enabled: true,
            voiceAssetId: "voice.witness",
            lineAssetId: "voice.line.witness.clock"
          }]
        }
      }
    }
  }
});
```

Every dialog, block, line, decision, and option has authored enabled state.
Games can override that state at runtime without mutating or accidentally
promoting investigation/session state.

## Headless runtime

```ts
import { DialogRuntime } from "@dialog-designer/core";

const runtime = new DialogRuntime(dialogs, aiAssets);

runtime.on("line:said", ({ resolved }) => {
  journal.push(resolved.text);
});

runtime.on("option:selected", ({ option }) => {
  if (option.id === "ask-clock") {
    clues.add("clock");
    runtime.setOptionEnabled("suspect-two", "topics", "challenge-clock", true);
  }
});

let turn = runtime.start("witness");

if (turn.type === "line") {
  gameDialog.show(turn.resolved.text, turn.resolved.voiceAsset.id);
  // `turn.resolved.audio` is optional: ungenerated AI lines remain text-ready.
  turn = runtime.advance();
}

if (turn.type === "decision") {
  gameDialog.showChoices(turn.options, (optionId) => runtime.choose(optionId));
}
```

The runtime emits `dialog:start`, `node:enter`, `node:skip`, `line:ready`,
`line:said`, `decision:ready`, `option:selected`, `enabled:change`, and
`dialog:end`. Games decide how to display lines, play generated audio, collect
input, pace advancement, and react to events.

## Designer panel

The designer registers a `Dialogs` button at dock order 40, after AI Assets,
Scenes, and Prefabs. It provides dialog CRUD, a recursive block/decision tree,
inline enable switches, line and option editing, branch creation/removal,
undo/redo, and explicit promotion.

Lines can select any existing `voice-line` in the supplied AI manifest. The
**Create line** form selects a base voice, accepts spoken text and director
notes, then asks the Dialog Designer dev server to add an ungenerated
`voice-line` definition to AI Assets. The new asset is linked beneath its base
voice and is immediately selected in the dialog. Generate/promote its audio in
the normal AI Assets panel.

```ts
import { installPhaserDialogDesigner } from "@dialog-designer/phaser";
import { DialogDesignerDebugClient } from "@dialog-designer/designer";

const installed = installPhaserDialogDesigner({
  scene: this,
  manifest: dialogs,
  aiAssets,
  client: new DialogDesignerDebugClient("http://127.0.0.1:3979"),
  onManifestChange(next) {
    Object.assign(dialogs, next);
  },
  onAiAssetsChange(next) {
    Object.assign(aiAssets, next);
  }
});
```

## Phaser audio helpers

Call `loadDialogAudioAssets` during `preload`. It queues every generated line
referenced anywhere in the manifest—including authored-disabled branches that
may be enabled later. Ungenerated lines are skipped and continue to work as
text-only turns.

```ts
import {
  dialogAudioKey,
  loadDialogAudioAssets,
  PhaserDialogRuntime
} from "@dialog-designer/phaser";

preload() {
  loadDialogAudioAssets(this, dialogs, aiAssets, { baseUrl: assetBaseUrl });
}

create() {
  const runtime = new PhaserDialogRuntime(this, dialogs, aiAssets);
  runtime.on("line:ready", ({ resolved }) => {
    if (resolved.audio) this.sound.play(dialogAudioKey(resolved.lineAsset.id));
  });
}
```

## Development server

```sh
dialog-designer-dev serve \
  --manifest-path=src/dialogs \
  --ai-assets-manifest-path=src/ai-assets \
  --port=3979

dialog-designer-dev build \
  --manifest-dir=src/dialogs \
  --module-out=src/dialogs.ts
```

HTTP endpoints:

- `GET /__dialog-designer/manifest`
- `POST /__dialog-designer/promote` (alias: `/save`)
- `POST /__dialog-designer/voice-line`

Dialog and AI manifests are separate stores. Voice-line creation is
idempotent and serialized per AI manifest to reduce read/modify/write races;
removing a dialog reference never deletes its potentially shared AI asset.

## Run the detective demo

```sh
npm install
npm run dev:server --workspace dialog-designer-detective-demo
```

In a second terminal:

```sh
npm run dev --workspace dialog-designer-detective-demo
```

Then open the Vite URL, click a suspect, and follow the evidence. The game owns
the visible conversation UI and changes runtime enablement in response to what
you ask; the `Dialogs` panel exposes the same authored trees live.

## Repository checks

```sh
npm run build:packages
npm test
npm run typecheck
npm run build --workspace dialog-designer-detective-demo
```

## License

MIT
