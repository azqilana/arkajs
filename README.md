<p align="center">
  <img src="./media/logomark.png" alt="ARKAJS Logo" width="300" />
</p>


# ARKAJS

![version](https://img.shields.io/badge/version-1.0.5-blue)

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

## Mengambil Element dari Halaman (runDOM)

Karena konten setiap halaman (`halaman/*.html`) dimuat secara **asynchronous** lewat `fetch` (bukan langsung ada di HTML saat pertama kali dibuka), kamu **tidak bisa** pakai `document.querySelector` secara langsung di script biasa — element-nya mungkin belum ada saat script dijalankan.

Gunakan helper `runDOM` dari `sistem/util.js`. Helper ini akan otomatis menunggu sampai element-nya benar-benar muncul di halaman, baru menjalankan fungsi yang kamu kasih.

```js
import { runDOM } from "../sistem/util.js"

runDOM('h1', (el) => {
  el.addEventListener('click', () => {
    el.textContent = 'Sudah diklik'
  })
})
```

**Cara pakainya:**

1. Import `runDOM` dari `sistem/util.js` (sesuaikan path relatif sesuai lokasi file kamu).
2. Panggil `runDOM(selector, fungsi)`:
   - `selector` → bisa **satu** CSS selector (`'h1'`) atau **array selector** (`['h1', '.btn', '#judul']`). Kalau array, tiap elemen yang ketemu akan langsung memanggil `fungsi` masing-masing — tidak perlu nunggu semuanya ketemu dulu.
   - `fungsi` → dijalankan setiap satu elemen ditemukan, menerima `(el, selector)` — `el` adalah elemennya, `selector` adalah selector yang cocok (berguna kalau pakai array dan mau tahu elemen mana yang baru ketemu).
3. (Opsional) Parameter ketiga: batas waktu maksimum menunggu dalam milidetik. Default 10000 (10 detik). Selector yang belum ketemu sampai batas waktu ini akan muncul log `Element ... Not Found`.

```js
// satu selector
runDOM('.btn-submit', (el) => {
  el.addEventListener('click', () => console.log('Diklik!'))
}, 5000)

// banyak selector sekaligus
runDOM(['h1', '.navbar', '#footer'], (el, selector) => {
  console.log(`${selector} sudah muncul:`, el)
})
```

**Catatan:** Letakkan script yang pakai `runDOM` di folder `logika/`, lalu daftarkan importnya di `logika/import.js` supaya otomatis ikut dimuat lewat `sistem/app.js`.

## Generate File Logika Otomatis (`buat.js`)

Daripada bikin file baru di `logika/` manual terus daftarin import-nya sendiri di `logika/import.js`, kamu bisa pakai script `buat.js` di root project (mode default, tanpa kata `rute`).

```bash
node buat.js nama-file
```

Contoh:

```bash
node buat.js navbar-toggle
```

Ini otomatis akan:

1. Membuat file `logika/navbar-toggle.js` dengan placeholder `runDOM` siap pakai:

   ```js
   import { runDOM } from "../sistem/util.js"

   runDOM('SELECTOR_DISINI', (el) => {
     // TODO: tulis logic kamu di sini
   })
   ```

2. Menambahkan baris `import "./navbar-toggle.js"` ke `logika/import.js` secara otomatis — jadi kamu tidak perlu daftarin manual lagi.

Tinggal buka file barunya, ganti `'SELECTOR_DISINI'` dengan selector element yang mau diambil (contoh: `'.navbar'`, `'#menu-btn'`), lalu isi logic-nya.

**Catatan:**
- Kalau nama file yang sama sudah ada, script akan menolak dan tidak menimpa file lama.
- Kalau import-nya sudah pernah terdaftar, tidak akan didaftarkan dobel.
- Jalankan dari **root folder project** (tempat `buat.js` berada).

## Generate Rute Baru Otomatis (`buat.js rute`)

Selain bikin file logika, `buat.js` juga bisa bikinkan **rute halaman baru** secara interaktif — termasuk file header, konten halaman, CSS, dan otomatis didaftarkan ke `sistem/rute.json`.

```bash
node buat.js rute /nama-rute
```

Contoh:

```bash
node buat.js rute /kontak
```

Script akan menanyakan secara interaktif:

1. **Judul halaman** — buat title halaman dan dipakai sebagai placeholder `<h1>`.
2. Untuk tiap file yang dibutuhkan rute (`header`, `main`, `css`):
   - Kalau file dengan nama default sudah ada (misal `rancangan/header.html` atau `gaya/gaya.css` yang biasanya dipakai bareng-bareng semua rute), script akan tanya: **pakai file yang sama, atau buat file baru?**
   - Kalau jawab **y** (ya) → file lama dipakai, lanjut ke file berikutnya.
   - Kalau jawab **n** (tidak) → diminta nama file baru, lalu dibuatkan file baru dengan placeholder kosong.
   - Kalau file belum ada sama sekali (biasanya file `main`/konten halaman, karena pasti unik per rute) → langsung dibuatkan otomatis dengan placeholder.
3. Setelah semua file siap, entry baru otomatis ditambahkan/ditimpa di `sistem/rute.json`.

Di akhir, script kasih contoh link navigasi yang perlu kamu tambahkan manual ke `rancangan/navbar.html` atau `rancangan/sidebar.html`:

```html
<a href="/kontak">Kontak</a>
```

**Catatan:**
- Kalau rute yang diinput sudah pernah terdaftar di `rute.json`, script akan tanya konfirmasi sebelum menimpa.
- Pastikan menjalankan command ini di **terminal interaktif** (langsung ketik, bukan lewat script otomatis/CI) karena prosesnya tanya-jawab.

## Changelog

### v1.0.5
- `runDOM` mendukung array selector (`runDOM(['h1', '.btn'], fungsi)`), tetap kompatibel dengan single selector.
- `runDOM` diganti dari `setTimeout` jadi `MutationObserver` — elemen terdeteksi begitu muncul di DOM, bukan nebak waktu.
- Tambah `buat.js rute /nama-rute` — generator interaktif untuk rute halaman baru.
- Rute yang tidak ditemukan (404) tidak lagi membuat aplikasi crash.
- Path fetch di `sistem/kelola.js` dibuat konsisten (absolut dari root).
- Circular import antara `app.js` dan `script.js` dihilangkan (`runDOM` dipindah ke `sistem/util.js`).
- Folder `assets/` diganti nama jadi `media/`.

### v1.0.4
- Rilis awal scaffold tool ARKAJS.

Lihat [Releases](../../releases) untuk detail lengkap tiap versi.

## Catatan penting

Project ini menggunakan `history.pushState` untuk routing, sehingga saat di-deploy ke hosting statis (misalnya Cloudflare Pages, Netlify, Vercel), pastikan hosting tersebut mendukung **SPA fallback** (semua path tanpa file fisik tetap mengarah ke `index.html`). Beberapa hosting seperti Cloudflare Pages sudah mendukung ini secara otomatis.

## Lisensi

MIT
