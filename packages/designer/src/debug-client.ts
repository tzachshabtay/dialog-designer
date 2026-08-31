import type {
  AiAssetDefinition,
  AiAssetManifest
} from "@ai-game-assets/core";
import type { DialogDesignerManifest } from "@dialog-designer/core";

export type PromoteDialogRequest = {
  manifest: DialogDesignerManifest;
  dialogId?: string;
  label?: string;
};

export type CreateDialogVoiceLineRequest = {
  voiceAssetId: string;
  text: string;
  direction?: string;
  assetId?: string;
  label?: string;
};

export type CreateDialogVoiceLineResult = {
  aiAssets: AiAssetManifest;
  asset: AiAssetDefinition;
  lineAssetId: string;
};

export class DialogDesignerDebugClient {
  readonly baseUrl: string;

  constructor(baseUrl = "http://127.0.0.1:3979") {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async manifest(): Promise<DialogDesignerManifest> {
    const response = await this.fetch(`${this.baseUrl}/__dialog-designer/manifest`, {
      cache: "no-store"
    });
    return this.readJson<DialogDesignerManifest>(response);
  }

  async promote(request: PromoteDialogRequest): Promise<DialogDesignerManifest> {
    const response = await this.fetch(`${this.baseUrl}/__dialog-designer/promote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    const body = await this.readJson<{ manifest: DialogDesignerManifest }>(response);
    return body.manifest;
  }

  async createVoiceLine(
    request: CreateDialogVoiceLineRequest
  ): Promise<CreateDialogVoiceLineResult> {
    const response = await this.fetch(`${this.baseUrl}/__dialog-designer/voice-line`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    return this.readJson<CreateDialogVoiceLineResult>(response);
  }

  private async fetch(url: string, init?: RequestInit): Promise<Response> {
    try {
      return await globalThis.fetch(url, init);
    } catch (error) {
      throw new Error(
        `Could not reach the dialog designer dev server at ${url}. ${errorMessage(error)}`
      );
    }
  }

  private async readJson<T>(response: Response): Promise<T> {
    const text = await response.text();
    let body: unknown;
    try {
      body = text ? JSON.parse(text) : undefined;
    } catch {
      body = undefined;
    }

    if (!response.ok) {
      const message = isErrorBody(body) && body.error
        ? body.error
        : text || `Dialog designer request failed with ${response.status}.`;
      throw new Error(message);
    }

    if (body === undefined) {
      throw new Error("Dialog designer returned an empty or invalid JSON response.");
    }
    return body as T;
  }
}

function isErrorBody(value: unknown): value is { error?: string } {
  return typeof value === "object" && value !== null && "error" in value;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
