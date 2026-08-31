# @dialog-designer/phaser

Phaser lifecycle and audio-loading helpers for `dialog-designer`.

The package deliberately does not render dialog, create choice buttons, or
decide when speech advances. Use `PhaserDialogRuntime` (or the engine-neutral
`DialogRuntime`) and render each emitted turn in your game's own UI.

`loadDialogAudioAssets` queues generated voice lines and skips text-only lines.
When using an AI Assets target, pass the same `targetId` to the loader and the
runtime. `dialogAudioKey(turn.resolved.lineAsset.id)` then addresses the queued
target asset. Code that only has the logical line id can instead call
`dialogAudioKey(lineAssetId, { aiAssets, targetId })`.
