import {
  registerInGameDesignerPanel,
  type AiAssetManifest
} from "@ai-game-assets/core";
import {
  assertDialogAiAssets,
  assertDialogManifest,
  cloneDialogManifest,
  createDialog,
  createDialogBlock,
  createDialogDecision,
  createDialogLine,
  createDialogOption,
  dialogNodeChildIds,
  findDialogNodeParent,
  getDialog,
  getDialogNode,
  type DialogBlock,
  type DialogDecision,
  type DialogDefinition,
  type DialogDesignerManifest,
  type DialogLine,
  type DialogNode,
  type DialogNodeParent,
  type DialogOption,
  type DialogSelection
} from "@dialog-designer/core";
import {
  isVoiceAsset,
  isVoiceLineAsset,
  readableAssetName,
  suggestVoiceLineAssetId,
  voiceAssets,
  voiceLineAssetIds,
  voiceLineAssets,
  voiceLineDirection,
  voiceLineLabel,
  voiceLineText
} from "./ai-assets.js";
import {
  DialogDesignerDebugClient,
  type CreateDialogVoiceLineRequest
} from "./debug-client.js";
import { ensureDialogDesignerStyles } from "./styles.js";

export type DialogDesignerOptions = {
  manifest: DialogDesignerManifest;
  aiAssets: AiAssetManifest;
  client?: DialogDesignerDebugClient;
  title?: string;
  mount?: HTMLElement;
  defaultDialogId?: string;
  onOpenChange?(isOpen: boolean): void;
  onDialogChange?(dialogId: string, dialog: DialogDefinition): void;
  onManifestChange?(manifest: DialogDesignerManifest): void;
  onAiAssetsChange?(aiAssets: AiAssetManifest): void;
  onSelectionChange?(selection: DialogSelection | undefined): void;
};

export type DialogDesignerNodeUpdate = {
  name?: string;
  enabled?: boolean;
  prompt?: string;
};

export type DialogDesignerLineUpdate = Partial<Pick<
  DialogLine,
  "enabled" | "voiceAssetId" | "lineAssetId"
>>;

export type DialogDesignerOptionUpdate = Partial<Pick<
  DialogOption,
  "enabled" | "text"
>>;

export type DialogDesignerAddLineInput = {
  voiceAssetId?: string;
  lineAssetId?: string;
  enabled?: boolean;
};

export type DialogDesignerCreateVoiceLineInput = Omit<
  CreateDialogVoiceLineRequest,
  "assetId"
> & {
  assetId?: string;
};

export type DialogDesigner = {
  root: HTMLDivElement;
  open(): void;
  close(): void;
  isOpen(): boolean;
  destroy(): void;
  getManifest(): DialogDesignerManifest;
  getAiAssets(): AiAssetManifest;
  getDialogId(): string;
  getSelection(): DialogSelection | undefined;
  setManifest(manifest: DialogDesignerManifest): void;
  setAiAssets(aiAssets: AiAssetManifest): void;
  select(selection: DialogSelection | undefined): void;
  addDialog(name?: string): string;
  renameDialog(dialogId: string, name: string): void;
  setDialogEnabled(dialogId: string, enabled: boolean): void;
  removeDialog(dialogId: string): void;
  addNode(parent: DialogNodeParent, type: DialogNode["type"]): string;
  updateNode(nodeId: string, patch: DialogDesignerNodeUpdate): void;
  removeNode(nodeId: string): void;
  addLine(blockId: string, input?: DialogDesignerAddLineInput): string;
  updateLine(blockId: string, lineId: string, patch: DialogDesignerLineUpdate): void;
  moveLine(blockId: string, lineId: string, direction: -1 | 1): void;
  removeLine(blockId: string, lineId: string): void;
  createVoiceLine(blockId: string, input: DialogDesignerCreateVoiceLineInput): Promise<string>;
  addOption(decisionId: string, text?: string): string;
  updateOption(decisionId: string, optionId: string, patch: DialogDesignerOptionUpdate): void;
  removeOption(decisionId: string, optionId: string): void;
  undo(): void;
  redo(): void;
  promote(label?: string): Promise<void>;
};

type Elements = {
  root: HTMLDivElement;
  toggle: HTMLButtonElement;
  panel: HTMLDivElement;
  title: HTMLDivElement;
  dialogSelect: HTMLSelectElement;
  addDialog: HTMLButtonElement;
  undo: HTMLButtonElement;
  redo: HTMLButtonElement;
  promote: HTMLButtonElement;
  tree: HTMLDivElement;
  editor: HTMLElement;
  status: HTMLDivElement;
};

type StatusTone = "info" | "success" | "error" | "working";
type CommitOptions = {
  history?: boolean;
  aiAssets?: AiAssetManifest;
  emitAiAssets?: boolean;
  message?: string;
};

const MAX_HISTORY_ENTRIES = 100;

