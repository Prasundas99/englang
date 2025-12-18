import { mkdir, copyFile } from "node:fs/promises";
import { build } from "esbuild";

const cdnOutputDirectory = "website/static/cdn";
const rootCdnOutputDirectory = "cdn";
const bundledOutputFilePath = `${cdnOutputDirectory}/englang.min.js`;
const rootOutputFilePath = `${rootCdnOutputDirectory}/englang.min.js`;

await mkdir(cdnOutputDirectory, { recursive: true });
await mkdir(rootCdnOutputDirectory, { recursive: true });

await build({
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "iife",
  globalName: "Englang",
  minify: true,
  platform: "browser",
  target: ["es2018"],
  outfile: bundledOutputFilePath,
});

await copyFile(bundledOutputFilePath, rootOutputFilePath);

console.log(`CDN bundle created:\n- ${bundledOutputFilePath}\n- ${rootOutputFilePath}`);
