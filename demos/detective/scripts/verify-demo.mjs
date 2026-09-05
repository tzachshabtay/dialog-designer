import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const demoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(demoRoot, "src");
const publicRoot = path.join(demoRoot, "public");
const minimumVoiceGenerationTextLength = 100;

const assetFiles = await jsonFiles(path.join(sourceRoot, "ai-assets"));
const assets = {};
for (const filePath of assetFiles) {
  if (path.basename(filePath) === "style-guide.json") continue;
  const asset = await json(filePath);
  assert(asset.id, `${filePath} must contain an AI asset id.`);
  assert(!assets[asset.id], `AI asset id ${asset.id} must be unique.`);
  assets[asset.id] = asset;
}

const dialogFiles = await jsonFiles(path.join(sourceRoot, "dialogs"));
const dialogs = Object.fromEntries(await Promise.all(dialogFiles.map(async (filePath) => {
  const dialog = await json(filePath);
  return [dialog.id, dialog];
})));

assert(Object.keys(dialogs).length === 4, "The demo must contain one case intro and three suspect dialogs.");
assert(dialogs["dialog.intro"], "dialog.intro is required.");
for (const dialogId of ["dialog.ada", "dialog.bram", "dialog.lucien"]) {
  assert(dialogs[dialogId], `${dialogId} is required.`);
}

const introDialog = dialogs["dialog.intro"];
assert(introDialog.entryNodeId === "case.intro", "The case intro must enter at case.intro.");
assert(Object.keys(introDialog.nodes).length === 1, "The case intro must remain a single block.");
const introBlock = introDialog.nodes["case.intro"];
assert(introBlock?.type === "block", "case.intro must be a block, not a decision.");
assert(introBlock.lines?.length === 9, "case.intro must contain the complete nine-line ensemble briefing.");
assert(!introBlock.nextNodeId, "case.intro must finish before suspect questioning begins.");
assert(
  new Set(introBlock.lines.map((line) => line.voiceAssetId)).size === 4,
  "The ensemble briefing must use detective, Ada, Bram, and Lucien."
);

