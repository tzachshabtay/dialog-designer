import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type {
  AiAssetDefinition,
  AiAssetManifest
} from "@ai-game-assets/core";
import type { DialogDesignerManifest } from "@dialog-designer/core";
import {
  createAiVoiceLine,
  type CreateAiVoiceLineRequest
} from "./ai-line-store.js";
import {
  promoteDialogManifest,
  readDialogManifest,
  type DialogStoreOptions
} from "./dialog-store.js";

export type DialogDesignerDevServerOptions = DialogStoreOptions & {
  aiAssetsManifestPath: string;
  aiAssetsManifestModulePath?: string;
  host?: string;
  port?: number;
};

export type CreateVoiceLineRequest = CreateAiVoiceLineRequest;

export type CreateVoiceLineResponse = {
  aiAssets: AiAssetManifest;
  asset: AiAssetDefinition;
  lineAssetId: string;
};

export function createDialogDesignerDevServer(options: DialogDesignerDevServerOptions) {
  const server = createServer(async (request, response) => {
    try {
      await routeRequest(options, request, response);
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  return {
    listen() {
      const port = options.port ?? 3979;
      const host = options.host ?? "127.0.0.1";

      return new Promise<{ port: number; host: string }>((resolve, reject) => {
        const onError = (error: Error) => {
          server.off("listening", onListening);
          reject(error);
        };
        const onListening = () => {
          server.off("error", onError);
          const address = server.address();
          resolve({
            host,
            port: typeof address === "object" && address ? address.port : port
          });
        };
        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(port, host);
      });
    },
    close() {
      return new Promise<void>((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
      });
    },
    server
  };
}

async function routeRequest(
  options: DialogDesignerDevServerOptions,
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  const url = new URL(request.url ?? "/", "http://localhost");

  if (request.method === "OPTIONS") {
    response.writeHead(204, corsHeaders());
    response.end();
    return;
  }

  if (request.method === "GET" && url.pathname === "/__dialog-designer/manifest") {
    sendJson(response, 200, await readDialogManifest(options.manifestPath));
    return;
  }

  if (
    request.method === "POST"
    && (
      url.pathname === "/__dialog-designer/promote"
      || url.pathname === "/__dialog-designer/save"
    )
  ) {
    const body = await readJson<{ manifest: DialogDesignerManifest }>(request);
    const manifest = await promoteDialogManifest(options, body.manifest);
    sendJson(response, 200, { manifest });
    return;
  }

  if (request.method === "POST" && url.pathname === "/__dialog-designer/voice-line") {
    const body = await readJson<CreateVoiceLineRequest>(request);
    const result: CreateVoiceLineResponse = await createAiVoiceLine({
      manifestPath: options.aiAssetsManifestPath,
      manifestModulePath: options.aiAssetsManifestModulePath
    }, body);
    sendJson(response, 200, result);
    return;
  }

  sendJson(response, 404, { error: "Not found" });
}

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, {
    ...corsHeaders(),
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(body));
}

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function readJson<T>(request: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let length = 0;

    request.on("data", (chunk: Buffer | string) => {
      const buffer = Buffer.from(chunk);
      length += buffer.byteLength;
      if (length > 5 * 1024 * 1024) {
        reject(new Error("Request body exceeds 5 MB."));
        request.destroy();
        return;
      }
      chunks.push(buffer);
    });
    request.on("error", reject);
    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")) as T);
      } catch (error) {
        reject(error);
      }
    });
  });
}
