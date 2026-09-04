import type { AiAssetManifest } from "@ai-game-assets/core";
import {
  AiAssetDebugClient,
  AiAssetRuntime,
  installAiAssetDesigner,
  loadAiAudioAsset,
  loadAiAssetSet,
  type AiAssetAnimationPlayback,
  type AiAssetDesigner
} from "@ai-game-assets/phaser";
import type {
  DialogDecisionTurn,
  DialogDesignerManifest,
  DialogElementTarget,
  DialogLineTurn,
  DialogTurn
} from "@dialog-designer/core";
import {
  dialogAudioKey,
  DialogDesignerDebugClient,
  installPhaserDialogDesigner,
  loadDialogAudioAssets,
  PhaserDialogRuntime,
  type InstalledPhaserDialogDesigner
} from "@dialog-designer/phaser";
import Phaser from "phaser";

const graphicAssetIds = [
  "background.library",
  "character.ada",
  "character.bram",
  "character.lucien"
];

const noirMusicAssetId = "audio.music.noir";
const musicDuckRatio = 0.42;

const palette = {
  ink: 0x080c13,
  panel: 0x111925,
  panelBright: 0x1b2938,
  gold: 0xe5bb6b,
  cream: 0xf4ead7,
  muted: 0x9dafbd,
  teal: 0x67d7c3,
  red: 0xd26b72,
  disabled: 0x3c4652
};

type DetectiveSceneOptions = {
  aiAssets: AiAssetManifest;
  aiAssetDebugClient?: AiAssetDebugClient;
  assetBaseUrl?: string;
  dialogs: DialogDesignerManifest;
  dialogDebugClient?: DialogDesignerDebugClient;
};

type SuspectId = "ada" | "bram" | "lucien";
type SuspectAnimationState = "idle" | "speaking";

type SuspectView = {
  id: SuspectId;
  dialogId: string;
  assetId: string;
  image: Phaser.GameObjects.Sprite;
  baseScaleX: number;
  baseScaleY: number;
  animationState: SuspectAnimationState;
  animationPlayback?: AiAssetAnimationPlayback;
  glow: Phaser.GameObjects.Ellipse;
  label: Phaser.GameObjects.Text;
};

type EvidenceSeal = {
  card: Phaser.GameObjects.Rectangle;
  icon: Phaser.GameObjects.Text;
  title: Phaser.GameObjects.Text;
  detail: Phaser.GameObjects.Text;
};

const suspectDefinitions: Array<{
  id: SuspectId;
  dialogId: string;
  assetId: string;
  name: string;
  role: string;
  x: number;
  accent: number;
}> = [
  {
    id: "ada",
    dialogId: "dialog.ada",
    assetId: "character.ada",
    name: "ADA MERCER",
    role: "THE PIANIST",
    x: 223,
    accent: 0xc76676
  },
  {
    id: "bram",
    dialogId: "dialog.bram",
    assetId: "character.bram",
    name: "BRAM HOLT",
    role: "THE ELECTRICIAN",
    x: 480,
    accent: 0x72a69d
  },
  {
    id: "lucien",
    dialogId: "dialog.lucien",
    assetId: "character.lucien",
    name: "DR. LUCIEN VALE",
    role: "THE HISTORIAN",
    x: 737,
    accent: 0x708fc0
  }
];

const speakerNames: Record<string, string> = {
  "voice.detective": "DETECTIVE",
  "voice.ada": "ADA MERCER",
  "voice.bram": "BRAM HOLT",
  "voice.lucien": "DR. LUCIEN VALE"
};

const speakerColors: Record<string, string> = {
  "voice.detective": "#e5bb6b",
  "voice.ada": "#ee9caa",
  "voice.bram": "#89c9bc",
  "voice.lucien": "#9ebce8"
};

const suspectByVoice: Record<string, SuspectId> = {
  "voice.ada": "ada",
  "voice.bram": "bram",
  "voice.lucien": "lucien"
};

export class DetectiveScene extends Phaser.Scene {
  private aiAssets: AiAssetManifest;
  private dialogs: DialogDesignerManifest;
  private readonly aiAssetDebugClient?: AiAssetDebugClient;
  private readonly dialogDebugClient?: DialogDesignerDebugClient;
  private readonly assetBaseUrl?: string;
  private aiRuntime!: AiAssetRuntime;
  private runtime!: PhaserDialogRuntime;
  private assetDesigner?: AiAssetDesigner;
  private dialogDesigner?: InstalledPhaserDialogDesigner;
  private readonly facts = new Set<string>();
  private readonly consumed = new Set<string>();
  private readonly suspects = new Map<SuspectId, SuspectView>();
  private readonly evidence = new Map<"timeline" | "method" | "motive", EvidenceSeal>();
  private selectedSuspect?: SuspectId;
  private suspectInputLockedUntil = 0;
  private wrongAccusations = 0;
  private designerOpen = false;
  private modalShade!: Phaser.GameObjects.Rectangle;
  private panel!: Phaser.GameObjects.Graphics;
  private speakerText!: Phaser.GameObjects.Text;
  private lineText!: Phaser.GameObjects.Text;
  private directionText!: Phaser.GameObjects.Text;
  private promptText!: Phaser.GameObjects.Text;
  private advanceHint!: Phaser.GameObjects.Text;
  private advanceZone!: Phaser.GameObjects.Rectangle;
  private statusText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;
  private choiceButtons: Phaser.GameObjects.Container[] = [];
  private activeVoice?: Phaser.Sound.BaseSound;
  private readonly voiceSounds = new Set<Phaser.Sound.BaseSound>();
  private backgroundMusic?: Phaser.Sound.BaseSound;
  private backgroundMusicVolume = 0.18;
  private caseStarted = false;
  private caseStartPending = false;
  private shuttingDown = false;
  private caseStartUnlockHandler?: () => void;
  private landingScreen?: Phaser.GameObjects.Container;
  private landingButton?: Phaser.GameObjects.Rectangle;
  private landingButtonText?: Phaser.GameObjects.Text;
  private landingStatus?: Phaser.GameObjects.Text;
  private toast!: Phaser.GameObjects.Text;
  private toastTimer?: Phaser.Time.TimerEvent;
  private ledgerCard?: Phaser.GameObjects.Container;

