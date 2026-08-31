import type { DialogDesignerManifest } from "@dialog-designer/core";
import {
  readDialogManifestDirectory,
  writeDialogManifestModule
} from "./dialog-store.js";

export type BuildDialogManifestOptions = {
  manifestDir: string;
  moduleOut: string;
};

export async function buildDialogManifestModule(
  options: BuildDialogManifestOptions
): Promise<DialogDesignerManifest> {
  const manifest = await readDialogManifestDirectory(options.manifestDir);
  await writeDialogManifestModule(options.moduleOut, manifest);
  return manifest;
}