export function installDialogDesigner(options: DialogDesignerOptions): DialogDesigner {
  ensureDialogDesignerStyles();
  assertDialogManifest(options.manifest);
  assertDialogAiAssets(options.manifest, options.aiAssets);

  const client = options.client ?? new DialogDesignerDebugClient();
  let manifest = cloneDialogManifest(options.manifest);
  let aiAssets = structuredClone(options.aiAssets);
  const initialDialogIds = Object.keys(manifest.dialogs);
  if (initialDialogIds.length === 0) {
    const dialog = createDialog();
    manifest.dialogs[dialog.id] = dialog;
  }

  let selectedDialogId = options.defaultDialogId && manifest.dialogs[options.defaultDialogId]
    ? options.defaultDialogId
    : Object.keys(manifest.dialogs)[0] ?? "";
  let selection: DialogSelection | undefined = selectedDialogId
    ? { type: "dialog", dialogId: selectedDialogId }
    : undefined;
  const past: DialogDesignerManifest[] = [];
  const future: DialogDesignerManifest[] = [];
  let voiceLineRequestActive = false;
  let destroyed = false;
  let api!: DialogDesigner;

  const elements = createElements(options.title ?? "Dialogs");
  (options.mount ?? document.body).append(elements.root);
  const dockPanel = registerInGameDesignerPanel({
    id: "dialog-designer.dialogs",
    label: "Dialogs",
    panel: elements.panel,
    dragHandle: elements.title,
    button: elements.toggle,
    order: 40,
    ariaLabel: "Toggle dialog designer",
    onOpenChange: applyOpenState
  });

  api = {
    root: elements.root,
    open() {
      dockPanel.open();
    },
    close() {
      dockPanel.close();
    },
    isOpen() {
      return dockPanel.isOpen();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      window.removeEventListener("keydown", onKeyDown, true);
      dockPanel.destroy();
      elements.root.remove();
    },
    getManifest() {
      return cloneDialogManifest(manifest);
    },
    getAiAssets() {
      return structuredClone(aiAssets);
    },
    getDialogId() {
      return selectedDialogId;
    },
    getSelection() {
      return selection ? structuredClone(selection) : undefined;
    },
    setManifest(nextManifest) {
      assertDialogManifest(nextManifest);
      assertDialogAiAssets(nextManifest, aiAssets);
      manifest = cloneDialogManifest(nextManifest);
      past.length = 0;
      future.length = 0;
      normalizeSelection();
      render();
      emitManifestChange();
      emitSelectionChange();
      emitDialogChange();
      setStatus("Loaded dialog manifest.", "info");
    },
    setAiAssets(nextAiAssets) {
      assertDialogAiAssets(manifest, nextAiAssets);
      aiAssets = structuredClone(nextAiAssets);
      render();
      options.onAiAssetsChange?.(structuredClone(aiAssets));
      setStatus("Updated AI voice assets.", "info");
    },
    select(nextSelection) {
      selection = nextSelection ? structuredClone(nextSelection) : undefined;
      if (nextSelection?.dialogId && manifest.dialogs[nextSelection.dialogId]) {
        selectedDialogId = nextSelection.dialogId;
      }
      normalizeSelection();
      render();
      emitSelectionChange();
      emitDialogChange();
    },
    addDialog(name = uniqueDialogName("New Dialog")) {
      const dialog = createDialog({ name: name.trim() || uniqueDialogName("New Dialog") });
      commit((draft) => {
        draft.dialogs[dialog.id] = dialog;
      }, { message: `Added “${dialog.name}”.` });
      selectedDialogId = dialog.id;
      selection = { type: "dialog", dialogId: dialog.id };
      render();
      emitSelectionChange();
      emitDialogChange();
      return dialog.id;
    },
    renameDialog(dialogId, name) {
      const nextName = requireText(name, "Dialog name");
      commit((draft) => {
        getDialog(draft, dialogId).name = nextName;
      }, { message: "Renamed dialog." });
    },
    setDialogEnabled(dialogId, enabled) {
      commit((draft) => {
        getDialog(draft, dialogId).enabled = enabled;
      }, { message: enabled ? "Enabled dialog." : "Disabled dialog." });
    },
    removeDialog(dialogId) {
      const dialogName = getDialog(manifest, dialogId).name;
      commit((draft) => {
        delete draft.dialogs[dialogId];
        if (draft.dialogPaths) delete draft.dialogPaths[dialogId];
      }, { message: `Removed “${dialogName}”.` });
    },
    addNode(parent, type) {
      const node = type === "block" ? createDialogBlock() : createDialogDecision();
      commit((draft) => {
        const dialog = getDialog(draft, selectedDialogId);
        attachNode(dialog, parent, node.id);
        dialog.nodes[node.id] = node;
      }, { message: `Added ${type}.` });
      selection = { type: "node", dialogId: selectedDialogId, nodeId: node.id };
      render();
      emitSelectionChange();
      return node.id;
    },
    updateNode(nodeId, patch) {
      commit((draft) => {
        const node = getDialogNode(draft, selectedDialogId, nodeId);
        if (patch.name !== undefined) node.name = requireText(patch.name, "Node name");
        if (patch.enabled !== undefined) node.enabled = patch.enabled;
        if (patch.prompt !== undefined) {
          if (node.type !== "decision") throw new Error("Only decisions have prompts.");
          node.prompt = requireText(patch.prompt, "Decision prompt");
        }
      }, { message: "Updated dialog node." });
    },
    removeNode(nodeId) {
      const nodeName = getDialogNode(manifest, selectedDialogId, nodeId).name;
      commit((draft) => {
        removeNodeSubtree(getDialog(draft, selectedDialogId), nodeId);
      }, { message: `Removed “${nodeName}” and its branch.` });
    },
    addLine(blockId, input = {}) {
      const pair = resolveLinePair(input.voiceAssetId, input.lineAssetId);
      const line = createDialogLine({
        voiceAssetId: pair.voiceAssetId,
        lineAssetId: pair.lineAssetId,
        enabled: input.enabled
      });
      commit((draft) => {
        findBlock(draft, selectedDialogId, blockId).lines.push(line);
      }, { message: "Added existing voice line." });
      selection = {
        type: "line",
        dialogId: selectedDialogId,
        nodeId: blockId,
        lineId: line.id
      };
      render();
      emitSelectionChange();
      return line.id;
    },
    updateLine(blockId, lineId, patch) {
      commit((draft) => {
        const line = findLine(draft, selectedDialogId, blockId, lineId);
        if (patch.enabled !== undefined) line.enabled = patch.enabled;
        if (patch.voiceAssetId !== undefined) line.voiceAssetId = patch.voiceAssetId;
        if (patch.lineAssetId !== undefined) line.lineAssetId = patch.lineAssetId;
      }, { message: "Updated dialog line." });
    },
    moveLine(blockId, lineId, direction) {
      commit((draft) => {
        const lines = findBlock(draft, selectedDialogId, blockId).lines;
        const index = lines.findIndex((line) => line.id === lineId);
        if (index === -1) throw new Error(`Unknown dialog line “${lineId}”.`);
        const destination = index + direction;
        if (destination < 0 || destination >= lines.length) return;
        const [line] = lines.splice(index, 1);
        lines.splice(destination, 0, line!);
      }, { message: "Reordered dialog line." });
    },
    removeLine(blockId, lineId) {
      commit((draft) => {
        const block = findBlock(draft, selectedDialogId, blockId);
        if (!block.lines.some((line) => line.id === lineId)) {
          throw new Error(`Unknown dialog line “${lineId}”.`);
        }
        block.lines = block.lines.filter((line) => line.id !== lineId);
      }, { message: "Removed dialog line." });
    },
    async createVoiceLine(blockId, input) {
      if (voiceLineRequestActive) throw new Error("A voice line is already being created.");
      const voiceAssetId = requireText(input.voiceAssetId, "Voice");
      const text = requireText(input.text, "Line text");
      if (!isVoiceAsset(aiAssets.assets[voiceAssetId])) {
        throw new Error(`Unknown AI voice asset “${voiceAssetId}”.`);
      }
      // Resolve the block before starting external work so a stale selection fails early.
      const requestDialogId = selectedDialogId;
      findBlock(manifest, requestDialogId, blockId);
      voiceLineRequestActive = true;
      setStatus("Adding voice line to AI Assets…", "working");
      try {
        const result = await client.createVoiceLine({
          voiceAssetId,
          text,
          direction: input.direction?.trim() || undefined,
          assetId: input.assetId?.trim() || suggestVoiceLineAssetId(aiAssets, voiceAssetId, text),
          label: input.label?.trim() || undefined
        });
        const lineAsset = result.aiAssets.assets[result.lineAssetId];
        if (!isVoiceLineAsset(lineAsset) || result.asset.id !== result.lineAssetId) {
          throw new Error("Dialog designer dev server returned an invalid voice-line asset.");
        }
        const line = createDialogLine({
          voiceAssetId,
          lineAssetId: result.lineAssetId
        });
        voiceLineRequestActive = false;
        commit((draft) => {
          findBlock(draft, requestDialogId, blockId).lines.push(line);
        }, {
          aiAssets: result.aiAssets,
          emitAiAssets: true,
          message: `Created voice line “${result.lineAssetId}”.`
        });
        if (selectedDialogId === requestDialogId) {
          selection = {
            type: "line",
            dialogId: requestDialogId,
            nodeId: blockId,
            lineId: line.id
          };
          render();
          emitSelectionChange();
        }
        return line.id;
      } catch (error) {
        setStatus(errorMessage(error), "error");
        throw error;
      } finally {
        voiceLineRequestActive = false;
      }
    },
    addOption(decisionId, text = "New option") {
      const option = createDialogOption({ text: text.trim() || "New option" });
      commit((draft) => {
        findDecision(draft, selectedDialogId, decisionId).options.push(option);
      }, { message: "Added decision option." });
      selection = {
        type: "option",
        dialogId: selectedDialogId,
        nodeId: decisionId,
        optionId: option.id
      };
      render();
      emitSelectionChange();
      return option.id;
    },
    updateOption(decisionId, optionId, patch) {
      commit((draft) => {
        const option = findOption(draft, selectedDialogId, decisionId, optionId);
        if (patch.text !== undefined) option.text = requireText(patch.text, "Option text");
        if (patch.enabled !== undefined) option.enabled = patch.enabled;
      }, { message: "Updated decision option." });
    },
    removeOption(decisionId, optionId) {
      commit((draft) => {
        const dialog = getDialog(draft, selectedDialogId);
        const decision = findDecision(draft, selectedDialogId, decisionId);
        const option = decision.options.find((candidate) => candidate.id === optionId);
        if (!option) throw new Error(`Unknown dialog option “${optionId}”.`);
        if (option.nextNodeId) deleteSubtree(dialog, option.nextNodeId);
        decision.options = decision.options.filter((candidate) => candidate.id !== optionId);
      }, { message: "Removed decision option and its branch." });
    },
    undo() {
      const previous = past.pop();
      if (!previous) return;
      assertDialogAiAssets(previous, aiAssets);
      future.push(cloneDialogManifest(manifest));
      trimHistory(future);
      manifest = previous;
      normalizeSelection();
      render();
      emitManifestChange();
      emitSelectionChange();
      emitDialogChange();
      setStatus("Undid dialog edit.", "info");
    },
    redo() {
      const next = future.pop();
      if (!next) return;
      assertDialogAiAssets(next, aiAssets);
      past.push(cloneDialogManifest(manifest));
      trimHistory(past);
      manifest = next;
      normalizeSelection();
      render();
      emitManifestChange();
      emitSelectionChange();
      emitDialogChange();
      setStatus("Redid dialog edit.", "info");
    },
    async promote(label = "Promoted dialog changes.") {
      try {
        setStatus("Promoting dialog manifest…", "working");
        const promoted = await client.promote({
          manifest,
          dialogId: selectedDialogId || undefined,
          label
        });
        assertDialogManifest(promoted);
        assertDialogAiAssets(promoted, aiAssets);
        manifest = cloneDialogManifest(promoted);
        normalizeSelection();
        render();
        emitManifestChange();
        emitSelectionChange();
        emitDialogChange();
        setStatus(label, "success");
      } catch (error) {
        setStatus(errorMessage(error), "error");
      }
    }
  };

  elements.dialogSelect.addEventListener("change", () => {
    selectedDialogId = elements.dialogSelect.value;
    selection = selectedDialogId ? { type: "dialog", dialogId: selectedDialogId } : undefined;
    render();
    emitSelectionChange();
    emitDialogChange();
  });
  elements.addDialog.addEventListener("click", () => perform(() => api.addDialog()));
  elements.undo.addEventListener("click", () => perform(() => api.undo()));
  elements.redo.addEventListener("click", () => perform(() => api.redo()));
  elements.promote.addEventListener("click", () => void api.promote());
  window.addEventListener("keydown", onKeyDown, true);

  render();
  emitManifestChange();
  emitSelectionChange();
  emitDialogChange();
  return api;

  function createElements(title: string): Elements {
    const root = document.createElement("div");
    root.className = "dialog-designer";
    root.dataset.open = "false";

    const toggle = button("Dialogs", "dialog-designer__toggle");
    toggle.setAttribute("aria-expanded", "false");

    const panel = document.createElement("div");
    panel.className = "dialog-designer__panel";

    const header = document.createElement("div");
    header.className = "dialog-designer__header";
    const titleWrap = document.createElement("div");
    titleWrap.className = "dialog-designer__title-wrap";
    const eyebrow = document.createElement("div");
    eyebrow.className = "dialog-designer__eyebrow";
    eyebrow.textContent = "Conversation graph";
    const titleElement = document.createElement("div");
    titleElement.className = "dialog-designer__title";
    titleElement.textContent = title;
    titleWrap.append(eyebrow, titleElement);

    const actions = document.createElement("div");
    actions.className = "dialog-designer__actions";
    const undo = button("Undo", "dialog-designer__button dialog-designer__button--small");
    const redo = button("Redo", "dialog-designer__button dialog-designer__button--small");
    const promote = button("Promote", "dialog-designer__button dialog-designer__button--primary");
    actions.append(undo, redo, promote);
    header.append(titleWrap, actions);

    const body = document.createElement("div");
    body.className = "dialog-designer__body";
    const dialogBar = document.createElement("div");
    dialogBar.className = "dialog-designer__dialog-bar";
    const dialogSelect = document.createElement("select");
    dialogSelect.className = "dialog-designer__select";
    dialogSelect.setAttribute("aria-label", "Selected dialog");
    const addDialog = button("+ Dialog", "dialog-designer__button");
    dialogBar.append(dialogSelect, addDialog);

    const workspace = document.createElement("div");
    workspace.className = "dialog-designer__workspace";
    const treeSection = document.createElement("section");
    treeSection.className = "dialog-designer__section";
    const treeHead = document.createElement("div");
    treeHead.className = "dialog-designer__section-head";
    treeHead.textContent = "Dialog tree";
    const tree = document.createElement("div");
    tree.className = "dialog-designer__tree";
    treeSection.append(treeHead, tree);

    const editor = document.createElement("section");
    editor.className = "dialog-designer__editor";
    workspace.append(treeSection, editor);

    const status = document.createElement("div");
    status.className = "dialog-designer__status";
    status.textContent = "Dialog edits stay local until promoted.";
    status.dataset.tone = "info";
    body.append(dialogBar, workspace, status);
    panel.append(header, body);
    root.append(toggle, panel);

    return {
      root,
      toggle,
      panel,
      title: titleElement,
      dialogSelect,
      addDialog,
      undo,
      redo,
      promote,
      tree,
      editor,
      status
    };
  }

  function render(): void {
    renderDialogSelect();
    renderHistoryControls();
    renderTree();
    renderEditor();
  }

  function renderDialogSelect(): void {
    elements.dialogSelect.innerHTML = "";
    const dialogs = Object.values(manifest.dialogs)
      .sort((left, right) => left.name.localeCompare(right.name));
    for (const dialog of dialogs) {
      const option = document.createElement("option");
      option.value = dialog.id;
      option.textContent = dialog.enabled ? dialog.name : `${dialog.name} (disabled)`;
      elements.dialogSelect.append(option);
    }
    elements.dialogSelect.disabled = dialogs.length === 0;
    elements.dialogSelect.value = selectedDialogId;
  }

  function renderHistoryControls(): void {
    elements.undo.disabled = past.length === 0;
    elements.redo.disabled = future.length === 0;
    elements.promote.disabled = Object.keys(manifest.dialogs).length === 0;
  }

  function renderTree(): void {
    elements.tree.innerHTML = "";
    const dialog = selectedDialog();
    if (!dialog) {
      elements.tree.append(emptyMessage("Add a dialog to begin authoring."));
      return;
    }
    if (!dialog.entryNodeId) {
      const empty = emptyMessage("This dialog has no opening node.");
      const add = renderAddNodeButtons({ type: "entry", dialogId: dialog.id });
      elements.tree.append(empty, add);
      return;
    }
    elements.tree.append(renderNodeBranch(dialog, dialog.entryNodeId, "Opening", new Set()));
  }

  function renderNodeBranch(
    dialog: DialogDefinition,
    nodeId: string,
    label: string,
    ancestors: Set<string>
  ): HTMLElement {
    const branch = document.createElement("div");
    branch.className = "dialog-designer__branch";
    const branchLabel = document.createElement("div");
    branchLabel.className = "dialog-designer__branch-label";
    branchLabel.textContent = label;
    branch.append(branchLabel);

    const node = dialog.nodes[nodeId];
    if (!node) {
      branch.append(emptyMessage(`Missing node: ${nodeId}`));
      return branch;
    }
    if (ancestors.has(nodeId)) {
      branch.append(emptyMessage(`Cycle detected at ${nodeId}`));
      return branch;
    }

    const nextAncestors = new Set(ancestors);
    nextAncestors.add(nodeId);
    const card = document.createElement("div");
    card.className = "dialog-designer__node";
    card.classList.toggle("is-selected", selection?.type !== "dialog" && selection?.nodeId === node.id);
    card.classList.toggle("is-disabled", !node.enabled);

    const head = document.createElement("div");
    head.className = "dialog-designer__node-head";
    const selectNode = document.createElement("button");
    selectNode.type = "button";
    selectNode.className = "dialog-designer__node-select";
    const type = document.createElement("span");
    type.className = `dialog-designer__type${node.type === "decision" ? " dialog-designer__type--decision" : ""}`;
    type.textContent = node.type;
    const name = document.createElement("span");
    name.className = "dialog-designer__node-name";
    name.textContent = node.name;
    selectNode.append(type, name);
    selectNode.addEventListener("click", () => api.select({
      type: "node",
      dialogId: dialog.id,
      nodeId: node.id
    }));
    const enabled = iconButton(node.enabled ? "●" : "○", node.enabled ? "Disable node" : "Enable node");
    enabled.addEventListener("click", () => perform(() => api.updateNode(node.id, { enabled: !node.enabled })));
    const remove = iconButton("×", `Remove ${node.name}`, true);
    remove.addEventListener("click", () => perform(() => api.removeNode(node.id)));
    head.append(selectNode, enabled, remove);
    card.append(head);

    const children = document.createElement("div");
    children.className = "dialog-designer__node-children";
    if (node.type === "block") {
      renderBlockTreeContent(dialog, node, children, nextAncestors);
    } else {
      renderDecisionTreeContent(dialog, node, children, nextAncestors);
    }
    card.append(children);
    branch.append(card);
    return branch;
  }

  function renderBlockTreeContent(
    dialog: DialogDefinition,
    block: DialogBlock,
    container: HTMLElement,
    ancestors: Set<string>
  ): void {
    if (block.lines.length > 0) {
      const lines = document.createElement("div");
      lines.className = "dialog-designer__mini-lines";
      block.lines.forEach((line, index) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "dialog-designer__mini-line";
        item.classList.toggle("is-selected", selection?.type === "line" && selection.lineId === line.id);
        const number = document.createElement("strong");
        number.textContent = `${index + 1}`;
        const copy = document.createElement("span");
        const lineAsset = aiAssets.assets[line.lineAssetId];
        copy.textContent = `${readableAssetName(line.voiceAssetId)}: ${voiceLineText(lineAsset)}`;
        if (!line.enabled) copy.textContent += " (disabled)";
        item.append(number, copy);
        item.addEventListener("click", () => api.select({
          type: "line",
          dialogId: dialog.id,
          nodeId: block.id,
          lineId: line.id
        }));
        lines.append(item);
      });
      container.append(lines);
    } else {
      const hint = document.createElement("div");
      hint.className = "dialog-designer__hint";
      hint.textContent = "No lines — this block will be skipped.";
      container.append(hint);
    }

    const continuation = document.createElement("div");
    continuation.className = "dialog-designer__continuation";
    continuation.append(block.nextNodeId
      ? renderNodeBranch(dialog, block.nextNodeId, "Then", ancestors)
      : renderEmptyBranch({ type: "block-next", nodeId: block.id }, "Then"));
    container.append(continuation);
  }

  function renderDecisionTreeContent(
    dialog: DialogDefinition,
    decision: DialogDecision,
    container: HTMLElement,
    ancestors: Set<string>
  ): void {
    if (decision.options.length === 0) {
      const hint = document.createElement("div");
      hint.className = "dialog-designer__hint";
      hint.textContent = "No choices — the fallback branch will be used.";
      container.append(hint);
    }

    for (const option of decision.options) {
      const optionBranch = document.createElement("div");
      optionBranch.className = "dialog-designer__option-branch";
      optionBranch.classList.toggle("is-disabled", !option.enabled);
      const head = document.createElement("div");
      head.className = "dialog-designer__option-head";
      const summary = document.createElement("button");
      summary.type = "button";
      summary.className = "dialog-designer__option-summary";
      summary.classList.toggle(
        "is-selected",
        selection?.type === "option" && selection.optionId === option.id
      );
      const summaryText = document.createElement("span");
      summaryText.textContent = option.text;
      summary.append(summaryText);
      summary.addEventListener("click", () => api.select({
        type: "option",
        dialogId: dialog.id,
        nodeId: decision.id,
        optionId: option.id
      }));
      const enabled = iconButton(option.enabled ? "●" : "○", option.enabled ? "Disable option" : "Enable option");
      enabled.addEventListener("click", () => perform(() => api.updateOption(
        decision.id,
        option.id,
        { enabled: !option.enabled }
      )));
      const remove = iconButton("×", "Remove option and branch", true);
      remove.addEventListener("click", () => perform(() => api.removeOption(decision.id, option.id)));
      head.append(summary, enabled, remove);
      optionBranch.append(head);
      optionBranch.append(option.nextNodeId
        ? renderNodeBranch(dialog, option.nextNodeId, "Branch", ancestors)
        : renderEmptyBranch({ type: "option", nodeId: decision.id, optionId: option.id }, "Branch"));
      container.append(optionBranch);
    }

    const addOption = button("+ Option", "dialog-designer__button dialog-designer__button--small");
    addOption.addEventListener("click", () => perform(() => api.addOption(decision.id)));
    container.append(addOption);

    const fallback = document.createElement("div");
    fallback.className = "dialog-designer__continuation";
    fallback.append(decision.nextNodeId
      ? renderNodeBranch(dialog, decision.nextNodeId, "Fallback / no option branch", ancestors)
      : renderEmptyBranch({ type: "decision-next", nodeId: decision.id }, "Fallback / no option branch"));
    container.append(fallback);
  }

  function renderEmptyBranch(parent: DialogNodeParent, label: string): HTMLElement {
    const branch = document.createElement("div");
    branch.className = "dialog-designer__branch";
    const branchLabel = document.createElement("div");
    branchLabel.className = "dialog-designer__branch-label";
    branchLabel.textContent = label;
    branch.append(branchLabel, renderAddNodeButtons(parent));
    return branch;
  }

  function renderAddNodeButtons(parent: DialogNodeParent): HTMLElement {
    const row = document.createElement("div");
    row.className = "dialog-designer__add-row";
    const addBlock = button("+ Block", "dialog-designer__button dialog-designer__button--small");
    const addDecision = button("+ Decision", "dialog-designer__button dialog-designer__button--small");
    addBlock.addEventListener("click", () => perform(() => api.addNode(parent, "block")));
    addDecision.addEventListener("click", () => perform(() => api.addNode(parent, "decision")));
    row.append(addBlock, addDecision);
    return row;
  }

  function renderEditor(): void {
    elements.editor.innerHTML = "";
    const head = document.createElement("div");
    head.className = "dialog-designer__section-head";
    const body = document.createElement("div");
    body.className = "dialog-designer__editor-body";
    const dialog = selectedDialog();
    if (!dialog || !selection) {
      head.textContent = "Inspector";
      body.append(emptyMessage("Select a dialog element to edit it."));
      elements.editor.append(head, body);
      return;
    }

    if (selection.type === "dialog") {
      head.textContent = "Dialog";
      renderDialogEditor(dialog, body);
      elements.editor.append(head, body);
      return;
    }

    const node = dialog.nodes[selection.nodeId];
    if (!node) {
      head.textContent = "Inspector";
      body.append(emptyMessage("The selected node no longer exists."));
      elements.editor.append(head, body);
      return;
    }
    head.textContent = node.type === "block" ? "Dialog block" : "Decision";
    renderNodeEditor(node, body);
    elements.editor.append(head, body);
  }

  function renderDialogEditor(dialog: DialogDefinition, container: HTMLElement): void {
    const name = textInput(dialog.name);
    name.addEventListener("change", () => perform(() => api.renameDialog(dialog.id, name.value)));
    container.append(field("Name", name));

    const enabled = check("Enabled", dialog.enabled);
    enabled.input.addEventListener("change", () => perform(() => api.setDialogEnabled(
      dialog.id,
      enabled.input.checked
    )));
    container.append(enabled.label);

    const summary = document.createElement("p");
    summary.className = "dialog-designer__hint";
    const nodes = Object.values(dialog.nodes);
    const lineCount = nodes.reduce((count, node) => count + (node.type === "block" ? node.lines.length : 0), 0);
    const optionCount = nodes.reduce((count, node) => count + (node.type === "decision" ? node.options.length : 0), 0);
    summary.textContent = `${nodes.length} nodes · ${lineCount} lines · ${optionCount} choices`;
    container.append(summary);

    const remove = button("Remove dialog", "dialog-designer__button dialog-designer__button--danger");
    remove.addEventListener("click", () => perform(() => api.removeDialog(dialog.id)));
    container.append(sectionBreak("Danger zone"), remove);
  }

  function renderNodeEditor(node: DialogNode, container: HTMLElement): void {
    const name = textInput(node.name);
    name.addEventListener("change", () => perform(() => api.updateNode(node.id, { name: name.value })));
    container.append(field("Name", name));

    const enabled = check("Enabled", node.enabled);
    enabled.input.addEventListener("change", () => perform(() => api.updateNode(
      node.id,
      { enabled: enabled.input.checked }
    )));
    container.append(enabled.label);

    if (node.type === "block") {
      renderBlockEditor(node, container);
    } else {
      const prompt = textarea(node.prompt);
      prompt.addEventListener("change", () => perform(() => api.updateNode(node.id, { prompt: prompt.value })));
      container.append(field("Prompt shown with choices", prompt));
      renderDecisionEditor(node, container);
    }

    const remove = button(
      `Remove ${node.type}`,
      "dialog-designer__button dialog-designer__button--danger"
    );
    remove.addEventListener("click", () => perform(() => api.removeNode(node.id)));
    container.append(sectionBreak("Danger zone"), remove);
  }

  function renderBlockEditor(block: DialogBlock, container: HTMLElement): void {
    const subhead = sectionBreak("Lines");
    const addExisting = button(
      "+ Existing line",
      "dialog-designer__button dialog-designer__button--small"
    );
    addExisting.disabled = firstVoiceLinePair() === undefined;
    addExisting.addEventListener("click", () => perform(() => api.addLine(block.id)));
    subhead.append(addExisting);
    container.append(subhead);

    const list = document.createElement("div");
    list.className = "dialog-designer__card-list";
    if (block.lines.length === 0) list.append(emptyMessage("No lines in this block."));
    block.lines.forEach((line, index) => list.append(renderLineCard(block, line, index)));
    container.append(list, renderCreateVoiceLineForm(block));
  }

  function renderLineCard(block: DialogBlock, line: DialogLine, index: number): HTMLElement {
    const card = document.createElement("div");
    card.className = "dialog-designer__line-card";
    card.classList.toggle("is-selected", selection?.type === "line" && selection.lineId === line.id);
    card.classList.toggle("is-disabled", !line.enabled);
    card.addEventListener("click", (event) => {
      if (isInteractiveTarget(event.target)) return;
      api.select({
        type: "line",
        dialogId: selectedDialogId,
        nodeId: block.id,
        lineId: line.id
      });
    });

    const top = document.createElement("div");
    top.className = "dialog-designer__line-top";
    const lineNumber = document.createElement("span");
    lineNumber.className = "dialog-designer__line-index";
    lineNumber.textContent = `LINE ${index + 1}`;
    const actions = document.createElement("div");
    actions.className = "dialog-designer__compact-actions";
    const up = iconButton("↑", "Move line up");
    up.disabled = index === 0;
    up.addEventListener("click", stop(() => perform(() => api.moveLine(block.id, line.id, -1))));
    const down = iconButton("↓", "Move line down");
    down.disabled = index === block.lines.length - 1;
    down.addEventListener("click", stop(() => perform(() => api.moveLine(block.id, line.id, 1))));
    const remove = iconButton("×", "Remove line", true);
    remove.addEventListener("click", stop(() => perform(() => api.removeLine(block.id, line.id))));
    actions.append(up, down, remove);
    top.append(lineNumber, actions);
    card.append(top);

    const enabled = check("Enabled", line.enabled);
    enabled.input.addEventListener("click", (event) => event.stopPropagation());
    enabled.input.addEventListener("change", () => perform(() => api.updateLine(
      block.id,
      line.id,
      { enabled: enabled.input.checked }
    )));
    card.append(enabled.label);

    const voiceSelect = document.createElement("select");
    voiceSelect.className = "dialog-designer__select";
    for (const voice of voiceAssets(aiAssets)) {
      const option = document.createElement("option");
      option.value = voice.id;
      option.textContent = readableAssetName(voice.id);
      voiceSelect.append(option);
    }
    voiceSelect.value = line.voiceAssetId;
    voiceSelect.addEventListener("click", (event) => event.stopPropagation());
    voiceSelect.addEventListener("change", () => {
      const available = voiceLineAssetIds(aiAssets, voiceSelect.value);
      const nextLineAssetId = available.includes(line.lineAssetId)
        ? line.lineAssetId
        : available[0];
      if (!nextLineAssetId) {
        setStatus("That voice has no existing lines. Create one below first.", "error");
        render();
        return;
      }
      perform(() => api.updateLine(block.id, line.id, {
        voiceAssetId: voiceSelect.value,
        lineAssetId: nextLineAssetId
      }));
    });
    card.append(field("Voice", voiceSelect));

    const lineSelect = document.createElement("select");
    lineSelect.className = "dialog-designer__select";
    for (const asset of voiceLineAssets(aiAssets, line.voiceAssetId)) {
      const option = document.createElement("option");
      option.value = asset.id;
      option.textContent = voiceLineLabel(asset);
      lineSelect.append(option);
    }
    lineSelect.value = line.lineAssetId;
    lineSelect.addEventListener("click", (event) => event.stopPropagation());
    lineSelect.addEventListener("change", () => perform(() => api.updateLine(
      block.id,
      line.id,
      { lineAssetId: lineSelect.value }
    )));
    card.append(field("Voice line", lineSelect));

    const asset = aiAssets.assets[line.lineAssetId];
    const direction = voiceLineDirection(asset);
    if (direction) {
      const note = document.createElement("p");
      note.className = "dialog-designer__line-copy";
      note.textContent = `Direction: ${direction}`;
      card.append(note);
    }
    return card;
  }

  function renderCreateVoiceLineForm(block: DialogBlock): HTMLElement {
    const details = document.createElement("details");
    details.className = "dialog-designer__create-card";
    const summary = document.createElement("summary");
    summary.textContent = "Create a new AI voice line";
    details.append(summary);

    const form = document.createElement("form");
    form.className = "dialog-designer__create-form";
    const voice = document.createElement("select");
    voice.className = "dialog-designer__select";
    for (const asset of voiceAssets(aiAssets)) {
      const option = document.createElement("option");
      option.value = asset.id;
      option.textContent = readableAssetName(asset.id);
      voice.append(option);
    }
    const lineLabel = textInput("");
    lineLabel.placeholder = "Optional label";
    const text = textarea("");
    text.placeholder = "What should the character say?";
    text.required = true;
    const direction = textarea("");
    direction.placeholder = "Tone, pacing, emotion, pronunciation…";
    const create = button("Create and add line", "dialog-designer__button dialog-designer__button--primary");
    create.type = "submit";
    create.disabled = voice.options.length === 0 || voiceLineRequestActive;
    form.append(
      field("Voice", voice),
      field("Line label", lineLabel),
      field("Text", text),
      field("Director notes", direction),
      create
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      create.disabled = true;
      void api.createVoiceLine(block.id, {
        voiceAssetId: voice.value,
        text: text.value,
        direction: direction.value,
        label: lineLabel.value,
        assetId: suggestVoiceLineAssetId(aiAssets, voice.value, text.value)
      }).catch(() => {
        create.disabled = false;
      });
    });
    details.append(form);
    return details;
  }

  function renderDecisionEditor(decision: DialogDecision, container: HTMLElement): void {
    const subhead = sectionBreak("Options");
    const add = button("+ Option", "dialog-designer__button dialog-designer__button--small");
    add.addEventListener("click", () => perform(() => api.addOption(decision.id)));
    subhead.append(add);
    container.append(subhead);

    const list = document.createElement("div");
    list.className = "dialog-designer__card-list";
    if (decision.options.length === 0) list.append(emptyMessage("No options yet."));
    for (const option of decision.options) {
      const card = document.createElement("div");
      card.className = "dialog-designer__option-card";
      card.classList.toggle(
        "is-selected",
        selection?.type === "option" && selection.optionId === option.id
      );
      card.classList.toggle("is-disabled", !option.enabled);
      card.addEventListener("click", (event) => {
        if (isInteractiveTarget(event.target)) return;
        api.select({
          type: "option",
          dialogId: selectedDialogId,
          nodeId: decision.id,
          optionId: option.id
        });
      });
      const top = document.createElement("div");
      top.className = "dialog-designer__option-top";
      const enabled = check("Enabled", option.enabled);
      enabled.input.addEventListener("click", (event) => event.stopPropagation());
      enabled.input.addEventListener("change", () => perform(() => api.updateOption(
        decision.id,
        option.id,
        { enabled: enabled.input.checked }
      )));
      const remove = iconButton("×", "Remove option and branch", true);
      remove.addEventListener("click", stop(() => perform(() => api.removeOption(decision.id, option.id))));
      top.append(enabled.label, remove);
      card.append(top);
      const copy = textInput(option.text);
      copy.addEventListener("click", (event) => event.stopPropagation());
      copy.addEventListener("change", () => perform(() => api.updateOption(
        decision.id,
        option.id,
        { text: copy.value }
      )));
      card.append(field("Choice text", copy));
      const branch = document.createElement("p");
      branch.className = "dialog-designer__hint";
      branch.textContent = option.nextNodeId
        ? `Branch starts at ${decisionName(option.nextNodeId)}.`
        : "No branch; the decision fallback is used.";
      card.append(branch);
      list.append(card);
    }
    container.append(list);
  }

  function commit(
    mutator: (draft: DialogDesignerManifest) => void,
    commitOptions: CommitOptions = {}
  ): void {
    const draft = cloneDialogManifest(manifest);
    const nextAiAssets = commitOptions.aiAssets
      ? structuredClone(commitOptions.aiAssets)
      : aiAssets;
    mutator(draft);
    assertDialogManifest(draft);
    assertDialogAiAssets(draft, nextAiAssets);

    if (commitOptions.history !== false) {
      past.push(cloneDialogManifest(manifest));
      trimHistory(past);
      future.length = 0;
    }
    manifest = draft;
    if (commitOptions.aiAssets) aiAssets = nextAiAssets;
    normalizeSelection();
    render();
    emitManifestChange();
    emitSelectionChange();
    emitDialogChange();
    if (commitOptions.emitAiAssets) {
      options.onAiAssetsChange?.(structuredClone(aiAssets));
    }
    if (commitOptions.message) setStatus(commitOptions.message, "success");
  }

  function normalizeSelection(): void {
    if (!selectedDialogId || !manifest.dialogs[selectedDialogId]) {
      selectedDialogId = Object.keys(manifest.dialogs)[0] ?? "";
    }
    if (!selectedDialogId) {
      selection = undefined;
      return;
    }
    const dialog = manifest.dialogs[selectedDialogId]!;
    const currentSelection = selection;
    if (!currentSelection || currentSelection.dialogId !== selectedDialogId) {
      selection = { type: "dialog", dialogId: selectedDialogId };
      return;
    }
    if (currentSelection.type === "dialog") return;
    const node = dialog.nodes[currentSelection.nodeId];
    if (!node) {
      selection = { type: "dialog", dialogId: dialog.id };
      return;
    }
    if (currentSelection.type === "node") return;
    if (currentSelection.type === "line") {
      if (node.type !== "block" || !node.lines.some((line) => line.id === currentSelection.lineId)) {
        selection = { type: "node", dialogId: dialog.id, nodeId: node.id };
      }
      return;
    }
    if (node.type !== "decision" || !node.options.some((option) => option.id === currentSelection.optionId)) {
      selection = { type: "node", dialogId: dialog.id, nodeId: node.id };
    }
  }

  function selectedDialog(): DialogDefinition | undefined {
    return selectedDialogId ? manifest.dialogs[selectedDialogId] : undefined;
  }

  function uniqueDialogName(base: string): string {
    const names = new Set(Object.values(manifest.dialogs).map((dialog) => dialog.name));
    let candidate = base;
    let index = 2;
    while (names.has(candidate)) {
      candidate = `${base} ${index}`;
      index += 1;
    }
    return candidate;
  }

  function firstVoiceLinePair(): { voiceAssetId: string; lineAssetId: string } | undefined {
    for (const voice of voiceAssets(aiAssets)) {
      const lineAssetId = voiceLineAssetIds(aiAssets, voice.id)[0];
      if (lineAssetId) return { voiceAssetId: voice.id, lineAssetId };
    }
    return undefined;
  }

  function resolveLinePair(
    preferredVoiceId?: string,
    preferredLineId?: string
  ): { voiceAssetId: string; lineAssetId: string } {
    const lineAsset = preferredLineId ? aiAssets.assets[preferredLineId] : undefined;
    const activeVersionVoiceId = isVoiceLineAsset(lineAsset)
      ? lineAsset.versions[lineAsset.activeVersion]?.voiceSettings?.voiceAssetId
      : undefined;
    const voiceAssetId = preferredVoiceId
      ?? activeVersionVoiceId
      ?? lineAsset?.voiceSettings?.voiceAssetId
      ?? firstVoiceLinePair()?.voiceAssetId;
    if (!voiceAssetId || !isVoiceAsset(aiAssets.assets[voiceAssetId])) {
      throw new Error("Add an AI voice before adding dialog lines.");
    }
    const compatible = voiceLineAssetIds(aiAssets, voiceAssetId);
    const lineAssetId = preferredLineId && compatible.includes(preferredLineId)
      ? preferredLineId
      : compatible[0];
    if (!lineAssetId) {
      throw new Error(`Voice “${readableAssetName(voiceAssetId)}” has no existing lines.`);
    }
    return { voiceAssetId, lineAssetId };
  }

  function decisionName(nodeId: string): string {
    return selectedDialog()?.nodes[nodeId]?.name ?? nodeId;
  }

  function applyOpenState(isOpen: boolean): void {
    elements.root.dataset.open = String(isOpen);
    elements.toggle.setAttribute("aria-expanded", String(isOpen));
    options.onOpenChange?.(isOpen);
  }

  function emitManifestChange(): void {
    options.onManifestChange?.(cloneDialogManifest(manifest));
  }

  function emitSelectionChange(): void {
    options.onSelectionChange?.(selection ? structuredClone(selection) : undefined);
  }

  function emitDialogChange(): void {
    const dialog = selectedDialog();
    if (dialog) options.onDialogChange?.(dialog.id, structuredClone(dialog));
  }

  function setStatus(message: string, tone: StatusTone): void {
    elements.status.textContent = message;
    elements.status.dataset.tone = tone;
  }

  function perform(action: () => void): void {
    try {
      action();
    } catch (error) {
      render();
      setStatus(errorMessage(error), "error");
    }
  }

  function onKeyDown(event: KeyboardEvent): void {
    if (!api.isOpen() || isEditableElement(event.target)) return;
    if (!(event.metaKey || event.ctrlKey)) return;
    const key = event.key.toLowerCase();
    if (key === "z" && !event.shiftKey) {
      event.preventDefault();
      api.undo();
    } else if (key === "y" || (key === "z" && event.shiftKey)) {
      event.preventDefault();
      api.redo();
    }
  }
}

