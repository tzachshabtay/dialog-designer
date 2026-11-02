import { AiAssetDebugClient } from '@ai-game-assets/phaser';
import { DialogDesignerDebugClient } from '@dialog-designer/designer';
import type { DialogDesignerManifest } from '@dialog-designer/core';

/** Register live choice definitions before AI Assets reads them for generation or recording.
 * The server merges definitions into its latest catalog, preserving all existing takes. */
export class DialogOptionAssetClient extends AiAssetDebugClient {
  constructor(endpoint: string, private dialogs: () => DialogDesignerManifest,
    private dialogClient = new DialogDesignerDebugClient()) { super(endpoint); }

  private async prepare(assetId: string): Promise<void> {
    const manifest = this.dialogs();
    const isChoice = Object.values(manifest.dialogs).some(dialog => Object.values(dialog.nodes).some(node =>
      node.type === 'decision' && node.options.some(option => option.spokenByCharacter && option.lineAssetId === assetId)));
    if (isChoice) await this.dialogClient.syncOptionVoices(manifest);
  }

  override async generate(...args: Parameters<AiAssetDebugClient['generate']>) {
    await this.prepare(args[0].assetId);
    return super.generate(...args);
  }
  override async generateStream(...args: Parameters<AiAssetDebugClient['generateStream']>) {
    await this.prepare(args[0].assetId);
    return super.generateStream(...args);
  }
  override async save(...args: Parameters<AiAssetDebugClient['save']>) {
    await this.prepare(args[0].assetId);
    return super.save(...args);
  }
  override async updateVoiceLine(...args: Parameters<AiAssetDebugClient['updateVoiceLine']>) {
    await this.prepare(args[0].assetId);
    return super.updateVoiceLine(...args);
  }
}
