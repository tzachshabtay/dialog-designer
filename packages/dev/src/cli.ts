#!/usr/bin/env node
import path from "node:path";
import { buildDialogManifestModule } from "./build-manifest.js";
import { createDialogDesignerDevServer } from "./server.js";

const args = parseArgs(process.argv.slice(2));

if (args.command === "build") {
  if (!args.manifestDir || !args.moduleOut) {
    usage("build requires --manifest-dir and --module-out.");
  }

  await buildDialogManifestModule({
    manifestDir: path.resolve(args.manifestDir),
    moduleOut: path.resolve(args.moduleOut)
  });
} else {
  if (!args.manifestPath || !args.aiAssetsManifestPath) {
    usage("serve requires --manifest-path and --ai-assets-manifest-path.");
  }

  const server = createDialogDesignerDevServer({
    manifestPath: path.resolve(args.manifestPath),
    manifestModulePath: args.moduleOut ? path.resolve(args.moduleOut) : undefined,
    aiAssetsManifestPath: path.resolve(args.aiAssetsManifestPath),
    aiAssetsManifestModulePath: args.aiAssetsModuleOut
      ? path.resolve(args.aiAssetsModuleOut)
      : undefined,
    host: args.host,
    port: args.port
  });
  const address = await server.listen();
  console.log(`Dialog designer dev server listening on http://${address.host}:${address.port}`);
}

type ParsedArgs = {
  command: "serve" | "build";
  manifestPath?: string;
  manifestDir?: string;
  moduleOut?: string;
  aiAssetsManifestPath?: string;
  aiAssetsModuleOut?: string;
  host?: string;
  port?: number;
};

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    command: argv[0] === "build" ? "build" : "serve"
  };

  for (const arg of argv) {
    if (arg === "serve" || arg === "build") continue;

    if (arg.startsWith("--manifest-path=")) {
      parsed.manifestPath = arg.slice("--manifest-path=".length);
    } else if (arg.startsWith("--manifest-dir=")) {
      parsed.manifestDir = arg.slice("--manifest-dir=".length);
    } else if (arg.startsWith("--module-out=")) {
      parsed.moduleOut = arg.slice("--module-out=".length);
    } else if (arg.startsWith("--ai-assets-manifest-path=")) {
      parsed.aiAssetsManifestPath = arg.slice("--ai-assets-manifest-path=".length);
    } else if (arg.startsWith("--ai-assets-module-out=")) {
      parsed.aiAssetsModuleOut = arg.slice("--ai-assets-module-out=".length);
    } else if (arg.startsWith("--host=")) {
      parsed.host = arg.slice("--host=".length);
    } else if (arg.startsWith("--port=")) {
      const port = Number(arg.slice("--port=".length));
      if (!Number.isInteger(port) || port < 0 || port > 65535) {
        usage("--port must be an integer from 0 through 65535.");
      }
      parsed.port = port;
    } else if (arg === "--help" || arg === "-h") {
      usage();
    } else {
      usage(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function usage(error?: string): never {
  if (error) {
    console.error(error);
    console.error("");
  }

  console.error([
    "Usage:",
    "  dialog-designer-dev serve \\",
    "    --manifest-path=<file-or-dir> \\",
    "    --ai-assets-manifest-path=<file-or-dir> \\",
    "    [--module-out=<file>] \\",
    "    [--ai-assets-module-out=<file>] \\",
    "    [--host=127.0.0.1] [--port=3979]",
    "",
    "  dialog-designer-dev build \\",
    "    --manifest-dir=<dir> \\",
    "    --module-out=<file>"
  ].join("\n"));
  process.exit(error ? 1 : 0);
}