function attachNode(dialog: DialogDefinition, parent: DialogNodeParent, nodeId: string): void {
  if (parent.type === "entry") {
    if (parent.dialogId !== dialog.id) throw new Error("Entry branch belongs to another dialog.");
    if (dialog.entryNodeId) throw new Error("Dialog already has an opening node.");
    dialog.entryNodeId = nodeId;
    return;
  }
  const node = dialog.nodes[parent.nodeId];
  if (!node) throw new Error(`Unknown parent node “${parent.nodeId}”.`);
  if (parent.type === "block-next") {
    if (node.type !== "block") throw new Error("The selected parent is not a block.");
    if (node.nextNodeId) throw new Error("Block continuation already has a node.");
    node.nextNodeId = nodeId;
    return;
  }
  if (node.type !== "decision") throw new Error("The selected parent is not a decision.");
  if (parent.type === "decision-next") {
    if (node.nextNodeId) throw new Error("Decision fallback already has a node.");
    node.nextNodeId = nodeId;
    return;
  }
  const option = node.options.find((candidate) => candidate.id === parent.optionId);
  if (!option) throw new Error(`Unknown option “${parent.optionId}”.`);
  if (option.nextNodeId) throw new Error("Option branch already has a node.");
  option.nextNodeId = nodeId;
}

