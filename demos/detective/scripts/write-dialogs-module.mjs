import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const demoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestDir = path.join(demoRoot, "src/dialogs");
const moduleOut = path.join(demoRoot, "src/dialogs.ts");
const dialogs = {};
const dialogPaths = {};

for (const filePath of await jsonFiles(manifestDir)) {
  const relativePath = path.relative(manifestDir, filePath);
  const value = JSON.parse(await readFile(filePath, "utf8"));
  dialogs[value.id] = value;
  const dirname = path.dirname(relativePath);
  dialogPaths[value.id] = dirname === "." ? [] : dirname.split(path.sep);
}

await mkdir(path.dirname(moduleOut), { recursive: true });
await writeFile(moduleOut, [
  "import { defineDialogManifest } from \"@dialog-designer/core\";",
  "",
  "export const dialogs = defineDialogManifest(",
  `${JSON.stringify({ schemaVersion: 1, dialogs, dialogPaths }, null, 2)}`,
  ");",
  ""
].join("\n"));

async function jsonFiles(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const filePath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) files.push(...await jsonFiles(filePath));
    else if (entry.isFile() && entry.name.endsWith(".json")) files.push(filePath);
  }
  return files.sort((a, b) => a.localeCompare(b));
}
