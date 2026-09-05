# The Silent Ledger

A compact point-and-click detective story demonstrating Dialog Designer with Phaser and AI Assets. At 9:00 PM, a thirty-second blackout strikes the locked library at Blackwood House. When the lights return, Edwin Mercer's rare Raven Ledger is gone from its locked display case, even though its only key never left his pocket. Ada Mercer, Bram Holt, and Dr. Lucien Vale were the only people inside.

## Links

- [Play **The Silent Ledger** online](https://tzachshabtay.github.io/dialog-designer/)
- Dialog Designer on npm: [`core`](https://www.npmjs.com/package/@dialog-designer/core), [`designer`](https://www.npmjs.com/package/@dialog-designer/designer), [`dev`](https://www.npmjs.com/package/@dialog-designer/dev), and [`phaser`](https://www.npmjs.com/package/@dialog-designer/phaser)

The mandatory ensemble briefing establishes the victim, stolen item, locked-room conditions, each suspect's reason for being present, and the disputed 1846 watermark before questioning begins. The three branching suspect dialogs then reveal and close paths until the detective can prove timeline, method, and motive.

## Run

From the repository root, run the live asset/dialog servers and Vite in separate terminals:

```bash
npm --workspace dialog-designer-detective-demo run dev:server
npm --workspace dialog-designer-detective-demo run dev
```

Open <http://127.0.0.1:5177>. AI Assets listens on `4097` and Dialog Designer on `4099`. Query parameters `assetApi` and `dialogApi` can override them.

Begin from the landing screen so the browser can unlock audio before the opening briefing. Click the dialog card or press Space to advance; doing so immediately cuts the current spoken line. Then click a suspect to talk and choose topics from the game-owned option buttons. The three evidence seals illuminate as the timeline, method, and motive become provable. Early or wrong accusations damage cooperation but never make the case unwinnable.

The checked-in SVG artwork and original procedural film-noir score are deterministic and available offline. Generated voice performances play when present, while the complete written game remains usable without them. See [ASSET_PROVENANCE.md](./ASSET_PROVENANCE.md) for the score's source and checksum.
