import type { AiAssetManifest } from "@ai-game-assets/core";
import {
  assertDialogAiAssets,
  assertDialogManifest,
  cloneDialogManifest,
  getDialog,
  resolveDialogLine,
  targetKey
} from "./manifest.js";
import type {
  DialogDecision,
  DialogDecisionTurn,
  DialogDesignerManifest,
  DialogElementTarget,
  DialogEndReason,
  DialogEndTurn,
  DialogLine,
  DialogLineTurn,
  DialogNode,
  DialogRuntimeEventMap,
  DialogRuntimeListener,
  DialogRuntimeOptions,
  DialogRuntimeSnapshot,
  DialogTurn
} from "./types.js";

type RuntimeCursor = {
  nodeId: string;
  lineIndex: number;
  entered: boolean;
};

export class DialogRuntime {
  private manifest: DialogDesignerManifest;
  private aiAssets: AiAssetManifest;
  private readonly options: DialogRuntimeOptions;
  private readonly enabledOverrides = new Map<string, boolean>();
  private readonly listeners = new Map<keyof DialogRuntimeEventMap, Set<(event: never) => void>>();
  private dialogId?: string;
  private cursor?: RuntimeCursor;
  private turn?: DialogTurn;
  private status: DialogRuntimeSnapshot["status"] = "idle";

  constructor(
    manifest: DialogDesignerManifest,
    aiAssets: AiAssetManifest,
    options: DialogRuntimeOptions = {}
  ) {
    assertDialogManifest(manifest);
    assertDialogAiAssets(manifest, aiAssets, { targetId: options.targetId });
    this.manifest = cloneDialogManifest(manifest);
    this.aiAssets = structuredClone(aiAssets);
    this.options = options;
  }

  getManifest(): DialogDesignerManifest {
    return cloneDialogManifest(this.manifest);
  }

  setManifest(manifest: DialogDesignerManifest): void {
    assertDialogManifest(manifest);
    assertDialogAiAssets(manifest, this.aiAssets, { targetId: this.options.targetId });
    this.manifest = cloneDialogManifest(manifest);
    if (!this.dialogId || this.status !== "running") return;
    const dialog = this.manifest.dialogs[this.dialogId];
    if (
      !dialog
      || !this.isEnabled({ type: "dialog", dialogId: this.dialogId })
      || (this.cursor && !dialog.nodes[this.cursor.nodeId])
      || !this.activeTurnExistsIn(dialog)
    ) {
      this.stop();
    }
  }

  setAiAssets(aiAssets: AiAssetManifest): void {
    assertDialogAiAssets(this.manifest, aiAssets, { targetId: this.options.targetId });
    this.aiAssets = structuredClone(aiAssets);
  }

  snapshot(): DialogRuntimeSnapshot {
    return {
      dialogId: this.dialogId,
      status: this.status,
      turn: this.turn ? structuredClone(this.turn) : undefined
    };
  }

  current(): DialogTurn | undefined {
    return this.turn ? structuredClone(this.turn) : undefined;
  }

  start(dialogId: string): DialogTurn {
    if (this.status === "running") this.stop();
    let dialog = getDialog(this.manifest, dialogId);
    this.dialogId = dialogId;
    this.status = "running";
    this.cursor = undefined;
    this.turn = undefined;
    this.emit("dialog:start", { dialog: structuredClone(dialog) });

    if (this.status !== "running" || this.dialogId !== dialogId || this.turn !== undefined) {
      return this.interruptedTurn("starting a dialog");
    }

    if (!this.isEnabled({ type: "dialog", dialogId })) {
      return this.finish("disabled");
    }
    dialog = getDialog(this.manifest, dialogId);
    if (!dialog.entryNodeId) return this.finish("completed");
    this.cursor = { nodeId: dialog.entryNodeId, lineIndex: 0, entered: false };
    return this.seek();
  }

  advance(): DialogTurn {
    if (this.turn?.type === "end") return structuredClone(this.turn);
    if (!this.dialogId || this.status !== "running" || !this.turn) {
      throw new Error("No dialog is currently running.");
    }
    if (this.turn.type === "decision") {
      throw new Error("The current dialog turn is a decision; call choose(optionId).");
    }
    const activeTurn = this.turn;
    const said = structuredClone(activeTurn);
    this.emit("line:said", said);
    if (
      this.status !== "running"
      || this.dialogId !== said.dialogId
      || this.turn !== activeTurn
    ) {
      return this.interruptedTurn("advancing a dialog line");
    }
    this.cursor = {
      nodeId: said.nodeId,
      lineIndex: said.lineIndex + 1,
      entered: true
    };
    return this.seek();
  }

