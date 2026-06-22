import fs from "fs";
import path from "path";
import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function tanya(pertanyaan) {
  return new Promise((resolve) => rl.question(pertanyaan, (jawaban) => resolve(jawaban.trim())));
}

async function tanyaYaTidak(pertanyaan) {
  const jawaban = (await tanya(`${pertanyaan} (y/n): `)).toLowerCase();
  return jawaban === "y" || jawaban === "yes" || jawaban === "ya";
}

function placeholderHeader() {
  return `<header class="header">
  <div class="header__inner">
    <a href="/" class="logo"><img src="assets/logomark.svg" alt="Logo" /></a>
  </div>
</header>
`;
}

function placeholderMain(judul) {
  return `<section class="konten">
  <h1>${judul}</h1>
  <p>Konten halaman ini belum diisi.</p>
</section>
`;
}

function placeholderCss() {
  return `/* CSS khusus halaman ini */\n`;
}

// folder: nama folder fisik (rancangan/halaman/gaya)
// defaultNama: nama file default yang disarankan
// placeholderFn: function() -> isi default kalau file baru dibuat
async function pastikanFile(rootDir, folder, defaultNama, placeholderFn) {
  const dir = path.join(rootDir, folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let namaFile = defaultNama;
  let filePath = path.join(dir, namaFile);

  if (fs.existsSync(filePath)) {
    const pakaiSama = await tanyaYaTidak(
      `File ${folder}/${namaFile} sudah ada. Pakai file yang sama?`
    );
    if (pakaiSama) {
      return namaFile;
    }
    namaFile = await tanya(`Masukkan nama file baru untuk ${folder}/ (contoh: ${namaFile}): `);
    if (!namaFile.endsWith(".html") && !namaFile.endsWith(".css")) {
      namaFile += folder === "gaya" ? ".css" : ".html";
    }
    filePath = path.join(dir, namaFile);
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, placeholderFn());
    console.log(`✔ File dibuat: ${folder}/${namaFile}`);
  }

  return namaFile;
}

export async function buatRute(rute, rootDir) {
  if (!rute) {
    console.log("Cara pakai: node buat.js rute /nama-rute");
    console.log("Contoh    : node buat.js rute /kontak");
    rl.close();
    process.exit(1);
  }

  if (!rute.startsWith("/")) rute = "/" + rute;

  const ruteJsonPath = path.join(rootDir, "konfigurasi", "rute.json");
  if (!fs.existsSync(ruteJsonPath)) {
    console.log("konfigurasi/rute.json tidak ditemukan. Jalankan dari root project ARKAJS.");
    rl.close();
    process.exit(1);
  }

  const dataRute = JSON.parse(fs.readFileSync(ruteJsonPath, "utf-8"));

  if (dataRute[rute]) {
    const lanjut = await tanyaYaTidak(`Rute "${rute}" sudah terdaftar di rute.json. Mau di-overwrite?`);
    if (!lanjut) {
      console.log("Dibatalkan.");
      rl.close();
      return;
    }
  }

  const judul = await tanya("Judul halaman: ");

  const namaBasis = rute === "/" ? "beranda" : rute.replace(/^\//, "").replace(/\//g, "-");

  const headerFile = await pastikanFile(rootDir, "rancangan", "header.html", placeholderHeader);
  const mainFile = await pastikanFile(rootDir, "halaman", `${namaBasis}.html`, () => placeholderMain(judul));
  const cssFile = await pastikanFile(rootDir, "gaya", "gaya.css", placeholderCss);

  dataRute[rute] = {
    judul,
    header: headerFile,
    main: mainFile,
    css: cssFile
  };

  fs.writeFileSync(ruteJsonPath, JSON.stringify(dataRute, null, 2) + "\n");
  console.log(`\n✔ Rute "${rute}" berhasil didaftarkan di konfigurasi/rute.json`);
  console.log("Jangan lupa tambahkan link navigasinya, contoh:");
  console.log(`<a href="${rute}">${judul}</a>`);

  rl.close();
}
