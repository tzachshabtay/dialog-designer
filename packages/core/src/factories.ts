import type {
  DialogBlock,
  DialogDecision,
  DialogDefinition,
  DialogLine,
  DialogOption
} from "./types.js";

export type CreateDialogInput = Partial<Omit<DialogDefinition, "id" | "nodes">> & {
  id?: string;
  nodes?: Record<string, DialogBlock | DialogDecision>;
  withRoot?: boolean;
};

export type CreateDialogBlockInput = Partial<Omit<DialogBlock, "id" | "type" | "lines">> & {
  id?: string;
  lines?: DialogLine[];
};

export type CreateDialogDecisionInput = Partial<Omit<DialogDecision, "id" | "type" | "options">> & {
  id?: string;
  options?: DialogOption[];
};

export type CreateDialogLineInput = Partial<Omit<DialogLine, "id">> & {
  id?: string;
  voiceAssetId: string;
  lineAssetId: string;
};

export type CreateDialogOptionInput = Partial<Omit<DialogOption, "id">> & {
  id?: string;
};

export function createDialog(input: CreateDialogInput = {}): DialogDefinition {
  const nodes = input.nodes
    ? Object.fromEntries(Object.entries(input.nodes).map(([id, node]) => [id, structuredClone(node)]))
    : {};
  let entryNodeId = input.entryNodeId;

  if ((input.withRoot ?? true) && Object.keys(nodes).length === 0) {
    const root = createDialogBlock({ name: "Opening" });
    nodes[root.id] = root;
    entryNodeId = root.id;
  }

  return {
    id: input.id ?? uniqueDialogId("dialog"),
    name: input.name ?? "New Dialog",
    enabled: input.enabled ?? true,
    entryNodeId,
    nodes,
    tags: input.tags ? [...input.tags] : undefined,
    metadata: input.metadata ? structuredClone(input.metadata) : undefined
  };
}

export function createDialogBlock(input: CreateDialogBlockInput = {}): DialogBlock {
  return {
    id: input.id ?? uniqueDialogId("block"),
    type: "block",
    name: input.name ?? "Dialog block",
    enabled: input.enabled ?? true,
    lines: input.lines?.map((line) => structuredClone(line)) ?? [],
    nextNodeId: input.nextNodeId,
    tags: input.tags ? [...input.tags] : undefined,
    metadata: input.metadata ? structuredClone(input.metadata) : undefined
  };
}

export function createDialogDecision(input: CreateDialogDecisionInput = {}): DialogDecision {
  return {
    id: input.id ?? uniqueDialogId("decision"),
    type: "decision",
    name: input.name ?? "Decision",
    prompt: input.prompt ?? "What do you say?",
    enabled: input.enabled ?? true,
    options: input.options?.map((option) => structuredClone(option)) ?? [],
    nextNodeId: input.nextNodeId,
    tags: input.tags ? [...input.tags] : undefined,
    metadata: input.metadata ? structuredClone(input.metadata) : undefined
  };
}

export function createDialogLine(input: CreateDialogLineInput): DialogLine {
  return {
    id: input.id ?? uniqueDialogId("line"),
    enabled: input.enabled ?? true,
    voiceAssetId: input.voiceAssetId,
    lineAssetId: input.lineAssetId,
    tags: input.tags ? [...input.tags] : undefined,
    metadata: input.metadata ? structuredClone(input.metadata) : undefined
  };
}

export function createDialogOption(input: CreateDialogOptionInput = {}): DialogOption {
  return {
    id: input.id ?? uniqueDialogId("option"),
    text: input.text ?? "New option",
    enabled: input.enabled ?? true,
    nextNodeId: input.nextNodeId,
    tags: input.tags ? [...input.tags] : undefined,
    metadata: input.metadata ? structuredClone(input.metadata) : undefined
  };
}

export function uniqueDialogId(prefix: string): string {
  const entropy = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${entropy}`;
}
