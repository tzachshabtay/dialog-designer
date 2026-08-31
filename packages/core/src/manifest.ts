import {
  assertManifest as assertAiAssetManifest,
  resolveTargetAssetId,
  type AiAssetManifest
} from "@ai-game-assets/core";
import type {
  DialogDefinition,
  DialogDesignerManifest,
  DialogElementTarget,
  DialogLine,
  DialogNode,
  DialogNodeParent,
  ResolveDialogLineOptions,
  ResolvedDialogLine
} from "./types.js";

export function defineDialog(dialog: DialogDefinition): DialogDefinition {
  assertDialog(dialog);
  return dialog;
}

export function defineDialogs(dialogs: Record<string, DialogDefinition>): DialogDesignerManifest {
  return defineDialogManifest({ schemaVersion: 1, dialogs });
}

export function defineDialogManifest(manifest: DialogDesignerManifest): DialogDesignerManifest {
  assertDialogManifest(manifest);
  return manifest;
}

export function cloneDialogManifest(manifest: DialogDesignerManifest): DialogDesignerManifest {
  return structuredClone(manifest);
}

export function assertDialogManifest(manifest: DialogDesignerManifest): void {
  if (manifest.schemaVersion !== 1) {
    throw new Error(`Unsupported dialog designer manifest schema: ${manifest.schemaVersion}`);
  }
  if (!manifest.dialogs || typeof manifest.dialogs !== "object") {
    throw new Error("manifest.dialogs must be an object.");
  }

  for (const [dialogId, dialog] of Object.entries(manifest.dialogs)) {
    if (dialogId !== dialog.id) {
      throw new Error(`Dialog key "${dialogId}" does not match dialog id "${dialog.id}".`);
    }
    assertDialog(dialog);
  }

  for (const [dialogId, folder] of Object.entries(manifest.dialogPaths ?? {})) {
    if (!manifest.dialogs[dialogId]) {
      throw new Error(`dialogPaths references unknown dialog "${dialogId}".`);
    }
    assertStringList(folder, `manifest.dialogPaths.${dialogId}`);
  }
}

export function assertDialog(dialog: DialogDefinition): void {
  assertNonEmpty(dialog.id, "dialog.id");
  assertNonEmpty(dialog.name, `${dialog.id}.name`);
  assertBoolean(dialog.enabled, `${dialog.id}.enabled`);
  assertStringList(dialog.tags, `${dialog.id}.tags`);

  const nodeIds = Object.keys(dialog.nodes);
  if (nodeIds.length === 0) {
    if (dialog.entryNodeId !== undefined) {
      throw new Error(`Dialog "${dialog.id}" cannot define entryNodeId without nodes.`);
    }
    return;
  }

  if (!dialog.entryNodeId || !dialog.nodes[dialog.entryNodeId]) {
    throw new Error(`Dialog "${dialog.id}" entryNodeId must reference one of its nodes.`);
  }

  const incoming = new Map<string, string[]>();
  for (const nodeId of nodeIds) incoming.set(nodeId, []);

  for (const [nodeId, node] of Object.entries(dialog.nodes)) {
    if (nodeId !== node.id) {
      throw new Error(`Node key "${nodeId}" does not match node id "${node.id}".`);
    }
    assertNode(node, `${dialog.id}.${nodeId}`);
    for (const childId of dialogNodeChildIds(node)) {
      if (!dialog.nodes[childId]) {
        throw new Error(`Dialog node "${nodeId}" references unknown node "${childId}".`);
      }
      incoming.get(childId)?.push(nodeId);
    }
  }

  const reached = new Set<string>();
  const active = new Set<string>();
  const visit = (nodeId: string): void => {
    if (active.has(nodeId)) {
      throw new Error(`Dialog "${dialog.id}" contains a cycle at node "${nodeId}".`);
    }
    if (reached.has(nodeId)) return;
    active.add(nodeId);
    reached.add(nodeId);
    for (const childId of dialogNodeChildIds(dialog.nodes[nodeId]!)) visit(childId);
    active.delete(nodeId);
  };
  visit(dialog.entryNodeId);

  for (const nodeId of nodeIds) {
    if (!reached.has(nodeId)) {
      throw new Error(`Dialog "${dialog.id}" contains unreachable node "${nodeId}".`);
    }
    const parents = incoming.get(nodeId) ?? [];
    const expected = nodeId === dialog.entryNodeId ? 0 : 1;
    if (parents.length !== expected) {
      throw new Error(
        `Dialog node "${nodeId}" must have ${expected} parent${expected === 1 ? "" : "s"}; found ${parents.length}.`
      );
    }
  }
}

