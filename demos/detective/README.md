# The Silent Ledger

A compact point-and-click detective story demonstrating Dialog Designer with Phaser and AI Assets. Three suspects share a locked library; conversations reveal and close branches until the detective can prove timeline, method, and motive.

## Run

From the repository root, run the live asset/dialog servers and Vite in separate terminals:

```bash
npm --workspace dialog-designer-detective-demo run dev:server
npm --workspace dialog-designer-detective-demo run dev
```

Open <http://127.0.0.1:5177>. AI Assets listens on `4097` and Dialog Designer on `4099`. Query parameters `assetApi` and `dialogApi` can override them.

Click a suspect to talk, click the dialog card to advance a line, and choose topics from the game-owned option buttons. The three evidence seals illuminate as the timeline, method, and motive become provable. Early or wrong accusations damage cooperation but never make the case unwinnable.

The checked-in SVG artwork is deterministic and available offline. Voices and voice lines intentionally begin without generated versions: the full written game works immediately, while live AI Assets can generate and promote spoken performances.