function removeNodeSubtree(dialog: DialogDefinition, nodeId: string): void {
  const parent = findDialogNodeParent(dialog, nodeId);
  if (!parent) throw new Error(`Dialog node “${nodeId}” has no parent.`);
  if (parent.type === "entry") {
    dialog.entryNodeId = undefined;
  } else {
    const parentNode = dialog.nodes[parent.nodeId];
    if (!parentNode) throw new Error(`Unknown parent node “${parent.nodeId}”.`);
    if (parent.type === "block-next") {
      if (parentNode.type !== "block") throw new Error("Invalid block continuation parent.");
      parentNode.nextNodeId = undefined;
    } else if (parent.type === "decision-next") {
      if (parentNode.type !== "decision") throw new Error("Invalid decision fallback parent.");
      parentNode.nextNodeId = undefined;
    } else {
      if (parentNode.type !== "decision") throw new Error("Invalid decision option parent.");
      const option = parentNode.options.find((candidate) => candidate.id === parent.optionId);
      if (!option) throw new Error(`Unknown parent option “${parent.optionId}”.`);
      option.nextNodeId = undefined;
    }
  }
  deleteSubtree(dialog, nodeId);
}

function deleteSubtree(dialog: DialogDefinition, rootNodeId: string): void {
  const pending = [rootNodeId];
  const visited = new Set<string>();
  while (pending.length > 0) {
    const nodeId = pending.pop()!;
    if (visited.has(nodeId)) continue;
    visited.add(nodeId);
    const node = dialog.nodes[nodeId];
    if (!node) continue;
    pending.push(...dialogNodeChildIds(node));
  }
  for (const nodeId of visited) delete dialog.nodes[nodeId];
}

