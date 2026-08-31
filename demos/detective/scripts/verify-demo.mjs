import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const demoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(demoRoot, "src");
const publicRoot = path.join(demoRoot, "public");

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

assert(Object.keys(dialogs).length === 3, "The demo must contain exactly three suspect dialogs.");
for (const dialogId of ["dialog.ada", "dialog.bram", "dialog.lucien"]) {
  assert(dialogs[dialogId], `${dialogId} is required.`);
}

for (const assetId of ["background.library", "character.ada", "character.bram", "character.lucien"]) {
  const asset = assets[assetId];
  assert(asset?.kind === "image", `${assetId} must be a deterministic image asset.`);
  const version = asset.versions?.[asset.activeVersion];
  assert(version?.model === "manual-svg", `${assetId} must use a manual SVG default.`);
  await access(path.join(publicRoot, version.file.replace(/^\//, "")));
}

const voices = Object.values(assets).filter((asset) => asset.kind === "voice");
const lines = Object.values(assets).filter((asset) => asset.kind === "voice-line");
assert(voices.length === 4, "The demo must define detective, Ada, Bram and Lucien voices.");
assert(lines.length >= 35, "The mystery should include a substantive authored voice-line set.");
for (const voice of voices) {
  assert(voice.activeVersion === "", `${voice.id} should begin ungenerated.`);
  assert(Object.keys(voice.versions).length === 0, `${voice.id} should begin without audio versions.`);
}
for (const line of lines) {
  assert(line.activeVersion === "", `${line.id} should begin ungenerated.`);
  assert(Object.keys(line.versions).length === 0, `${line.id} should begin without audio versions.`);
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

const sceneSource = await readFile(path.join(sourceRoot, "DetectiveScene.ts"), "utf8");
for (const marker of [
  "new PhaserDialogRuntime",
  "installAiAssetDesigner",
  "installPhaserDialogDesigner",
  "runtime.setEnabled",
  "lucien.accuse.final",
  "case.solved"
]) {
  assert(sceneSource.includes(marker), `DetectiveScene.ts must exercise ${marker}.`);
}

console.log(`Verified ${Object.keys(dialogs).length} dialogs, ${dialogLineCount} dialog lines, ${lines.length} voice-line assets, and the complete Lucien reveal.`);

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

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