export function assertDialogAiAssets(
  manifest: DialogDesignerManifest,
  aiAssets: AiAssetManifest,
  options: ResolveDialogLineOptions = {}
): void {
  assertAiAssetManifest(aiAssets);

  for (const dialog of Object.values(manifest.dialogs)) {
    for (const node of Object.values(dialog.nodes)) {
      if (node.type !== "block") continue;
      for (const line of node.lines) {
        resolveDialogLine(manifest, aiAssets, dialog.id, node.id, line.id, options);
      }
    }
  }
}

export function getDialog(manifest: DialogDesignerManifest, dialogId: string): DialogDefinition {
  const dialog = manifest.dialogs[dialogId];
  if (!dialog) throw new Error(`Unknown dialog "${dialogId}".`);
  return dialog;
}

export function getDialogNode(
  manifest: DialogDesignerManifest,
  dialogId: string,
  nodeId: string
): DialogNode {
  const node = getDialog(manifest, dialogId).nodes[nodeId];
  if (!node) throw new Error(`Unknown dialog node "${nodeId}" in "${dialogId}".`);
  return node;
}

export function dialogNodeChildIds(node: DialogNode): string[] {
  const childIds = node.type === "block"
    ? [node.nextNodeId]
    : [...node.options.map((option) => option.nextNodeId), node.nextNodeId];
  return childIds.filter((value): value is string => Boolean(value));
}

export function walkDialogTree(dialog: DialogDefinition): DialogNode[] {
  if (!dialog.entryNodeId) return [];
  const result: DialogNode[] = [];
  const visited = new Set<string>();
  const visit = (nodeId: string): void => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    const node = dialog.nodes[nodeId];
    if (!node) return;
    result.push(node);
    for (const childId of dialogNodeChildIds(node)) visit(childId);
  };
  visit(dialog.entryNodeId);
  return result;
}

export function findDialogNodeParent(
  dialog: DialogDefinition,
  childNodeId: string
): DialogNodeParent | undefined {
  if (dialog.entryNodeId === childNodeId) return { type: "entry", dialogId: dialog.id };
  for (const node of Object.values(dialog.nodes)) {
    if (node.type === "block" && node.nextNodeId === childNodeId) {
      return { type: "block-next", nodeId: node.id };
    }
    if (node.type === "decision") {
      const option = node.options.find((candidate) => candidate.nextNodeId === childNodeId);
      if (option) return { type: "option", nodeId: node.id, optionId: option.id };
      if (node.nextNodeId === childNodeId) {
        return { type: "decision-next", nodeId: node.id };
      }
    }
  }
  return undefined;
}

export function resolveDialogLine(
  manifest: DialogDesignerManifest,
  aiAssets: AiAssetManifest,
  dialogId: string,
  blockId: string,
  lineId: string,
  options: ResolveDialogLineOptions = {}
): ResolvedDialogLine {
  const node = getDialogNode(manifest, dialogId, blockId);
  if (node.type !== "block") {
    throw new Error(`Dialog node "${blockId}" is not a block.`);
  }
  const line = node.lines.find((candidate) => candidate.id === lineId);
  if (!line) throw new Error(`Unknown dialog line "${lineId}" in block "${blockId}".`);

  const sourceVoiceAsset = aiAssets.assets[line.voiceAssetId];
  if (!sourceVoiceAsset || sourceVoiceAsset.kind !== "voice") {
    throw new Error(
      `Dialog line "${line.id}" references unknown or non-voice AI asset "${line.voiceAssetId}".`
    );
  }
  const sourceLineAsset = aiAssets.assets[line.lineAssetId];
  if (!sourceLineAsset || sourceLineAsset.kind !== "voice-line") {
    throw new Error(
      `Dialog line "${line.id}" references unknown or non-line AI asset "${line.lineAssetId}".`
    );
  }

  const resolvedVoiceAssetId = resolveTargetAssetId(
    aiAssets,
    line.voiceAssetId,
    options.targetId
  );
  const voiceAsset = aiAssets.assets[resolvedVoiceAssetId];
  if (!voiceAsset || voiceAsset.kind !== "voice") {
    throw new Error(
      `Dialog voice "${line.voiceAssetId}" resolves to unknown or non-voice target asset "${resolvedVoiceAssetId}".`
    );
  }
  const resolvedLineAssetId = resolveTargetAssetId(
    aiAssets,
    line.lineAssetId,
    options.targetId
  );
  const lineAsset = aiAssets.assets[resolvedLineAssetId];
  if (!lineAsset || lineAsset.kind !== "voice-line") {
    throw new Error(
      `Dialog voice line "${line.lineAssetId}" resolves to unknown or non-line target asset "${resolvedLineAssetId}".`
    );
  }
  const version = lineAsset.versions[lineAsset.activeVersion];
  const configuredVoiceId = version?.voiceSettings?.voiceAssetId
    ?? lineAsset.voiceSettings?.voiceAssetId;
  if (
    configuredVoiceId
    && configuredVoiceId !== line.voiceAssetId
    && configuredVoiceId !== resolvedVoiceAssetId
  ) {
    throw new Error(
      `Voice line "${lineAsset.id}" belongs to "${configuredVoiceId}", not "${line.voiceAssetId}".`
    );
  }

  const text = version?.voiceSettings?.text
    ?? lineAsset.voiceSettings?.text;
  if (typeof text !== "string" || !text.trim()) {
    throw new Error(
      `Voice line "${line.lineAssetId}" does not define spoken text.`
    );
  }
  const direction = version?.voiceSettings?.direction
    ?? version?.prompt
    ?? lineAsset.voiceSettings?.direction
    ?? lineAsset.prompt;
  const playback = lineAsset.audioPlayback || version?.audioPlayback
    ? {
        ...lineAsset.audioPlayback,
        ...version?.audioPlayback
      }
    : undefined;

  return {
    dialogId,
    blockId,
    line,
    voiceAsset,
    lineAsset,
    text,
    direction,
    audio: version ? {
      file: version.file,
      versionName: lineAsset.activeVersion,
      version,
      playback
    } : undefined
  };
}

