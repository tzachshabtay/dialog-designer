# @dialog-designer/core

Engine-neutral dialog trees and a headless conversation runtime for games.

## Links

- [View `@dialog-designer/core` on npm](https://www.npmjs.com/package/@dialog-designer/core)
- [Play **The Silent Ledger** detective demo](https://tzachshabtay.github.io/dialog-designer/)

```ts
import { DialogRuntime, defineDialogManifest } from "@dialog-designer/core";

const dialogs = defineDialogManifest({
  schemaVersion: 1,
  dialogs: {
    witness: {
      id: "witness",
      name: "Witness interview",
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
            lineAssetId: "voice.line.witness.hello"
          }]
        }
      }
    }
  }
});

const runtime = new DialogRuntime(dialogs, aiAssets);
const turn = runtime.start("witness");
```

`DialogRuntime` returns line, decision, and end turns and emits lifecycle
events. It does not render, play audio, or bind input. Runtime enabled-state
overrides are kept separate from the authored manifest.

Pass `{ targetId }` as the third constructor argument when AI Assets target
variants should supply the resolved voice, spoken text, direction, and audio.
AI `voice-line` prompts are treated as director notes; spoken text must be
defined in `voiceSettings.text` on the asset or its active version.
