import type {
  AiAssetDefinition,
  AiAssetManifest,
  AiAssetVersion,
  AiAudioPlaybackSettings
} from "@ai-game-assets/core";

export type DialogDesignerManifest = {
  schemaVersion: 1;
  dialogs: Record<string, DialogDefinition>;
  dialogPaths?: Record<string, string[]>;
};

export type DialogDefinition = {
  id: string;
  name: string;
  entryNodeId?: string;
  nodes: Record<string, DialogNode>;
  enabled: boolean;
  tags?: string[];
  metadata?: DialogMetadata;
};

export type DialogNode = DialogBlock | DialogDecision;

export type DialogBlock = {
  id: string;
  type: "block";
  name: string;
  enabled: boolean;
  lines: DialogLine[];
  nextNodeId?: string;
  tags?: string[];
  metadata?: DialogMetadata;
};

export type DialogLine = {
  id: string;
  enabled: boolean;
  voiceAssetId: string;
  lineAssetId: string;
  tags?: string[];
  metadata?: DialogMetadata;
};

export type DialogDecision = {
  id: string;
  type: "decision";
  name: string;
  prompt: string;
  enabled: boolean;
  options: DialogOption[];
  /** Continuation used when the decision is disabled, has no enabled options, or an option has no branch. */
  nextNodeId?: string;
  tags?: string[];
  metadata?: DialogMetadata;
};

export type DialogOption = {
  id: string;
  text: string;
  enabled: boolean;
  nextNodeId?: string;
  tags?: string[];
  metadata?: DialogMetadata;
};

export type DialogMetadata = Record<string, unknown>;

export type DialogSelection =
  | { type: "dialog"; dialogId: string }
  | { type: "node"; dialogId: string; nodeId: string }
  | { type: "line"; dialogId: string; nodeId: string; lineId: string }
  | { type: "option"; dialogId: string; nodeId: string; optionId: string };

export type DialogElementTarget =
  | { type: "dialog"; dialogId: string }
  | { type: "node"; dialogId: string; nodeId: string }
  | { type: "line"; dialogId: string; nodeId: string; lineId: string }
  | { type: "option"; dialogId: string; nodeId: string; optionId: string };

export type DialogNodeParent =
  | { type: "entry"; dialogId: string }
  | { type: "block-next"; nodeId: string }
  | { type: "decision-next"; nodeId: string }
  | { type: "option"; nodeId: string; optionId: string };

export type ResolvedDialogLine = {
  dialogId: string;
  blockId: string;
  line: DialogLine;
  voiceAsset: AiAssetDefinition;
  lineAsset: AiAssetDefinition;
  text: string;
  direction?: string;
  audio?: {
    file: string;
    versionName: string;
    version: AiAssetVersion;
    playback?: AiAudioPlaybackSettings;
  };
};

export type DialogLineTurn = {
  type: "line";
  dialogId: string;
  nodeId: string;
  block: DialogBlock;
  lineIndex: number;
  line: DialogLine;
  resolved: ResolvedDialogLine;
};

export type DialogDecisionTurn = {
  type: "decision";
  dialogId: string;
  nodeId: string;
  decision: DialogDecision;
  options: DialogOption[];
};

export type DialogEndTurn = {
  type: "end";
  dialogId: string;
  reason: DialogEndReason;
};

export type DialogTurn = DialogLineTurn | DialogDecisionTurn | DialogEndTurn;

export type DialogEndReason = "completed" | "stopped" | "disabled";

export type DialogRuntimeSnapshot = {
  dialogId?: string;
  status: "idle" | "running" | "ended";
  turn?: DialogTurn;
};

export type DialogRuntimeEventMap = {
  "dialog:start": { dialog: DialogDefinition };
  "dialog:end": DialogEndTurn;
  "node:enter": { dialogId: string; node: DialogNode };
  "node:skip": { dialogId: string; node: DialogNode; reason: "disabled" | "empty" };
  "line:ready": DialogLineTurn;
  "line:said": DialogLineTurn;
  "decision:ready": DialogDecisionTurn;
  "option:selected": {
    dialogId: string;
    nodeId: string;
    decision: DialogDecision;
    option: DialogOption;
  };
  "enabled:change": { target: DialogElementTarget; enabled: boolean };
};

export type DialogRuntimeListener<K extends keyof DialogRuntimeEventMap> = (
  event: DialogRuntimeEventMap[K]
) => void;

export type DialogRuntimeOptions = {
  /** AI Assets target whose voice and voice-line variants should be resolved. */
  targetId?: string;
  /** Called before manifest and runtime enabled state are considered. */
  isEnabled?(target: DialogElementTarget): boolean | undefined;
};

export type ResolveDialogLineOptions = {
  targetId?: string;
};

export type DialogRuntimeSource = {
  dialogs: DialogDesignerManifest;
  aiAssets: AiAssetManifest;
};
