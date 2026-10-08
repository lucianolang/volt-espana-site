import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Only replace the generated GitHub Pages directory inside this project.
const output = new URL("../docs/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("../dist/client/", import.meta.url), output, {
  recursive: true,
});
await writeFile(new URL(".nojekyll", output), "");
console.log(`GitHub Pages build ready: ${fileURLToPath(output)}`);