  choose(optionId: string): DialogTurn {
    if (this.turn?.type === "end") return structuredClone(this.turn);
    if (!this.dialogId || this.status !== "running" || this.turn?.type !== "decision") {
      throw new Error("The current dialog turn is not a decision.");
    }
    const decisionTurn = this.turn;
    const sourceDecision = getDialog(this.manifest, this.dialogId).nodes[decisionTurn.nodeId];
    if (!sourceDecision || sourceDecision.type !== "decision") {
      throw new Error(`Dialog decision "${decisionTurn.nodeId}" no longer exists.`);
    }
    const option = sourceDecision.options.find((candidate) => candidate.id === optionId);
    if (!option) throw new Error(`Unknown dialog option "${optionId}".`);
    if (!this.isEnabled({
      type: "option",
      dialogId: this.dialogId,
      nodeId: sourceDecision.id,
      optionId: option.id
    })) {
      throw new Error(`Dialog option "${optionId}" is disabled.`);
    }

    this.emit("option:selected", {
      dialogId: this.dialogId,
      nodeId: sourceDecision.id,
      decision: structuredClone(sourceDecision),
      option: structuredClone(option)
    });
    if (
      this.status !== "running"
      || this.dialogId !== decisionTurn.dialogId
      || this.turn !== decisionTurn
    ) {
      return this.interruptedTurn("choosing a dialog option");
    }
    const nextNodeId = option.nextNodeId ?? sourceDecision.nextNodeId;
    if (!nextNodeId) return this.finish("completed");
    this.cursor = { nodeId: nextNodeId, lineIndex: 0, entered: false };
    return this.seek();
  }

  stop(): DialogEndTurn | undefined {
    if (!this.dialogId || this.status !== "running") return undefined;
    return this.finish("stopped");
  }

  setEnabled(target: DialogElementTarget, enabled: boolean): void {
    this.assertTarget(target);
    this.enabledOverrides.set(targetKey(target), enabled);
    this.emit("enabled:change", { target: structuredClone(target), enabled });
  }

  enable(target: DialogElementTarget): void {
    this.setEnabled(target, true);
  }

  disable(target: DialogElementTarget): void {
    this.setEnabled(target, false);
  }

  setDialogEnabled(dialogId: string, enabled: boolean): void {
    this.setEnabled({ type: "dialog", dialogId }, enabled);
  }

  setNodeEnabled(dialogId: string, nodeId: string, enabled: boolean): void {
    this.setEnabled({ type: "node", dialogId, nodeId }, enabled);
  }

  setLineEnabled(
    dialogId: string,
    nodeId: string,
    lineId: string,
    enabled: boolean
  ): void {
    this.setEnabled({ type: "line", dialogId, nodeId, lineId }, enabled);
  }

  setOptionEnabled(
    dialogId: string,
    nodeId: string,
    optionId: string,
    enabled: boolean
  ): void {
    this.setEnabled({ type: "option", dialogId, nodeId, optionId }, enabled);
  }

  clearEnabled(target: DialogElementTarget): void {
    this.enabledOverrides.delete(targetKey(target));
  }

  clearEnabledOverrides(dialogId?: string): void {
    if (!dialogId) {
      this.enabledOverrides.clear();
      return;
    }
    const encodedDialogId = encodeURIComponent(dialogId);
    for (const key of this.enabledOverrides.keys()) {
      if (
        key === `dialog:${encodedDialogId}`
        || key.startsWith(`node:${encodedDialogId}:`)
        || key.startsWith(`line:${encodedDialogId}:`)
        || key.startsWith(`option:${encodedDialogId}:`)
      ) {
        this.enabledOverrides.delete(key);
      }
    }
  }

  isEnabled(target: DialogElementTarget): boolean {
    const external = this.options.isEnabled?.(target);
    if (external !== undefined) return external;
    const override = this.enabledOverrides.get(targetKey(target));
    if (override !== undefined) return override;
    return this.sourceEnabled(target);
  }