  constructor(options: DetectiveSceneOptions) {
    super("detective");
    this.aiAssets = options.aiAssets;
    this.dialogs = options.dialogs;
    this.aiAssetDebugClient = options.aiAssetDebugClient;
    this.dialogDebugClient = options.dialogDebugClient;
    this.assetBaseUrl = options.assetBaseUrl;
  }

  preload(): void {
    loadAiAssetSet(
      this,
      this.aiAssets,
      graphicAssetIds,
      this.assetBaseUrl ? { baseUrl: this.assetBaseUrl } : {}
    );
    loadDialogAudioAssets(
      this,
      this.dialogs,
      this.aiAssets,
      this.assetBaseUrl ? { baseUrl: this.assetBaseUrl } : {}
    );
    loadAiAudioAsset(
      this,
      this.aiAssets,
      noirMusicAssetId,
      this.assetBaseUrl ? { baseUrl: this.assetBaseUrl } : {}
    );
  }

  create(): void {
    this.aiRuntime = new AiAssetRuntime(
      this,
      this.aiAssets,
      this.assetBaseUrl ? { baseUrl: this.assetBaseUrl } : {}
    );
    this.runtime = new PhaserDialogRuntime(this, this.dialogs, this.aiAssets, {
      eventPrefix: "detective-dialog"
    });

    this.createRoom();
    this.createHeader();
    this.createSuspects();
    this.createDialogOverlay();
    this.bindRuntime();
    this.installDesigners();
    this.syncEnablement();
    this.updateEvidence();
    this.showCaseLanding();

    this.input.keyboard?.on("keydown-SPACE", this.advanceCurrentLine, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.shuttingDown = true;
      this.input.keyboard?.off("keydown-SPACE", this.advanceCurrentLine, this);
      if (this.caseStartUnlockHandler) {
        this.sound.off(Phaser.Sound.Events.UNLOCKED, this.caseStartUnlockHandler);
        this.caseStartUnlockHandler = undefined;
      }
      this.stopVoiceLines();
      this.destroySuspectAnimations();
      this.stopBackgroundMusic();
      this.toastTimer?.destroy();
      this.assetDesigner?.destroy();
      this.dialogDesigner?.destroy();
    });
  }

  private createRoom(): void {
    const background = this.add.image(480, 320, this.aiRuntime.key("background.library"));
    background.setDisplaySize(960, 640).setDepth(0);
    this.aiRuntime.bindTexture(background, "background.library", { setInitialTexture: false });
    this.add.rectangle(480, 320, 960, 640, 0x05070a, 0.1).setDepth(1);
    const vignette = this.add.graphics().setDepth(2);
    vignette.fillStyle(0x020307, 0.38);
    vignette.fillRect(0, 0, 960, 22);
    vignette.fillRect(0, 618, 960, 22);
    vignette.fillRect(0, 0, 22, 640);
    vignette.fillRect(938, 0, 22, 640);
  }

  private createHeader(): void {
    this.add.text(28, 22, "THE SILENT LEDGER", {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "26px",
      fontStyle: "bold",
      color: "#f0d18d",
      stroke: "#080c13",
      strokeThickness: 5,
      letterSpacing: 2
    }).setDepth(20);
    this.add.text(30, 55, "BLACKWOOD HOUSE · 9:07 PM · THE LIBRARY REMAINED LOCKED", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "11px",
      color: "#aab9c5",
      stroke: "#080c13",
      strokeThickness: 3,
      letterSpacing: 1
    }).setDepth(20);

    this.evidence.set("timeline", this.createEvidenceSeal(575, "I", "TIMELINE", "Silent clock"));
    this.evidence.set("method", this.createEvidenceSeal(705, "II", "METHOD", "Lamp + key"));
    this.evidence.set("motive", this.createEvidenceSeal(835, "III", "MOTIVE", "Watermark"));

    this.instructionText = this.add.text(480, 105, "Click a suspect to begin questioning", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "14px",
      color: "#e8dec7",
      backgroundColor: "#101821cc",
      padding: { x: 13, y: 7 }
    }).setOrigin(0.5).setDepth(20);
    this.statusText = this.add.text(30, 596, "CASE NOTES · No proof established", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "12px",
      color: "#aab9c5",
      stroke: "#080c13",
      strokeThickness: 3,
      letterSpacing: 0.5
    }).setDepth(20);
    this.toast = this.add.text(480, 127, "", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "14px",
      fontStyle: "bold",
      color: "#07100f",
      backgroundColor: "#67d7c3",
      padding: { x: 14, y: 8 },
      align: "center"
    }).setOrigin(0.5, 0).setDepth(80).setAlpha(0);
  }

  private createEvidenceSeal(
    x: number,
    numeral: string,
    title: string,
    detail: string
  ): EvidenceSeal {
    const card = this.add.rectangle(x, 50, 118, 62, palette.panel, 0.92)
      .setStrokeStyle(2, palette.disabled, 0.9)
      .setDepth(20);
    const icon = this.add.text(x - 45, 34, numeral, {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "16px",
      fontStyle: "bold",
      color: "#687482"
    }).setOrigin(0.5).setDepth(21);
    const titleText = this.add.text(x - 24, 28, title, {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "11px",
      fontStyle: "bold",
      color: "#7d8997",
      letterSpacing: 1
    }).setDepth(21);
    const detailText = this.add.text(x - 24, 47, detail, {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "10px",
      color: "#65717e"
    }).setDepth(21);
    return { card, icon, title: titleText, detail: detailText };
  }

  private createSuspects(): void {
    const characterFloorY = 540;
    for (const definition of suspectDefinitions) {
      const glow = this.add.ellipse(
        definition.x,
        characterFloorY,
        178,
        38,
        definition.accent,
        0.15
      )
        .setDepth(3);
      const image = this.add.sprite(
        definition.x,
        548,
        this.aiRuntime.key(definition.assetId)
      ).setOrigin(0.5, 1).setDisplaySize(162, 288).setDepth(6);
      this.aiRuntime.bindTexture(image, definition.assetId, { setInitialTexture: false });
      image.setInteractive({ useHandCursor: true });

      const label = this.add.text(definition.x, 541, `${definition.name}\n${definition.role}`, {
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        fontSize: "12px",
        fontStyle: "bold",
        align: "center",
        color: "#f6ead7",
        backgroundColor: "#0b111be8",
        padding: { x: 12, y: 7 },
        lineSpacing: 4
      }).setOrigin(0.5, 0).setDepth(8);

      const view: SuspectView = {
        id: definition.id,
        dialogId: definition.dialogId,
        assetId: definition.assetId,
        image,
        baseScaleX: image.scaleX,
        baseScaleY: image.scaleY,
        animationState: "idle",
        glow,
        label
      };
      this.suspects.set(definition.id, view);
      this.playSuspectAnimation(view, "idle", true);

      image.on("pointerover", () => {
        if (
          !this.has("case.intro_complete")
          || this.dialogIsActive()
          || this.designerOpen
          || this.has("case.solved")
        ) return;
        image.setScale(view.baseScaleX * 1.035, view.baseScaleY * 1.035);
        glow.setAlpha(0.48).setScale(1.08);
        label.setColor("#ffe1a1");
      });
      image.on("pointerout", () => {
        image.setScale(view.baseScaleX, view.baseScaleY);
        glow.setAlpha(this.selectedSuspect === definition.id ? 0.55 : 0.15).setScale(1);
        label.setColor("#f6ead7");
      });
      image.on("pointerdown", () => this.startInterview(definition.id));
    }
  }

  private playSuspectAnimation(
    suspect: SuspectView,
    state: SuspectAnimationState,
    forceRestart = false
  ): void {
    if (!forceRestart && suspect.animationState === state && suspect.animationPlayback) return;

    suspect.animationPlayback?.destroy();
    suspect.image.stop();
    suspect.image.setDisplaySize(162, 288).setOrigin(0.5, 1).setRotation(0);
    suspect.animationState = state;
    suspect.animationPlayback = this.aiRuntime.playAnimation(
      suspect.image,
      suspect.assetId,
      state,
      {
        forceRestart,
        frameTransform: {
          eventName: Phaser.Animations.Events.ANIMATION_UPDATE,
          originX: 0.5,
          originY: 1
        },
        frameTransformSize: { width: 162, height: 288 }
      }
    );
  }

  private setSpeakingSuspect(suspectId: SuspectId | undefined): void {
    for (const suspect of this.suspects.values()) {
      this.playSuspectAnimation(
        suspect,
        suspect.id === suspectId ? "speaking" : "idle"
      );
    }
  }

  private refreshSuspectAnimationAsset(assetId: string): void {
    for (const suspect of this.suspects.values()) {
      const baseAsset = this.aiAssets.assets[suspect.assetId];
      const linkedAssetIds = Object.values(baseAsset?.linkedAnimationAssets ?? {})
        .map((animation) => animation.assetId);
      if (assetId === suspect.assetId || linkedAssetIds.includes(assetId)) {
        this.playSuspectAnimation(suspect, suspect.animationState, true);
      }
    }
  }

  private refreshAllSuspectAnimations(): void {
    for (const suspect of this.suspects.values()) {
      this.playSuspectAnimation(suspect, suspect.animationState, true);
    }
  }

  private destroySuspectAnimations(): void {
    for (const suspect of this.suspects.values()) {
      suspect.animationPlayback?.destroy();
      suspect.animationPlayback = undefined;
      suspect.image.stop();
    }
  }

  private createDialogOverlay(): void {
    this.modalShade = this.add.rectangle(480, 320, 960, 640, palette.ink, 0.48)
      .setDepth(40)
      .setVisible(false);
    this.panel = this.add.graphics().setDepth(42).setVisible(false);
    this.drawDialogPanel();

    this.speakerText = this.add.text(82, 360, "", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "15px",
      fontStyle: "bold",
      color: "#e5bb6b",
      letterSpacing: 1.5
    }).setDepth(44).setVisible(false);
    this.lineText = this.add.text(82, 397, "", {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "23px",
      color: "#f5eddf",
      lineSpacing: 8,
      wordWrap: { width: 796, useAdvancedWrap: true }
    }).setDepth(44).setVisible(false);
    this.directionText = this.add.text(82, 545, "", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "11px",
      fontStyle: "italic",
      color: "#8294a3",
      wordWrap: { width: 690 }
    }).setDepth(44).setVisible(false);
    this.promptText = this.add.text(82, 392, "", {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "20px",
      fontStyle: "bold",
      color: "#f4ead7"
    }).setDepth(44).setVisible(false);
    this.advanceHint = this.add.text(878, 589, "CLICK OR SPACE  ›", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "11px",
      fontStyle: "bold",
      color: "#d4af67",
      letterSpacing: 1
    }).setOrigin(1, 0.5).setDepth(44).setVisible(false);
    this.advanceZone = this.add.rectangle(480, 477, 850, 286, 0xffffff, 0.001)
      .setDepth(45)
      .setVisible(false);
    this.advanceZone.on("pointerdown", this.advanceCurrentLine, this);
  }

  private drawDialogPanel(): void {
    this.panel.clear();
    this.panel.fillStyle(palette.ink, 0.92);
    this.panel.fillRoundedRect(52, 332, 856, 294, 14);
    this.panel.fillStyle(palette.panel, 0.98);
    this.panel.fillRoundedRect(58, 338, 844, 282, 10);
    this.panel.lineStyle(2, palette.gold, 0.72);
    this.panel.strokeRoundedRect(58, 338, 844, 282, 10);
    this.panel.lineStyle(1, 0xffffff, 0.08);
    this.panel.lineBetween(78, 383, 882, 383);
  }

  private bindRuntime(): void {
    this.runtime.on("line:ready", (turn) => this.showLine(turn));
    this.runtime.on("decision:ready", (turn) => this.showDecision(turn));
    this.runtime.on("line:said", (turn) => this.handleLineSaid(turn));
    this.runtime.on("option:selected", ({ option }) => this.handleOptionSelected(option.id));
    this.runtime.on("dialog:end", ({ dialogId }) => this.handleDialogEnd(dialogId));
  }

  private installDesigners(): void {
    if (this.aiAssetDebugClient) {
      const callbacks = this.aiRuntime.designerCallbacks();
      this.assetDesigner = installAiAssetDesigner({
        scene: this,
        manifest: this.aiAssets,
        client: this.aiAssetDebugClient,
        title: "Assets",
        restartOnPromote: false,
        onPreview: (assetId, textureKey, asset) => {
          callbacks.onPreview(assetId, textureKey, asset);
          this.refreshSuspectAnimationAsset(assetId);
        },
        onTilesetAnimationPreview: callbacks.onTilesetAnimationPreview,
        onAssetReady: (assetId, textureKey, asset) => {
          callbacks.onAssetReady(assetId, textureKey, asset);
          this.refreshSuspectAnimationAsset(assetId);
        },
        onManifestUpdated: (manifest) => {
          callbacks.onManifestUpdated(manifest);
          this.adoptAiAssetManifest(manifest);
          this.dialogDesigner?.designer.setAiAssets(this.aiAssets);
          this.refreshAllSuspectAnimations();
        }
      });
    }

    this.dialogDesigner = installPhaserDialogDesigner({
      scene: this,
      manifest: this.dialogs,
      aiAssets: this.aiAssets,
      client: this.dialogDebugClient,
      title: "Dialogs",
      defaultDialogId: "dialog.intro",
      onOpenChange: (isOpen) => {
        this.designerOpen = isOpen;
        if (isOpen) {
          this.instructionText.setText("Dialog Designer active · game input paused");
        } else {
          this.instructionText.setText(
            !this.caseStarted
              ? "Begin the investigation to hear the case briefing"
              : !this.has("case.intro_complete")
              ? "The facts of the case · click or press Space to continue"
              : this.dialogIsActive()
              ? "Follow the contradictions. Every subject changes what the others can say."
              : "Click a suspect to continue questioning"
          );
        }
      },
      onManifestChange: (manifest) => {
        this.dialogs = manifest;
        this.runtime.setManifest(manifest);
        this.syncEnablement();
      },
      onAiAssetsChange: (manifest) => this.mergeAiAssetManifest(manifest)
    });
  }

  private adoptAiAssetManifest(manifest: AiAssetManifest): void {
    this.aiAssets = manifest;
    this.runtime.setAiAssets(manifest);
  }

  private mergeAiAssetManifest(manifest: AiAssetManifest): void {
    const stableManifest = this.aiAssets as unknown as Record<string, unknown>;
    for (const key of Object.keys(stableManifest)) delete stableManifest[key];
    Object.assign(stableManifest, structuredClone(manifest));
    this.aiRuntime.syncManifest(this.aiAssets);
    this.runtime.setAiAssets(this.aiAssets);
  }

  private showCaseLanding(): void {
    const shade = this.add.rectangle(480, 320, 960, 640, 0x05080d, 0.94)
      .setInteractive();
    const frame = this.add.rectangle(480, 320, 724, 458, 0x0d151f, 0.98)
      .setStrokeStyle(2, palette.gold, 0.75);
    const innerFrame = this.add.rectangle(480, 320, 702, 436, 0x111925, 0.78)
      .setStrokeStyle(1, 0xffffff, 0.08);
    const eyebrow = this.add.text(480, 151, "BLACKWOOD HOUSE · A DIALOG DESIGNER MYSTERY", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "12px",
      fontStyle: "bold",
      color: "#9dafbd",
      letterSpacing: 2
    }).setOrigin(0.5);
    const title = this.add.text(480, 211, "THE SILENT LEDGER", {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "48px",
      fontStyle: "bold",
      color: "#f0d18d",
      stroke: "#080c13",
      strokeThickness: 6,
      letterSpacing: 3
    }).setOrigin(0.5);
    const divider = this.add.rectangle(480, 264, 330, 1, palette.gold, 0.65);
    const premise = this.add.text(
      480,
      316,
      "A locked library. A stolen ledger. Three suspects whose stories cannot all be true.\nListen carefully, follow the contradictions, and name the thief.",
      {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "20px",
        color: "#e9e0d0",
        align: "center",
        lineSpacing: 9,
        wordWrap: { width: 610, useAdvancedWrap: true }
      }
    ).setOrigin(0.5);

    const button = this.add.rectangle(480, 421, 326, 54, 0x24374a, 1)
      .setStrokeStyle(2, palette.gold, 1)
      .setInteractive({ useHandCursor: true });
    const buttonText = this.add.text(480, 421, "BEGIN THE INVESTIGATION", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "14px",
      fontStyle: "bold",
      color: "#fff0c8",
      letterSpacing: 1.5
    }).setOrigin(0.5);
    const status = this.add.text(480, 467, "Click the button or press Space · audio begins after your gesture", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "11px",
      color: "#8294a3"
    }).setOrigin(0.5);

    button.on("pointerover", () => {
      if (!this.caseStartPending) button.setFillStyle(0x314b63, 1);
    });
    button.on("pointerout", () => {
      if (!this.caseStartPending) button.setFillStyle(0x24374a, 1);
    });
    button.on("pointerdown", () => this.requestCaseStart());

    this.landingButton = button;
    this.landingButtonText = buttonText;
    this.landingStatus = status;
    this.landingScreen = this.add.container(0, 0, [
      shade,
      frame,
      innerFrame,
      eyebrow,
      title,
      divider,
      premise,
      button,
      buttonText,
      status
    ]).setDepth(100).setAlpha(0);
    this.tweens.add({
      targets: this.landingScreen,
      alpha: 1,
      duration: 420,
      ease: "Sine.Out"
    });
    this.instructionText.setText("Begin the investigation to hear the case briefing");
  }

  private requestCaseStart(): void {
    if (this.caseStarted || this.caseStartPending || this.designerOpen || this.shuttingDown) return;
    this.caseStartPending = true;
    this.landingButton?.disableInteractive().setFillStyle(0x1b2938, 1);
    this.landingButtonText?.setText("OPENING THE CASE…");
    this.landingStatus?.setText("Unlocking audio and preparing the briefing");

    const start = () => this.completeCaseStart();
    const soundManager = this.sound;
    if (soundManager instanceof Phaser.Sound.WebAudioSoundManager) {
      void soundManager.context.resume().then(() => {
        if (soundManager.context.state !== "running") {
          throw new Error(`Audio context remained ${soundManager.context.state}.`);
        }
        start();
      }).catch((error) => this.handleCaseStartFailure(error));
      return;
    }

    if (this.sound.locked) {
      this.caseStartUnlockHandler = () => {
        this.caseStartUnlockHandler = undefined;
        start();
      };
      this.sound.once(Phaser.Sound.Events.UNLOCKED, this.caseStartUnlockHandler);
      return;
    }

    start();
  }

  private completeCaseStart(): void {
    if (this.caseStarted || this.shuttingDown) return;
    this.caseStartPending = false;
    this.caseStarted = true;
    this.startBackgroundMusic();
    this.startCaseIntro();

    const landing = this.landingScreen;
    this.landingScreen = undefined;
    this.landingButton = undefined;
    this.landingButtonText = undefined;
    this.landingStatus = undefined;
    if (!landing) return;
    this.tweens.add({
      targets: landing,
      alpha: 0,
      duration: 360,
      ease: "Sine.In",
      onComplete: () => landing.destroy(true)
    });
  }

  private handleCaseStartFailure(error: unknown): void {
    if (this.shuttingDown) return;
    this.caseStartPending = false;
    this.landingButton?.setInteractive({ useHandCursor: true }).setFillStyle(0x24374a, 1);
    this.landingButtonText?.setText("TRY AGAIN");
    this.landingStatus?.setText("Audio could not start · click to retry").setColor("#efb2b6");
    console.warn("Could not start the detective demo audio.", error);
  }

  private startCaseIntro(): void {
    this.selectedSuspect = undefined;
    this.setSuspectFocus(undefined);
    this.setDialogVisible(true);
    this.instructionText.setText("The facts of the case · click or press Space to continue");
    this.runtime.start("dialog.intro");
  }

  private startInterview(suspectId: SuspectId): void {
    if (
      !this.has("case.intro_complete")
      || this.dialogIsActive()
      || this.designerOpen
      || this.has("case.solved")
      || this.time.now < this.suspectInputLockedUntil
    ) return;
    const suspect = this.suspects.get(suspectId);
    if (!suspect) return;
    this.selectedSuspect = suspectId;
    this.syncEnablement();
    this.setSuspectFocus(suspectId);
    this.setDialogVisible(true);
    this.instructionText.setText("Follow the contradictions. Every subject changes what the others can say.");
    this.runtime.start(suspect.dialogId);
  }

  private showLine(turn: DialogLineTurn): void {
    this.destroyChoiceButtons();
    this.setDialogVisible(true);
    this.promptText.setVisible(false);
    this.lineText.setVisible(true).setText(turn.resolved.text);
    this.speakerText
      .setVisible(true)
      .setText(speakerNames[turn.line.voiceAssetId] ?? turn.line.voiceAssetId)
      .setColor(speakerColors[turn.line.voiceAssetId] ?? "#e5bb6b");
    this.directionText
      .setVisible(false)
      .setText("");
    this.advanceHint.setVisible(true);
    this.advanceZone.setVisible(true).setInteractive({ useHandCursor: true });
    this.playVoiceLine(turn);
    if (turn.line.id === "lucien.reveal.confession") this.showLedgerCard();
  }

  private showDecision(turn: DialogDecisionTurn): void {
    this.stopVoiceLines();
    this.destroyChoiceButtons();
    this.setDialogVisible(true);
    this.speakerText.setVisible(true).setText("DETECTIVE").setColor("#e5bb6b");
    this.lineText.setVisible(false);
    this.directionText.setVisible(false);
    this.advanceHint.setVisible(false);
    this.advanceZone.disableInteractive().setVisible(false);
    this.promptText.setVisible(true).setText(turn.decision.prompt);

    const buttonWidth = 386;
    const buttonHeight = 32;
    for (const [index, option] of turn.options.entries()) {
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = 78 + column * 416;
      const y = 426 + row * 36;
      const button = this.createChoiceButton(
        x,
        y,
        buttonWidth,
        buttonHeight,
        `${index + 1}. ${option.text}`,
        () => {
          if (this.designerOpen) return;
          this.runtime.choose(option.id);
        },
        option.id.includes("accuse") || option.id.endsWith("press")
      );
      this.choiceButtons.push(button);
    }
  }

  private createChoiceButton(
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    onSelect: () => void,
    dangerous = false
  ): Phaser.GameObjects.Container {
    const background = this.add.graphics();
    const draw = (hovered: boolean) => {
      background.clear();
      background.fillStyle(
        hovered ? (dangerous ? 0x4b2830 : palette.panelBright) : 0x151f2b,
        1
      );
      background.fillRoundedRect(0, 0, width, height, 6);
      background.lineStyle(1, hovered ? (dangerous ? palette.red : palette.gold) : 0x455464, 0.9);
      background.strokeRoundedRect(0, 0, width, height, 6);
    };
    draw(false);
    const text = this.add.text(12, height / 2, label, {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "12px",
      fontStyle: "bold",
      color: dangerous ? "#efb2b6" : "#e7edf0"
    }).setOrigin(0, 0.5);
    const container = this.add.container(x, y, [background, text]).setDepth(47);
    container.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, width, height),
      Phaser.Geom.Rectangle.Contains
    );
    container.input!.cursor = "pointer";
    container.on("pointerover", () => draw(true));
    container.on("pointerout", () => draw(false));
    container.on("pointerdown", onSelect);
    return container;
  }

  private playVoiceLine(turn: DialogLineTurn): void {
    if (this.shuttingDown) return;
    this.stopVoiceLines();
    this.setSpeakingSuspect(suspectByVoice[turn.line.voiceAssetId]);
    if (!turn.resolved.audio) return;
    const key = dialogAudioKey(turn.line.lineAssetId);
    if (!this.cache.audio.exists(key)) return;
    const voice = this.sound.add(key, {
      volume: turn.resolved.audio.playback?.volume ?? 0.9,
      rate: turn.resolved.audio.playback?.playbackRate ?? 1
    });
    this.activeVoice = voice;
    this.voiceSounds.add(voice);
    voice.once(Phaser.Sound.Events.COMPLETE, () => {
      if (!this.voiceSounds.delete(voice)) return;
      if (this.activeVoice === voice) {
        this.activeVoice = undefined;
        this.setSpeakingSuspect(undefined);
      }
      voice.destroy();
      if (this.voiceSounds.size === 0) this.setMusicDucked(false);
    });
    this.setMusicDucked(true);
    let started = false;
    try {
      started = voice.play();
    } catch (error) {
      console.warn(`Could not play dialog audio ${key}.`, error);
    }
    if (!started) {
      this.voiceSounds.delete(voice);
      if (this.activeVoice === voice) this.activeVoice = undefined;
      voice.destroy();
      if (this.voiceSounds.size === 0) this.setMusicDucked(false);
    }
  }

  private advanceCurrentLine(): void {
    if (this.designerOpen) return;
    if (!this.caseStarted) {
      this.requestCaseStart();
      return;
    }
    const turn = this.runtime.current();
    if (turn?.type !== "line") return;
    this.stopVoiceLines();
    this.runtime.advance();
  }

  private stopVoiceLines(): void {
    const voices = [...this.voiceSounds];
    this.voiceSounds.clear();
    this.activeVoice = undefined;
    for (const voice of voices) {
      voice.stop();
      voice.destroy();
    }
    if (!this.shuttingDown) this.setSpeakingSuspect(undefined);
    if (this.voiceSounds.size === 0) this.setMusicDucked(false);
  }

  private startBackgroundMusic(): void {
    if (this.shuttingDown || this.backgroundMusic || !this.cache.audio.exists(noirMusicAssetId)) return;
    const asset = this.aiAssets.assets[noirMusicAssetId];
    const version = asset?.versions[asset.activeVersion];
    const playback = { ...asset?.audioPlayback, ...version?.audioPlayback };
    this.backgroundMusicVolume = Phaser.Math.Clamp(playback.volume ?? 0.18, 0, 1);
    const music = this.sound.add(noirMusicAssetId);
    this.backgroundMusic = music;
    let started = false;
    try {
      started = music.play({
        loop: playback.loop ?? true,
        rate: playback.playbackRate ?? 1,
        seek: playback.trimStartSeconds ?? 0,
        volume: this.backgroundMusicVolume
      });
    } catch (error) {
      console.warn("Could not play the film-noir background score.", error);
    }
    if (!started) {
      music.destroy();
      this.backgroundMusic = undefined;
    }
  }

  private stopBackgroundMusic(): void {
    const music = this.backgroundMusic;
    this.backgroundMusic = undefined;
    if (!music) return;
    music.stop();
    music.destroy();
  }

  private setMusicDucked(ducked: boolean): void {
    const music = this.backgroundMusic as (Phaser.Sound.BaseSound & {
      setVolume?: (value: number) => Phaser.Sound.BaseSound;
      volume?: number;
    }) | undefined;
    if (!music) return;
    const volume = this.backgroundMusicVolume * (ducked ? musicDuckRatio : 1);
    if (music.setVolume) music.setVolume(volume);
    else music.volume = volume;
  }

  private handleOptionSelected(optionId: string): void {
    if (!optionId.endsWith("leave") && optionId !== "lucien.final.wait") {
      this.consumed.add(optionId);
    }

    switch (optionId) {
      case "ada.debt.protect":
      case "ada.ask.apologize":
        this.facts.delete("ada.defensive");
        this.facts.add("ada.trusted");
        this.showToast("Ada will speak candidly", palette.teal);
        break;
      case "ada.debt.press":
      case "ada.accuse.wrong":
        this.facts.delete("ada.trusted");
        this.facts.add("ada.defensive");
        this.recordWrongAccusation("Ada no longer trusts your judgment");
        break;
      case "bram.alarm.proof":
        this.facts.delete("bram.hostile");
        this.facts.add("bram.trusted");
        break;
      case "bram.alarm.press":
      case "bram.accuse.wrong":
        this.facts.delete("bram.trusted");
        this.facts.add("bram.hostile");
        this.recordWrongAccusation("Bram refuses technical help");
        break;
      case "bram.ask.reconsider":
        this.facts.delete("bram.hostile");
        this.facts.add("bram.trusted");
        this.showToast("Bram returns to the evidence", palette.teal);
        break;
      case "lucien.accuse.early":
        this.recordWrongAccusation("Vale dismisses the incomplete accusation");
        break;
      case "lucien.final.open":
        this.facts.add("case.reveal_started");
        break;
    }
    this.syncEnablement();
    this.updateEvidence();
  }

  private handleLineSaid(turn: DialogLineTurn): void {
    const factsByLine: Record<string, string> = {
      "ada.debt.reply": "ada.debt_explained",
      "ada.clock.reply": "ada.clock_stopped",
      "ada.wax.reply": "ada.wax_loan",
      "ada.threat.reply": "ada.threat_overheard",
      "ada.dark.reply": "ada.folio_clasp_heard",
      "ada.bram.reply": "ada.saw_work_order",
      "bram.work-order.reply": "bram.alarm_work_order",
      "bram.breaker.reply": "bram.breaker_untouched",
      "bram.lock.reply": "bram.wax_in_lock",
      "bram.lamp.reply": "bram.lamp_sabotaged",
      "lucien.timeline.reply": "lucien.clock_claim",
      "lucien.watermark.reply": "lucien.watermark_denial",
      "lucien.clock.reply": "lucien.clock_confronted",
      "lucien.lamp.reply": "lucien.lamp_confronted",
      "lucien.wax.reply": "lucien.wax_confronted",
      "lucien.motive.reply": "lucien.motive_confronted",
      "lucien.reveal.close": "case.solved"
    };
    const fact = factsByLine[turn.line.id];
    if (fact) this.addFact(fact);
  }

  private addFact(fact: string): void {
    if (this.facts.has(fact)) return;
    const previous = this.proofState();
    this.facts.add(fact);
    const next = this.proofState();
    const clueLabels: Record<string, string> = {
      "ada.clock_stopped": "Clue linked · the mantel clock was silent",
      "ada.wax_loan": "Clue linked · Vale borrowed Ada's blue wax",
      "ada.threat_overheard": "Clue linked · the watermark threatened Vale",
      "ada.folio_clasp_heard": "Optional clue · a folio closed in the dark",
      "ada.saw_work_order": "Red herring weakened · Bram's order was real",
      "bram.alarm_work_order": "Red herring cleared · the alarm repair was authorized",
      "bram.breaker_untouched": "Clue linked · the blackout began inside the room",
      "bram.wax_in_lock": "Clue linked · wax copied the lock's ward pattern",
      "bram.lamp_sabotaged": "Clue linked · Vale's lamp caused the blackout",
      "lucien.clock_claim": "New contradiction available · ask Ada about the chime",
      "lucien.watermark_denial": "New motive path available · ask Ada what she heard"
    };
    if (clueLabels[fact]) this.showToast(clueLabels[fact]!, palette.gold);
    if (!previous.timeline && next.timeline) this.showToast("PROOF I ESTABLISHED · TIMELINE", palette.teal);
    if (!previous.method && next.method) this.showToast("PROOF II ESTABLISHED · METHOD", palette.teal);
    if (!previous.motive && next.motive) this.showToast("PROOF III ESTABLISHED · MOTIVE", palette.teal);
    if (!previous.ready && next.ready) this.showToast("THE COMPLETE ACCUSATION IS NOW AVAILABLE", palette.gold, 2600);
    this.syncEnablement();
    this.updateEvidence();
  }

  private handleDialogEnd(dialogId: string): void {
    this.stopVoiceLines();
    this.suspectInputLockedUntil = this.time.now + 180;
    if (dialogId === "dialog.intro") {
      this.facts.add("case.intro_complete");
      this.syncEnablement();
      this.setDialogVisible(false);
      this.setSuspectFocus(undefined);
      this.instructionText.setText("Click a suspect to begin questioning");
      this.showToast("QUESTIONING OPEN · choose a suspect", palette.gold);
      return;
    }
    const suspectId = dialogId.replace("dialog.", "") as SuspectId;
    if (this.suspects.has(suspectId)) this.facts.add(`talked.${suspectId}`);
    this.syncEnablement();
    if (this.has("case.solved")) {
      this.showSolvedCard();
      return;
    }
    this.setDialogVisible(false);
    this.setSuspectFocus(undefined);
    this.selectedSuspect = undefined;
    this.instructionText.setText(
      this.proofState().ready
        ? "The case is complete. Confront Dr. Vale."
        : "Click a suspect to continue questioning"
    );
  }

  private syncEnablement(): void {
    this.runtime.clearEnabledOverrides();
    this.setEnabled(
      { type: "dialog", dialogId: "dialog.intro" },
      !this.has("case.intro_complete") && !this.has("case.solved")
    );
    for (const dialogId of ["dialog.ada", "dialog.bram", "dialog.lucien"]) {
      this.setEnabled(
        { type: "dialog", dialogId },
        this.has("case.intro_complete") && !this.has("case.solved")
      );
    }
    this.setEnabled(
      { type: "node", dialogId: "dialog.ada", nodeId: "ada.intro" },
      !this.has("talked.ada")
    );
    this.setEnabled(
      { type: "node", dialogId: "dialog.bram", nodeId: "bram.intro" },
      !this.has("talked.bram")
    );
    this.setEnabled(
      { type: "node", dialogId: "dialog.lucien", nodeId: "lucien.intro" },
      !this.has("talked.lucien")
    );

    this.option("dialog.ada", "ada.menu", "ada.ask.debt", !this.used("ada.ask.debt"));
    this.option("dialog.ada", "ada.menu", "ada.ask.clock", this.has("lucien.clock_claim") && !this.used("ada.ask.clock"));
    this.option("dialog.ada", "ada.menu", "ada.ask.wax", this.has("ada.trusted") && this.has("bram.wax_in_lock") && !this.used("ada.ask.wax"));
    this.option("dialog.ada", "ada.menu", "ada.ask.threat", this.has("ada.trusted") && !this.used("ada.ask.threat"));
    this.option("dialog.ada", "ada.menu", "ada.ask.dark", this.has("ada.trusted") && !this.used("ada.ask.dark"));
    this.option("dialog.ada", "ada.menu", "ada.ask.bram", this.has("ada.trusted") && !this.used("ada.ask.bram"));
    this.option("dialog.ada", "ada.menu", "ada.ask.apologize", this.has("ada.defensive") && !this.used("ada.ask.apologize"));
    this.option("dialog.ada", "ada.menu", "ada.accuse.wrong", !this.used("ada.accuse.wrong"));

    this.option("dialog.bram", "bram.menu", "bram.ask.alarm", !this.used("bram.ask.alarm"));
    this.option("dialog.bram", "bram.menu", "bram.ask.breaker", !this.used("bram.ask.breaker"));
    this.option("dialog.bram", "bram.menu", "bram.ask.lock", this.has("bram.trusted") && !this.used("bram.ask.lock"));
    this.option("dialog.bram", "bram.menu", "bram.ask.lamp", this.has("bram.trusted") && this.has("bram.breaker_untouched") && !this.used("bram.ask.lamp"));
    this.option("dialog.bram", "bram.menu", "bram.ask.reconsider", this.has("bram.hostile") && !this.used("bram.ask.reconsider"));
    this.option("dialog.bram", "bram.menu", "bram.accuse.wrong", !this.used("bram.accuse.wrong"));

    const proof = this.proofState();
    this.option("dialog.lucien", "lucien.menu", "lucien.ask.timeline", !this.used("lucien.ask.timeline"));
    this.option("dialog.lucien", "lucien.menu", "lucien.ask.watermark", !this.used("lucien.ask.watermark"));
    this.option("dialog.lucien", "lucien.menu", "lucien.ask.blame-ada", !this.has("ada.debt_explained") && !this.used("lucien.ask.blame-ada"));
    this.option("dialog.lucien", "lucien.menu", "lucien.ask.blame-bram", !this.has("bram.alarm_work_order") && !this.used("lucien.ask.blame-bram"));
    this.option("dialog.lucien", "lucien.menu", "lucien.confront.clock", proof.timeline && !this.used("lucien.confront.clock"));
    this.option("dialog.lucien", "lucien.menu", "lucien.confront.lamp", this.has("bram.lamp_sabotaged") && !this.used("lucien.confront.lamp"));
    this.option("dialog.lucien", "lucien.menu", "lucien.confront.wax", this.has("bram.wax_in_lock") && this.has("ada.wax_loan") && !this.used("lucien.confront.wax"));
    this.option("dialog.lucien", "lucien.menu", "lucien.confront.motive", proof.motive && !this.used("lucien.confront.motive"));
    this.option("dialog.lucien", "lucien.menu", "lucien.ask.folio", this.has("ada.folio_clasp_heard") && !this.used("lucien.ask.folio"));
    this.option("dialog.lucien", "lucien.menu", "lucien.accuse.early", !proof.ready && !this.used("lucien.accuse.early"));
    this.option("dialog.lucien", "lucien.menu", "lucien.accuse.final", proof.ready && !this.has("case.solved"));

    this.setEnabled({
      type: "line",
      dialogId: "dialog.lucien",
      nodeId: "lucien.reveal",
      lineId: "lucien.reveal.folio-clue"
    }, this.has("ada.folio_clasp_heard"));
    this.setEnabled({
      type: "line",
      dialogId: "dialog.lucien",
      nodeId: "lucien.reveal",
      lineId: "lucien.reveal.container"
    }, !this.has("ada.folio_clasp_heard"));
  }

  private option(dialogId: string, nodeId: string, optionId: string, enabled: boolean): void {
    this.setEnabled({ type: "option", dialogId, nodeId, optionId }, enabled);
  }

  private setEnabled(target: DialogElementTarget, enabled: boolean): void {
    this.runtime.setEnabled(target, enabled);
  }

  private proofState(): { timeline: boolean; method: boolean; motive: boolean; ready: boolean } {
    const timeline = this.has("lucien.clock_claim") && this.has("ada.clock_stopped");
    const method = this.has("bram.breaker_untouched")
      && this.has("bram.lamp_sabotaged")
      && this.has("bram.wax_in_lock")
      && this.has("ada.wax_loan");
    const motive = this.has("lucien.watermark_denial") && this.has("ada.threat_overheard");
    return { timeline, method, motive, ready: timeline && method && motive };
  }

  private updateEvidence(): void {
    const proof = this.proofState();
    this.updateSeal("timeline", proof.timeline);
    this.updateSeal("method", proof.method);
    this.updateSeal("motive", proof.motive);
    const count = [proof.timeline, proof.method, proof.motive].filter(Boolean).length;
    const missteps = this.wrongAccusations > 0 ? ` · MISSTEPS ${this.wrongAccusations}` : "";
    this.statusText.setText(
      proof.ready
        ? `CASE NOTES · ALL THREE PROOFS ESTABLISHED${missteps}`
        : `CASE NOTES · ${count}/3 PROOFS ESTABLISHED${missteps}`
    );
    this.statusText.setColor(proof.ready ? "#f0d18d" : "#aab9c5");
  }

  private updateSeal(id: "timeline" | "method" | "motive", active: boolean): void {
    const seal = this.evidence.get(id);
    if (!seal) return;
    seal.card
      .setFillStyle(active ? 0x173c38 : palette.panel, 0.96)
      .setStrokeStyle(2, active ? palette.teal : palette.disabled, active ? 1 : 0.9);
    seal.icon.setColor(active ? "#8ff0dc" : "#687482");
    seal.title.setColor(active ? "#d8fff6" : "#7d8997");
    seal.detail.setColor(active ? "#82cdbc" : "#65717e");
  }

  private setDialogVisible(visible: boolean): void {
    this.modalShade.setVisible(visible);
    this.panel.setVisible(visible);
    if (!visible) {
      this.stopVoiceLines();
      this.destroyChoiceButtons();
      this.speakerText.setVisible(false);
      this.lineText.setVisible(false);
      this.directionText.setVisible(false);
      this.promptText.setVisible(false);
      this.advanceHint.setVisible(false);
      this.advanceZone.disableInteractive().setVisible(false);
    }
  }

  private setSuspectFocus(suspectId: SuspectId | undefined): void {
    for (const suspect of this.suspects.values()) {
      const selected = !suspectId || suspect.id === suspectId;
      suspect.image
        .setAlpha(selected ? 1 : 0.3)
        .setScale(suspect.baseScaleX, suspect.baseScaleY);
      suspect.label.setAlpha(selected ? 1 : 0.38);
      suspect.glow.setAlpha(suspect.id === suspectId ? 0.62 : (suspectId ? 0.04 : 0.15));
    }
  }

  private destroyChoiceButtons(): void {
    for (const button of this.choiceButtons) button.destroy(true);
    this.choiceButtons = [];
  }

  private dialogIsActive(): boolean {
    return this.runtime?.snapshot().status === "running";
  }

  private has(fact: string): boolean {
    return this.facts.has(fact);
  }

  private used(optionId: string): boolean {
    return this.consumed.has(optionId);
  }

  private recordWrongAccusation(message: string): void {
    this.wrongAccusations += 1;
    this.showToast(`UNFOUNDED ACCUSATION · ${message}`, palette.red, 2300);
  }

  private showToast(message: string, color = palette.teal, duration = 1900): void {
    this.toastTimer?.destroy();
    this.tweens.killTweensOf(this.toast);
    this.toast
      .setText(message)
      .setBackgroundColor(`#${color.toString(16).padStart(6, "0")}`)
      .setAlpha(1);
    this.toastTimer = this.time.delayedCall(duration + 1000, () => {
      this.tweens.add({
        targets: this.toast,
        alpha: 0,
        duration: 450,
        ease: "Sine.Out"
      });
    });
  }

  private showLedgerCard(): void {
    if (this.ledgerCard) return;
    const shadow = this.add.rectangle(0, 4, 178, 104, 0x000000, 0.38);
    const paper = this.add.rectangle(0, 0, 178, 104, 0xc6b283, 1)
      .setStrokeStyle(4, 0x54412a, 1);
    const title = this.add.text(0, -24, "THE RAVEN LEDGER", {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "15px",
      fontStyle: "bold",
      color: "#352818"
    }).setOrigin(0.5);
    const watermark = this.add.text(0, 9, "WATERMARK · 1846", {
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      fontSize: "11px",
      fontStyle: "bold",
      color: "#315b63",
      letterSpacing: 1
    }).setOrigin(0.5);
    this.ledgerCard = this.add.container(480, 238, [shadow, paper, title, watermark])
      .setDepth(60)
      .setScale(0.75)
      .setAlpha(0);
    this.tweens.add({
      targets: this.ledgerCard,
      alpha: 1,
      scale: 1,
      y: 228,
      duration: 420,
      ease: "Back.Out"
    });
  }

  private showSolvedCard(): void {
    this.destroyChoiceButtons();
    this.setDialogVisible(true);
    this.speakerText.setVisible(true).setText("CASE CLOSED").setColor("#8ff0dc");
    this.lineText.setVisible(true).setText(
      "Dr. Lucien Vale stole the Raven Ledger to hide the watermark that exposed his celebrated discovery as a fraud.\n\nThe ledger is recovered. Blackwood House can unlock its doors."
    );
    this.directionText.setVisible(true).setText("TIMELINE · METHOD · MOTIVE · ALL PROVEN");
    this.promptText.setVisible(false);
    this.advanceHint.setVisible(false);
    this.advanceZone.disableInteractive().setVisible(false);
    this.createChoiceButton(318, 570, 324, 36, "BEGIN A NEW INVESTIGATION", () => {
      window.location.reload();
    });
    this.instructionText.setText("The Silent Ledger · solved");
    this.setSuspectFocus("lucien");
  }
}
