<p align="center">
  <img src="./assets/logomark.svg" alt="ARKAJS Logo" width="100" />
</p>

# ARKAJS

Scaffold tool untuk membuat project **ARKAJS** — mini framework client-side routing menggunakan HTML, CSS, dan JavaScript murni (tanpa dependency lain).

## Cara pakai

```bash
npx create-arkajs nama-project
```

atau

```bash
npm create arkajs nama-project
```

Ini akan membuat folder `nama-project` berisi struktur lengkap ARKAJS, siap dijalankan.

Kalau tidak diberi nama folder, project akan dibuat di folder aktif:

```bash
npx create-arkajs
```

## Setelah itu

Masuk ke folder project lalu jalankan lewat live server (karena pakai `fetch`, butuh HTTP server, tidak bisa dibuka langsung dari `file://`):

```bash
npx serve
```

Lalu buka `index.html` lewat browser.

## Struktur project

```
nama-project/
├── gaya/           → file CSS
├── halaman/         → konten halaman (beranda.html, tentang.html, dst)
├── rancangan/        → komponen layout (header, footer, navbar, sidebar)
├── logika/          → script tambahan
├── sistem/          → engine routing (app.js, navigasi.js, kelola.js, rakit.js, rute.json)
└── index.html
```

## Menambah rute baru

1. Tambah file HTML baru di folder `halaman/`
2. Daftarkan di `sistem/rute.json`, contoh:

```json
"/kontak": {
  "judul": "Kontak",
  "header": "header.html",
  "main": "kontak.html",
  "css": "gaya.css"
}
```

3. Tambahkan link `<a href="/kontak">Kontak</a>` di halaman manapun — routing akan otomatis tertangani.

## Catatan penting

Project ini menggunakan `history.pushState` untuk routing, sehingga saat di-deploy ke hosting statis (misalnya Cloudflare Pages, Netlify, Vercel), pastikan hosting tersebut mendukung **SPA fallback** (semua path tanpa file fisik tetap mengarah ke `index.html`). Beberapa hosting seperti Cloudflare Pages sudah mendukung ini secara otomatis.

## Lisensi

MIT