function findBlock(
  manifest: DialogDesignerManifest,
  dialogId: string,
  blockId: string
): DialogBlock {
  const node = getDialogNode(manifest, dialogId, blockId);
  if (node.type !== "block") throw new Error(`Dialog node “${blockId}” is not a block.`);
  return node;
}

function findDecision(
  manifest: DialogDesignerManifest,
  dialogId: string,
  decisionId: string
): DialogDecision {
  const node = getDialogNode(manifest, dialogId, decisionId);
  if (node.type !== "decision") throw new Error(`Dialog node “${decisionId}” is not a decision.`);
  return node;
}

function findLine(
  manifest: DialogDesignerManifest,
  dialogId: string,
  blockId: string,
  lineId: string
): DialogLine {
  const line = findBlock(manifest, dialogId, blockId).lines
    .find((candidate) => candidate.id === lineId);
  if (!line) throw new Error(`Unknown dialog line “${lineId}”.`);
  return line;
}

function findOption(
  manifest: DialogDesignerManifest,
  dialogId: string,
  decisionId: string,
  optionId: string
): DialogOption {
  const option = findDecision(manifest, dialogId, decisionId).options
    .find((candidate) => candidate.id === optionId);
  if (!option) throw new Error(`Unknown dialog option “${optionId}”.`);
  return option;
}

