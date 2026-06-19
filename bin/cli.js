#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateDir = path.join(__dirname, "..", "template");
const targetArg = process.argv[2];
const targetDir = targetArg ? path.join(process.cwd(), targetArg) : process.cwd();

function copyFolderSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log(`Membuat project ARKAJS di: ${targetDir}`);
copyFolderSync(templateDir, targetDir);
console.log("Selesai! Project ARKAJS sudah siap dipakai.");
console.log("Jalankan dengan live server (misal: npx serve) lalu buka index.html");
