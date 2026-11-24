import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "The reviewer who asks nothing has already found everything.";

// Writes exactly one fortune-cookie line to entry.txt in the output dir.
// Output dir resolution: MAKEFUN_OUTPUT_DIR env, then --output flag, then /output.

function resolveOutputDir(argv) {
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (envDir && envDir.trim() !== "") return envDir;
  const flagIndex = argv.indexOf("--output");
  if (flagIndex !== -1 && argv[flagIndex + 1]) return argv[flagIndex + 1];
  return "/output";
}

const outDir = resolveOutputDir(process.argv.slice(2));
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
