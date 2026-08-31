import { randomUUID } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import path from "node:path";
import {
  assertDialogManifest,
  type DialogDefinition,
  type DialogDesignerManifest
} from "@dialog-designer/core";

export type DialogStoreOptions = {
  manifestPath: string;
  manifestModulePath?: string;
};

export async function readDialogManifest(
  manifestPath: string
): Promise<DialogDesignerManifest> {
  if (await isDirectory(manifestPath)) {
    return readDialogManifestDirectory(manifestPath);
  }

  const raw = await readFile(manifestPath, "utf8");
  const manifest = JSON.parse(raw) as DialogDesignerManifest;
  assertDialogManifest(manifest);
  return manifest;
}

export async function writeDialogManifest(
  manifestPath: string,
  manifest: DialogDesignerManifest
): Promise<void> {
  assertDialogManifest(manifest);

  if (await shouldUseDirectory(manifestPath)) {
    await writeDialogManifestDirectory(manifestPath, manifest);
    return;
  }

  await writeJsonAtomically(manifestPath, manifest);
}

export async function promoteDialogManifest(
  options: DialogStoreOptions,
  manifest: DialogDesignerManifest
): Promise<DialogDesignerManifest> {
  assertDialogManifest(manifest);
  await writeDialogManifest(options.manifestPath, manifest);

  if (options.manifestModulePath) {
    await writeDialogManifestModule(options.manifestModulePath, manifest);
  }

  return structuredClone(manifest);
}

export async function readDialogManifestDirectory(
  rootDir: string
): Promise<DialogDesignerManifest> {
  const dialogs: Record<string, DialogDefinition> = {};
  const dialogPaths: Record<string, string[]> = {};

  for (const filePath of await jsonFiles(rootDir)) {
    const relativePath = path.relative(rootDir, filePath);
    const dialog = JSON.parse(await readFile(filePath, "utf8")) as DialogDefinition;

    if (dialogs[dialog.id]) {
      throw new Error(`Duplicate dialog id "${dialog.id}" in "${relativePath}".`);
    }

    dialogs[dialog.id] = dialog;
    const directory = path.dirname(relativePath);
    dialogPaths[dialog.id] = directory === "." ? [] : directory.split(path.sep);
  }

  const manifest: DialogDesignerManifest = {
    schemaVersion: 1,
    dialogs,
    dialogPaths
  };
  assertDialogManifest(manifest);
  return manifest;
}

export async function writeDialogManifestDirectory(
  rootDir: string,
  manifest: DialogDesignerManifest
): Promise<void> {
  assertDialogManifest(manifest);
  await mkdir(rootDir, { recursive: true });

  const pendingFiles: Array<{
    filePath: string;
    temporaryPath: string;
    source: string;
  }> = [];
  const destinationPaths = new Set<string>();

  for (const dialog of Object.values(manifest.dialogs)) {
    const folder = manifest.dialogPaths?.[dialog.id] ?? [];
    assertSafeFolder(folder, dialog.id);
    const filePath = path.join(rootDir, ...folder, `${sanitizeFilePart(dialog.id)}.json`);
    const normalizedPath = path.resolve(filePath);

    if (destinationPaths.has(normalizedPath)) {
      throw new Error(`Multiple dialogs resolve to "${path.relative(rootDir, filePath)}".`);
    }
    destinationPaths.add(normalizedPath);
    pendingFiles.push({
      filePath,
      temporaryPath: `${filePath}.tmp-${randomUUID()}`,
      source: `${JSON.stringify(dialog, null, 2)}\n`
    });
  }

  try {
    for (const file of pendingFiles) {
      await mkdir(path.dirname(file.filePath), { recursive: true });
      await writeFile(file.temporaryPath, file.source);
    }

    for (const filePath of await jsonFiles(rootDir)) {
      await rm(filePath, { force: true });
    }

    for (const file of pendingFiles) {
      await rename(file.temporaryPath, file.filePath);
    }
  } catch (error) {
    await Promise.all(pendingFiles.map((file) => rm(file.temporaryPath, { force: true })));
    throw error;
  }
}

export async function writeDialogManifestModule(
  modulePath: string,
  manifest: DialogDesignerManifest
): Promise<void> {
  assertDialogManifest(manifest);
  const source = [
    "import { defineDialogManifest } from \"@dialog-designer/core\";",
    "",
    "export const dialogs = defineDialogManifest(",
    `${JSON.stringify(manifest, null, 2)}`,
    ");",
    ""
  ].join("\n");

  await writeTextAtomically(modulePath, source);
}

async function writeJsonAtomically(filePath: string, value: unknown): Promise<void> {
  await writeTextAtomically(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function writeTextAtomically(filePath: string, source: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${randomUUID()}`;

  try {
    await writeFile(temporaryPath, source);
    await rename(temporaryPath, filePath);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
}

async function shouldUseDirectory(filePath: string): Promise<boolean> {
  if (await isDirectory(filePath)) return true;

  try {
    await stat(filePath);
    return false;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return path.extname(filePath) === "";
  }
}

async function isDirectory(filePath: string): Promise<boolean> {
  try {
    return (await stat(filePath)).isDirectory();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

async function jsonFiles(rootDir: string): Promise<string[]> {
  const entries = await readdir(rootDir, { withFileTypes: true }).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  const files: string[] = [];

  for (const entry of entries) {
    const filePath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await jsonFiles(filePath));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(filePath);
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

function assertSafeFolder(folder: string[], dialogId: string): void {
  for (const part of folder) {
    if (
      part === "." ||
      part === ".." ||
      path.isAbsolute(part) ||
      part.includes("/") ||
      part.includes("\\")
    ) {
      throw new Error(`Dialog "${dialogId}" has unsafe folder segment "${part}".`);
    }
  }
}

function sanitizeFilePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]/g, "-");
}