export function targetKey(target: DialogElementTarget): string {
  switch (target.type) {
    case "dialog": return `dialog:${targetKeyPart(target.dialogId)}`;
    case "node": return `node:${targetKeyPart(target.dialogId)}:${targetKeyPart(target.nodeId)}`;
    case "line": return `line:${targetKeyPart(target.dialogId)}:${targetKeyPart(target.nodeId)}:${targetKeyPart(target.lineId)}`;
    case "option": return `option:${targetKeyPart(target.dialogId)}:${targetKeyPart(target.nodeId)}:${targetKeyPart(target.optionId)}`;
  }
}

function targetKeyPart(value: string): string {
  return encodeURIComponent(value);
}

function assertNode(node: DialogNode, label: string): void {
  assertNonEmpty(node.id, `${label}.id`);
  assertNonEmpty(node.name, `${label}.name`);
  assertBoolean(node.enabled, `${label}.enabled`);
  assertStringList(node.tags, `${label}.tags`);
  if (node.type === "block") {
    const lineIds = new Set<string>();
    for (const [index, line] of node.lines.entries()) {
      assertLine(line, `${label}.lines.${index}`);
      if (lineIds.has(line.id)) throw new Error(`${label} contains duplicate line id "${line.id}".`);
      lineIds.add(line.id);
    }
    return;
  }
  if (node.type !== "decision") throw new Error(`${label}.type must be "block" or "decision".`);
  assertNonEmpty(node.prompt, `${label}.prompt`);
  const optionIds = new Set<string>();
  for (const [index, option] of node.options.entries()) {
    const optionLabel = `${label}.options.${index}`;
    assertNonEmpty(option.id, `${optionLabel}.id`);
    assertNonEmpty(option.text, `${optionLabel}.text`);
    assertBoolean(option.enabled, `${optionLabel}.enabled`);
    assertStringList(option.tags, `${optionLabel}.tags`);
    if (optionIds.has(option.id)) throw new Error(`${label} contains duplicate option id "${option.id}".`);
    optionIds.add(option.id);
  }
}

function assertLine(line: DialogLine, label: string): void {
  assertNonEmpty(line.id, `${label}.id`);
  assertBoolean(line.enabled, `${label}.enabled`);
  assertNonEmpty(line.voiceAssetId, `${label}.voiceAssetId`);
  assertNonEmpty(line.lineAssetId, `${label}.lineAssetId`);
  assertStringList(line.tags, `${label}.tags`);
}

function assertNonEmpty(value: string, label: string): void {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} must be non-empty.`);
}

function assertBoolean(value: boolean, label: string): void {
  if (typeof value !== "boolean") throw new Error(`${label} must be a boolean.`);
}

function assertStringList(value: string[] | undefined, label: string): void {
  if (value === undefined) return;
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string" || !entry.trim())) {
    throw new Error(`${label} must contain non-empty strings.`);
  }
}
