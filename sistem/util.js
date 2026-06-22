export function runDOM(element, fungsi, timeoutMs = 10000) {
  // dukung satu selector ('h1') atau banyak selector sekaligus (['h1', '.btn'])
  const daftarSelector = Array.isArray(element) ? element : [element]
  // simpan elemen yang sudah pernah dipasang listener, biar tidak dobel
  const sudahDipasang = new WeakSet()

  function cekDanJalankan(selector) {
    const el = document.querySelector(selector)
    if (el && !sudahDipasang.has(el)) {
      sudahDipasang.add(el)
      fungsi(el, selector)
    }
  }

  function cekSemua() {
    for (const selector of daftarSelector) {
      cekDanJalankan(selector)
    }
  }

  // cek dulu, mungkin sebagian/semua elemennya sudah ada
  cekSemua()

  // pantau perubahan DOM selamanya, karena di SPA elemen bisa di-render ulang
  // (misal ganti rute/halaman) dan butuh listener baru dipasang lagi
  const observer = new MutationObserver(cekSemua)
  observer.observe(document.body, { childList: true, subtree: true })

  // pengaman: kalau di percobaan pertama belum ada satupun yang ketemu
  // sama sekali dalam batas waktu, beri tahu lewat console (observer tetap lanjut)
  setTimeout(() => {
    const adaYangKetemu = daftarSelector.some((s) => document.querySelector(s))
    if (!adaYangKetemu) {
      console.log(`Element ${daftarSelector.join(", ")} Not Found`)
    }
  }, timeoutMs)
}
