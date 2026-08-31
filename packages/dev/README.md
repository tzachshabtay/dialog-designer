# @dialog-designer/dev

Local JSON persistence, TypeScript manifest generation, and the development
HTTP server for [Dialog Designer](https://github.com/tzachshabtay/dialog-designer).

```sh
npm install --save-dev @dialog-designer/dev @ai-game-assets/dev
```

Build a TypeScript module from a directory of dialog JSON files:

```sh
dialog-designer-dev build \
  --manifest-dir=src/dialogs \
  --module-out=src/dialogs.ts
```

Run the promotion server, including support for adding new ungenerated voice
lines to the project's AI Assets manifest:

```sh
dialog-designer-dev serve \
  --manifest-path=src/dialogs \
  --ai-assets-manifest-path=src/ai-assets \
  --port=3979
```

The server exposes:

- `GET /__dialog-designer/manifest`
- `POST /__dialog-designer/promote` (alias: `/save`)
- `POST /__dialog-designer/voice-line`

Voice-line creation is idempotent. It creates an ungenerated `voice-line`
asset, links it from the selected base voice, and never removes AI assets when
dialogs or dialog lines are deleted.