  on<K extends keyof DialogRuntimeEventMap>(
    event: K,
    listener: DialogRuntimeListener<K>
  ): () => void {
    let listeners = this.listeners.get(event);
    if (!listeners) {
      listeners = new Set();
      this.listeners.set(event, listeners);
    }
    listeners.add(listener as (event: never) => void);
    return () => this.off(event, listener);
  }

  off<K extends keyof DialogRuntimeEventMap>(
    event: K,
    listener: DialogRuntimeListener<K>
  ): void {
    this.listeners.get(event)?.delete(listener as (event: never) => void);
  }

  private seek(): DialogTurn {
    if (!this.dialogId || !this.cursor) return this.finish("completed");
    const dialog = getDialog(this.manifest, this.dialogId);
    let hops = 0;
    const maximumHops = Math.max(1, Object.keys(dialog.nodes).length + 1);

    while (this.cursor) {
      const cursor: RuntimeCursor = this.cursor;
      hops += 1;
      if (hops > maximumHops) {
        throw new Error(`Dialog "${dialog.id}" could not find an enabled turn.`);
      }
      const node: DialogNode | undefined = dialog.nodes[cursor.nodeId];
      if (!node) throw new Error(`Unknown dialog node "${cursor.nodeId}".`);

      const nodeTarget: DialogElementTarget = {
        type: "node",
        dialogId: dialog.id,
        nodeId: node.id
      };
      if (!this.isEnabled(nodeTarget)) {
        this.emit("node:skip", { dialogId: dialog.id, node: structuredClone(node), reason: "disabled" });
        const interrupted = this.turnAfterTraversalInterruption(dialog.id, cursor);
        if (interrupted) return interrupted;
        if (!node.nextNodeId) return this.finish("completed");
        this.cursor = { nodeId: node.nextNodeId, lineIndex: 0, entered: false };
        continue;
      }

      if (!cursor.entered) {
        cursor.entered = true;
        this.emit("node:enter", { dialogId: dialog.id, node: structuredClone(node) });
        const interrupted = this.turnAfterTraversalInterruption(dialog.id, cursor);
        if (interrupted) return interrupted;
      }

      if (node.type === "block") {
        const lineIndex = this.nextEnabledLineIndex(dialog.id, node.id, node.lines, cursor.lineIndex);
        if (lineIndex !== -1) {
          const line = node.lines[lineIndex]!;
          const turn: DialogLineTurn = {
            type: "line",
            dialogId: dialog.id,
            nodeId: node.id,
            block: structuredClone(node),
            lineIndex,
            line: structuredClone(line),
            resolved: resolveDialogLine(
              this.manifest,
              this.aiAssets,
              dialog.id,
              node.id,
              line.id,
              { targetId: this.options.targetId }
            )
          };
          cursor.lineIndex = lineIndex;
          this.turn = turn;
          this.emit("line:ready", structuredClone(turn));
          const interrupted = this.turnAfterTraversalInterruption(dialog.id, cursor);
          if (interrupted) return interrupted;
          return structuredClone(turn);
        }
        if (cursor.lineIndex === 0) {
          this.emit("node:skip", { dialogId: dialog.id, node: structuredClone(node), reason: "empty" });
          const interrupted = this.turnAfterTraversalInterruption(dialog.id, cursor);
          if (interrupted) return interrupted;
        }
        if (!node.nextNodeId) return this.finish("completed");
        this.cursor = { nodeId: node.nextNodeId, lineIndex: 0, entered: false };
        continue;
      }

      const options = node.options.filter((option) => this.isEnabled({
        type: "option",
        dialogId: dialog.id,
        nodeId: node.id,
        optionId: option.id
      }));
      if (options.length === 0) {
        this.emit("node:skip", { dialogId: dialog.id, node: structuredClone(node), reason: "empty" });
        const interrupted = this.turnAfterTraversalInterruption(dialog.id, cursor);
        if (interrupted) return interrupted;
        if (!node.nextNodeId) return this.finish("completed");
        this.cursor = { nodeId: node.nextNodeId, lineIndex: 0, entered: false };
        continue;
      }
      const turn: DialogDecisionTurn = {
        type: "decision",
        dialogId: dialog.id,
        nodeId: node.id,
        decision: structuredClone(node),
        options: structuredClone(options)
      };
      this.turn = turn;
      this.emit("decision:ready", structuredClone(turn));
      const interrupted = this.turnAfterTraversalInterruption(dialog.id, cursor);
      if (interrupted) return interrupted;
      return structuredClone(turn);
    }
    return this.finish("completed");
  }

