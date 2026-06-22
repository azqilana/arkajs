#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import { buatLogika } from "./sistem/buat-logika.js";
import { buatRute } from "./sistem/buat-rute.js";

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

const mode = process.argv[2];

if (mode === "rute") {
  await buatRute(process.argv[3], rootDir);
} else {
  buatLogika(mode, rootDir);
}
