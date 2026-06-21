#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nama = process.argv[2];

if (!nama) {
  console.log("Cara pakai: node buat-logika.js nama-file");
  console.log("Contoh    : node buat-logika.js navbar-toggle");
  process.exit(1);
}

const namaFile = nama.endsWith(".js") ? nama : `${nama}.js`;
const logikaDir = path.join(__dirname, "..", "logika");
const filePath = path.join(logikaDir, namaFile);
const importPath = path.join(logikaDir, "import.js");

if (!fs.existsSync(logikaDir)) {
  console.log("Folder 'logika/' tidak ditemukan. Jalankan script ini dari root project ARKAJS.");
  process.exit(1);
}

if (fs.existsSync(filePath)) {
  console.log(`File logika/${namaFile} sudah ada. Pakai nama lain ya.`);
  process.exit(1);
}

const isiFile = `import { runDOM } from "../sistem/util.js"

runDOM('SELECTOR_DISINI', (el) => {
  // TODO: tulis logic kamu di sini
})
`;

fs.writeFileSync(filePath, isiFile);
console.log(`✔ File dibuat: logika/${namaFile}`);

let isiImport = fs.existsSync(importPath) ? fs.readFileSync(importPath, "utf-8") : "";
const barisImport = `import "./${namaFile}"`;

if (isiImport.includes(barisImport)) {
  console.log("Import sudah ada di logika/import.js, tidak ditambahkan ulang.");
} else {
  const pemisah = isiImport.length && !isiImport.endsWith("\n") ? "\n" : "";
  fs.writeFileSync(importPath, isiImport + pemisah + barisImport + "\n");
  console.log("✔ logika/import.js otomatis diperbarui.");
}

console.log("\nSelesai! Tinggal edit SELECTOR_DISINI dan logic-nya di file barunya.");