  private nextEnabledLineIndex(
    dialogId: string,
    nodeId: string,
    lines: DialogLine[],
    fromIndex: number
  ): number {
    for (let index = fromIndex; index < lines.length; index += 1) {
      const line = lines[index]!;
      if (this.isEnabled({ type: "line", dialogId, nodeId, lineId: line.id })) return index;
    }
    return -1;
  }

  private finish(reason: DialogEndReason): DialogEndTurn {
    if (!this.dialogId) throw new Error("Cannot finish a dialog before it starts.");
    const turn: DialogEndTurn = { type: "end", dialogId: this.dialogId, reason };
    this.status = "ended";
    this.cursor = undefined;
    this.turn = turn;
    this.emit("dialog:end", structuredClone(turn));
    return structuredClone(turn);
  }

  private turnAfterTraversalInterruption(
    dialogId: string,
    cursor: RuntimeCursor
  ): DialogTurn | undefined {
    if (
      this.status === "running"
      && this.dialogId === dialogId
      && this.cursor === cursor
    ) {
      return undefined;
    }
    return this.interruptedTurn("resolving the next dialog turn");
  }

  private interruptedTurn(operation: string): DialogTurn {
    if (!this.turn) {
      throw new Error(`Dialog runtime state changed while ${operation}, but no current turn was produced.`);
    }
    return structuredClone(this.turn);
  }

  private activeTurnExistsIn(dialog: ReturnType<typeof getDialog>): boolean {
    const turn = this.turn;
    if (!turn || turn.type === "end") return true;
    if (turn.dialogId !== dialog.id) return false;
    const node = dialog.nodes[turn.nodeId];
    if (turn.type === "line") {
      return node?.type === "block"
        && this.isEnabled({
          type: "node",
          dialogId: dialog.id,
          nodeId: node.id
        })
        && node.lines.some((line) => line.id === turn.line.id)
        && this.isEnabled({
          type: "line",
          dialogId: dialog.id,
          nodeId: node.id,
          lineId: turn.line.id
        });
    }
    return node?.type === "decision"
      && this.isEnabled({
        type: "node",
        dialogId: dialog.id,
        nodeId: node.id
      })
      && turn.options.every((option) => (
        node.options.some((candidate) => candidate.id === option.id)
        && this.isEnabled({
          type: "option",
          dialogId: dialog.id,
          nodeId: node.id,
          optionId: option.id
        })
      ));
  }

  private sourceEnabled(target: DialogElementTarget): boolean {
    const dialog = getDialog(this.manifest, target.dialogId);
    if (target.type === "dialog") return dialog.enabled;
    const node = dialog.nodes[target.nodeId];
    if (!node) return false;
    if (target.type === "node") return node.enabled;
    if (target.type === "line") {
      return node.type === "block"
        ? node.lines.find((line) => line.id === target.lineId)?.enabled ?? false
        : false;
    }
    return node.type === "decision"
      ? node.options.find((option) => option.id === target.optionId)?.enabled ?? false
      : false;
  }

  private assertTarget(target: DialogElementTarget): void {
    const dialog = getDialog(this.manifest, target.dialogId);
    if (target.type === "dialog") return;
    const node = dialog.nodes[target.nodeId];
    if (!node) throw new Error(`Unknown dialog node "${target.nodeId}".`);
    if (target.type === "node") return;
    if (target.type === "line") {
      if (node.type !== "block" || !node.lines.some((line) => line.id === target.lineId)) {
        throw new Error(`Unknown dialog line "${target.lineId}".`);
      }
      return;
    }
    if (node.type !== "decision" || !node.options.some((option) => option.id === target.optionId)) {
      throw new Error(`Unknown dialog option "${target.optionId}".`);
    }
  }

  private emit<K extends keyof DialogRuntimeEventMap>(
    event: K,
    payload: DialogRuntimeEventMap[K]
  ): void {
    for (const listener of this.listeners.get(event) ?? []) {
      listener(payload as never);
    }
  }
}

export function decisionOption(
  decision: DialogDecision,
  optionId: string
): DialogDecision["options"][number] {
  const option = decision.options.find((candidate) => candidate.id === optionId);
  if (!option) throw new Error(`Unknown dialog option "${optionId}".`);
  return option;
}