for (const assetId of ["background.library", "character.ada", "character.bram", "character.lucien"]) {
  const asset = assets[assetId];
  assert(asset?.kind === "image", `${assetId} must be a deterministic image asset.`);
  const defaultVersion = asset.versions?.default;
  assert(defaultVersion?.model === "manual-svg", `${assetId} must retain its manual SVG default.`);
  const version = asset.versions?.[asset.activeVersion];
  assert(version?.file, `${assetId} must have an active image file.`);
  await access(path.join(publicRoot, version.file.replace(/^\//, "")));
}

for (const assetId of ["character.ada", "character.bram", "character.lucien"]) {
  const asset = assets[assetId];
  assert(asset.settings?.model === "gpt-image-2", `${assetId} must use GPT Image 2.`);
  assert(asset.settings?.background === "transparent", `${assetId} must request transparency.`);
  assert(asset.settings?.format === "png", `${assetId} must generate PNG output for chroma cleanup.`);
  assert(
    !(asset.settings?.referenceAssetIds ?? []).includes("background.library"),
    `${assetId} must not use the opaque room as a character reference.`
  );

  for (const state of ["idle", "speaking"]) {
    const animationAssetId = `${assetId}.${state}`;
    assert(
      asset.linkedAnimationAssets?.[state]?.assetId === animationAssetId,
      `${assetId} must link its ${state} animation.`
    );
    const animationAsset = assets[animationAssetId];
    assert(animationAsset?.kind === "spritesheet", `${animationAssetId} must be a spritesheet.`);
    const frameGrid = animationAsset.frameGrid;
    assert(
      Number.isInteger(frameGrid?.frameCount)
        && frameGrid.frameCount > 0
        && Number.isInteger(frameGrid.columns)
        && frameGrid.columns > 0
        && Number.isInteger(frameGrid.rows)
        && frameGrid.rows > 0
        && frameGrid.columns * frameGrid.rows >= frameGrid.frameCount
        && frameGrid.frameWidth === 320
        && frameGrid.frameHeight === 420
        && animationAsset.dimensions?.width === frameGrid.columns * frameGrid.frameWidth
        && animationAsset.dimensions?.height === frameGrid.rows * frameGrid.frameHeight,
      `${animationAssetId} must define a self-consistent 320x420 frame grid.`
    );
    assert(
      animationAsset.settings?.background === "transparent"
        && animationAsset.settings?.format === "png",
      `${animationAssetId} must use transparent PNG generation.`
    );
    assert(
      animationAsset.settings?.referenceAssetIds?.includes(assetId),
      `${animationAssetId} must reference its promoted base character.`
    );
    const animation = animationAsset.animations?.[0];
    assert(
      animation?.key === animationAssetId
        && animation.repeat === -1
        && animation.frames.length === frameGrid.frameCount
        && animation.frames.every((frame, index) => frame === index),
      `${animationAssetId} must expose a unique looping Phaser animation.`
    );
    const animationVersion = animationAsset.versions?.[animationAsset.activeVersion];
    assert(animationVersion?.file, `${animationAssetId} must have an active generated sheet.`);
    await access(path.join(publicRoot, animationVersion.file.replace(/^\//, "")));
  }
}

const noirMusic = assets["audio.music.noir"];
assert(noirMusic?.kind === "music", "The demo must define the film-noir background score in AI Assets.");
assert(noirMusic.audioSettings?.loop === true, "The film-noir score must be generated as a loop.");
assert(noirMusic.audioPlayback?.loop === true, "The film-noir score must loop during playback.");
assert(
  noirMusic.audioPlayback?.volume >= 0.1 && noirMusic.audioPlayback?.volume <= 0.25,
  "The film-noir score must remain quiet enough for spoken dialog."
);
assert(
  /instrumental/i.test(noirMusic.prompt) && /no vocals/i.test(noirMusic.prompt),
  "The film-noir score prompt must explicitly remain instrumental."
);
const noirVersion = noirMusic.versions?.[noirMusic.activeVersion];
assert(noirVersion?.file, "The film-noir score must have an active audio file.");
await access(path.join(publicRoot, noirVersion.file.replace(/^\//, "")));
const noirOriginalVersion = noirMusic.versions?.original;
assert(noirOriginalVersion?.file, "The film-noir score must retain its original WAV source.");
const noirFile = await readFile(path.join(publicRoot, noirOriginalVersion.file.replace(/^\//, "")));
assert(noirFile.subarray(0, 4).toString("ascii") === "RIFF", "The original score must be a valid WAV file.");
assert(noirFile.subarray(8, 12).toString("ascii") === "WAVE", "The original score must contain a WAVE header.");
assert(noirFile.length > 1_000_000, "The original score must contain the complete instrumental loop.");
const noirSampleRate = noirFile.readUInt32LE(24);
const noirChannels = noirFile.readUInt16LE(22);
const noirBitsPerSample = noirFile.readUInt16LE(34);
const noirDataLength = noirFile.readUInt32LE(40);
const noirDuration = noirDataLength / (noirSampleRate * noirChannels * (noirBitsPerSample / 8));
assert(noirSampleRate === 22_050, "The original score must use its authored 22.05 kHz sample rate.");
assert(noirChannels === 1 && noirBitsPerSample === 16, "The original score must remain 16-bit mono PCM.");
assert(noirDuration > 26.6 && noirDuration < 26.7, "The original score must contain the complete 32-beat loop.");
const noirSampleCount = noirDataLength / 2;
const firstNoirSample = pcm16Sample(noirFile, 0);
const lastNoirSample = pcm16Sample(noirFile, noirSampleCount - 1);
assert(
  Math.abs(firstNoirSample - lastNoirSample) <= 1 / 32_768,
  "The original score must meet cleanly at its loop boundary."
);
const noirWindow100 = Math.round(noirSampleRate * 0.1);
const noirWindow500 = Math.round(noirSampleRate * 0.5);
assert(
  pcm16Rms(noirFile, noirSampleCount - noirWindow100, noirWindow100)
    / pcm16Rms(noirFile, 0, noirWindow100) >= 0.2,
  "The score must not fade into a silent breath during its final 100 ms."
);
assert(
  pcm16Rms(noirFile, noirSampleCount - noirWindow500, noirWindow500)
    / pcm16Rms(noirFile, 0, noirWindow500) >= 0.45,
  "The score must carry comparable musical energy across its loop boundary."
);
const noirChecksum = createHash("sha256").update(noirFile).digest("hex");
assert(
  noirChecksum === "9fde00bf1a7c8b14184627004791b2890095e80c27bfdc6673f48aed9c104ca3",
  "The original film-noir score must match its documented deterministic build."
);
const provenance = await readFile(path.join(demoRoot, "ASSET_PROVENANCE.md"), "utf8");
assert(provenance.includes(noirChecksum), "Asset provenance must record the film-noir score checksum.");

const voices = Object.values(assets).filter((asset) => asset.kind === "voice");
const lines = Object.values(assets).filter((asset) => asset.kind === "voice-line");
assert(voices.length === 4, "The demo must define detective, Ada, Bram and Lucien voices.");
assert(lines.length >= 35, "The mystery should include a substantive authored voice-line set.");
for (const voice of voices) {
  await assertOptionalGeneratedAudio(voice);
  assert(
    voice.voiceSettings?.previewText?.length >= minimumVoiceGenerationTextLength,
    `${voice.id} preview text must contain at least ${minimumVoiceGenerationTextLength} characters for ElevenLabs voice design.`
  );
}
for (const line of lines) {
  await assertOptionalGeneratedAudio(line);
  assert(
    line.voiceSettings?.text?.length >= minimumVoiceGenerationTextLength,
    `${line.id} text must contain at least ${minimumVoiceGenerationTextLength} characters for ElevenLabs generation.`
  );
  const voice = assets[line.voiceSettings?.voiceAssetId];
  assert(voice?.kind === "voice", `${line.id} must reference a base voice.`);
  assert(
    Object.values(voice.linkedAnimationAssets ?? {}).some((link) => link.assetId === line.id),
    `${line.id} must be nested under ${voice.id} in AI Assets.`
  );
}

let dialogLineCount = 0;
for (const dialog of Object.values(dialogs)) {
  assert(dialog.entryNodeId && dialog.nodes[dialog.entryNodeId], `${dialog.id} needs an entry node.`);
  assertTree(dialog);
  for (const node of Object.values(dialog.nodes)) {
    if (node.type !== "block") continue;
    for (const line of node.lines) {
      dialogLineCount += 1;
      assert(assets[line.voiceAssetId]?.kind === "voice", `${dialog.id}.${line.id} has an invalid voice.`);
      assert(assets[line.lineAssetId]?.kind === "voice-line", `${dialog.id}.${line.id} has an invalid line asset.`);
      assert(
        assets[line.lineAssetId].voiceSettings?.voiceAssetId === line.voiceAssetId,
        `${dialog.id}.${line.id} must match its voice-line owner.`
      );
    }
  }
}

const lucienMenu = dialogs["dialog.lucien"].nodes["lucien.menu"];
assert(lucienMenu.options.some((option) => option.id === "lucien.accuse.early"), "Vale needs early-accusation handling.");
assert(lucienMenu.options.some((option) => option.id === "lucien.accuse.final"), "Vale needs the final accusation path.");
const reveal = dialogs["dialog.lucien"].nodes["lucien.reveal"];
assert(reveal.lines.some((line) => line.id === "lucien.reveal.folio-clue"), "Reveal needs the optional folio clue line.");
assert(reveal.lines.some((line) => line.id === "lucien.reveal.container"), "Reveal needs a fallback hiding-place deduction.");
const revealOrder = reveal.lines.map((line) => line.id);
for (const lineId of ["lucien.reveal.folio-clue", "lucien.reveal.container"]) {
  assert(
    revealOrder.indexOf(lineId) < revealOrder.indexOf("lucien.reveal.bram"),
    `${lineId} must establish the folio deduction before Bram inspects its clasp.`
  );
}
assert(
  revealOrder.indexOf("lucien.reveal.bram") < revealOrder.indexOf("lucien.reveal.ada"),
  "Bram must observe the strained clasp before Ada orders the folio opened."
);
assert(
  revealOrder.indexOf("lucien.reveal.ada") < revealOrder.indexOf("lucien.reveal.confession"),
  "Ada must order the folio opened before Vale sees the recovered ledger and confesses."
);

const reconstruction = assets["line.detective.reveal"]?.voiceSettings?.text ?? "";
for (const phrase of [
  "clock",
  "copper marker",
  "room alone",
  "wax",
  "ward pattern",
  "duplicate key",
  "opened the case",
  "folio"
]) {
  assert(reconstruction.includes(phrase), `The final reconstruction must explicitly mention ${phrase}.`);
}
const closing = assets["line.detective.closing"]?.voiceSettings?.text ?? "";
assert(closing.includes("duplicate key"), "The closing must confirm recovery of the duplicate key.");
assert(closing.includes("forgery"), "The closing must state Vale's career-ending motive.");

const sceneSource = await readFile(path.join(sourceRoot, "DetectiveScene.ts"), "utf8");
for (const marker of [
  "new PhaserDialogRuntime",
  "installAiAssetDesigner",
  "installPhaserDialogDesigner",
  "loadAiAudioAsset",
  "runtime.setEnabled",
  'runtime.start("dialog.intro")',
  "showCaseLanding",
  "requestCaseStart",
  "context.resume()",
  "startBackgroundMusic",
  "setMusicDucked",
  "voiceSounds",
  "voice.destroy()",
  "case.intro_complete",
  "lucien.accuse.final",
  "case.solved"
]) {
  assert(sceneSource.includes(marker), `DetectiveScene.ts must exercise ${marker}.`);
}
const createMethod = sceneSource.slice(
  sceneSource.indexOf("  create(): void"),
  sceneSource.indexOf("  private createRoom(): void")
);
assert(createMethod.includes("this.showCaseLanding()"), "Scene creation must present the landing screen.");
assert(!createMethod.includes("this.startCaseIntro()"), "Scene creation must not start dialog audio before a gesture.");
assert(
  sceneSource.includes("if (!this.designersEnabled) return;"),
  "The scene must not install either designer unless the host explicitly enables development tools."
);
const mainSource = await readFile(path.join(sourceRoot, "main.ts"), "utf8");
assert(
  mainSource.includes("designersEnabled: import.meta.env.DEV"),
  "The detective demo must enable designer panels only in Vite development builds."
);
const advanceMethod = sceneSource.slice(
  sceneSource.indexOf("  private advanceCurrentLine(): void"),
  sceneSource.indexOf("  private stopVoiceLines(): void")
);
assert(
  advanceMethod.indexOf("this.stopVoiceLines()") < advanceMethod.indexOf("this.runtime.advance()"),
  "Advancing a line must dispose its speech audio before moving the dialog runtime."
);
assert(
  !sceneSource.includes("turn.resolved.direction"),
  "Director notes must stay in the designers and never appear in the player-facing dialog overlay."
);
assert(
  sceneSource.includes('turn.line.id === "lucien.reveal.confession"'),
  "The recovered-ledger graphic must wait until the folio has been ordered open."
);

console.log(`Verified ${Object.keys(dialogs).length} dialogs, ${dialogLineCount} dialog lines, ${lines.length} ElevenLabs-ready voice-line assets, the gated ensemble intro, the original noir score, and the complete Lucien reveal.`);

function assertTree(dialog) {
  const incoming = new Map(Object.keys(dialog.nodes).map((nodeId) => [nodeId, 0]));
  const children = (node) => {
    const values = node.type === "block"
      ? [node.nextNodeId]
      : [...node.options.map((option) => option.nextNodeId), node.nextNodeId];
    return values.filter(Boolean);
  };
  for (const node of Object.values(dialog.nodes)) {
    for (const childId of children(node)) {
      assert(dialog.nodes[childId], `${dialog.id}.${node.id} references missing ${childId}.`);
      incoming.set(childId, (incoming.get(childId) ?? 0) + 1);
    }
  }
  const visited = new Set();
  const active = new Set();
  const visit = (nodeId) => {
    assert(!active.has(nodeId), `${dialog.id} must not contain a cycle at ${nodeId}.`);
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    active.add(nodeId);
    for (const childId of children(dialog.nodes[nodeId])) visit(childId);
    active.delete(nodeId);
  };
  visit(dialog.entryNodeId);
  for (const nodeId of Object.keys(dialog.nodes)) {
    assert(visited.has(nodeId), `${dialog.id}.${nodeId} must be reachable.`);
    assert(incoming.get(nodeId) === (nodeId === dialog.entryNodeId ? 0 : 1), `${dialog.id}.${nodeId} must have one tree parent.`);
  }
}

async function jsonFiles(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const filePath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) files.push(...await jsonFiles(filePath));
    else if (entry.isFile() && entry.name.endsWith(".json")) files.push(filePath);
  }
  return files.sort((left, right) => left.localeCompare(right));
}

async function json(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function assertOptionalGeneratedAudio(asset) {
  const versions = Object.keys(asset.versions ?? {});
  if (!asset.activeVersion) {
    assert(versions.length === 0, `${asset.id} without an active version must not contain audio versions.`);
    return;
  }

  const activeVersion = asset.versions[asset.activeVersion];
  assert(activeVersion, `${asset.id} must contain its active audio version.`);
  assert(activeVersion.file, `${asset.id}.${asset.activeVersion} must reference an audio file.`);
  await access(path.join(publicRoot, activeVersion.file.replace(/^\//, "")));
}

function pcm16Sample(buffer, index) {
  return buffer.readInt16LE(44 + index * 2) / 32_768;
}

function pcm16Rms(buffer, start, count) {
  let sumOfSquares = 0;
  for (let index = 0; index < count; index += 1) {
    const sample = pcm16Sample(buffer, start + index);
    sumOfSquares += sample * sample;
  }
  return Math.sqrt(sumOfSquares / count);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
