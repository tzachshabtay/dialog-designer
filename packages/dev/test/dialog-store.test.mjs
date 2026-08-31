import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  promoteDialogManifest,
  readDialogManifest,
  writeDialogManifestDirectory
} from "../dist/index.js";

const dialog = (id, name = id) => ({
  id,
  name,
  enabled: true,
  entryNodeId: `${id}.opening`,
  nodes: {
    [`${id}.opening`]: {
      id: `${id}.opening`,
      type: "block",
      name: "Opening",
      enabled: true,
      lines: []
    }
  }
});

test("directory manifests round-trip paths and remove stale dialog files", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dialog-designer-store-"));
  const manifestPath = path.join(root, "dialogs");

  try {
    await writeDialogManifestDirectory(manifestPath, {
      schemaVersion: 1,
      dialogs: {
        interview: dialog("interview"),
        finale: dialog("finale")
      },
      dialogPaths: {
        interview: ["suspects"],
        finale: []
      }
    });

    const first = await readDialogManifest(manifestPath);
    assert.deepEqual(first.dialogPaths, {
      finale: [],
      interview: ["suspects"]
    });

    await writeDialogManifestDirectory(manifestPath, {
      schemaVersion: 1,
      dialogs: { interview: dialog("interview", "Updated") },
      dialogPaths: { interview: ["suspects"] }
    });

    const second = await readDialogManifest(manifestPath);
    assert.equal(second.dialogs.interview.name, "Updated");
    assert.equal(second.dialogs.finale, undefined);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("promotion writes a generated TypeScript module", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dialog-designer-module-"));
  const manifestPath = path.join(root, "dialogs.json");
  const manifestModulePath = path.join(root, "dialogs.ts");
  const manifest = {
    schemaVersion: 1,
    dialogs: { interview: dialog("interview") }
  };

  try {
    await promoteDialogManifest({ manifestPath, manifestModulePath }, manifest);
    const source = await readFile(manifestModulePath, "utf8");
    assert.match(source, /defineDialogManifest/);
    assert.match(source, /export const dialogs/);
    assert.match(source, /"interview"/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