function trimHistory(history: DialogDesignerManifest[]): void {
  if (history.length > MAX_HISTORY_ENTRIES) {
    history.splice(0, history.length - MAX_HISTORY_ENTRIES);
  }
}

function requireText(value: string, label: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(`${label} cannot be empty.`);
  return trimmed;
}

function button(label: string, className = "dialog-designer__button"): HTMLButtonElement {
  const element = document.createElement("button");
  element.type = "button";
  element.className = className;
  element.textContent = label;
  return element;
}

function iconButton(label: string, title: string, danger = false): HTMLButtonElement {
  const element = button(
    label,
    `dialog-designer__icon-button${danger ? " dialog-designer__icon-button--danger" : ""}`
  );
  element.title = title;
  element.setAttribute("aria-label", title);
  return element;
}

function textInput(value: string): HTMLInputElement {
  const element = document.createElement("input");
  element.type = "text";
  element.className = "dialog-designer__input";
  element.value = value;
  return element;
}

function textarea(value: string): HTMLTextAreaElement {
  const element = document.createElement("textarea");
  element.className = "dialog-designer__textarea";
  element.value = value;
  return element;
}

function field(label: string, control: HTMLElement): HTMLLabelElement {
  const wrapper = document.createElement("label");
  wrapper.className = "dialog-designer__field";
  const text = document.createElement("span");
  text.textContent = label;
  wrapper.append(text, control);
  return wrapper;
}

function check(label: string, checked: boolean): {
  label: HTMLLabelElement;
  input: HTMLInputElement;
} {
  const wrapper = document.createElement("label");
  wrapper.className = "dialog-designer__check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  const text = document.createElement("span");
  text.textContent = label;
  wrapper.append(input, text);
  return { label: wrapper, input };
}

function sectionBreak(label: string): HTMLDivElement {
  const element = document.createElement("div");
  element.className = "dialog-designer__subhead";
  const text = document.createElement("span");
  text.textContent = label;
  element.append(text);
  return element;
}

function emptyMessage(message: string): HTMLDivElement {
  const element = document.createElement("div");
  element.className = "dialog-designer__empty";
  element.textContent = message;
  return element;
}

function stop(listener: () => void): (event: Event) => void {
  return (event) => {
    event.stopPropagation();
    listener();
  };
}

function isEditableElement(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && (
    target.isContentEditable
    || target.tagName === "INPUT"
    || target.tagName === "SELECT"
    || target.tagName === "TEXTAREA"
  );
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest("button, input, select, textarea, label, summary"));
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
