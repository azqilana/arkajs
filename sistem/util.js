export function runDOM(element, fungsi, timeoutMs = 10000) {
  // dukung satu selector ('h1') atau banyak selector sekaligus (['h1', '.btn'])
  const daftarSelector = Array.isArray(element) ? element : [element]
  const belumKetemu = new Set(daftarSelector)

  function cekDanJalankan(selector) {
    const el = document.querySelector(selector)
    if (el) {
      belumKetemu.delete(selector)
      fungsi(el, selector)
    }
  }

  // cek dulu, mungkin sebagian/semua elemennya sudah ada
  for (const selector of daftarSelector) {
    cekDanJalankan(selector)
  }
  if (belumKetemu.size === 0) return

  // kalau masih ada yang belum ketemu, pantau perubahan DOM
  const observer = new MutationObserver(() => {
    for (const selector of [...belumKetemu]) {
      cekDanJalankan(selector)
    }
    if (belumKetemu.size === 0) {
      observer.disconnect()
      clearTimeout(pengaman)
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })

  // pengaman: kalau ada elemen yang memang tidak pernah muncul, jangan pantau selamanya
  const pengaman = setTimeout(() => {
    observer.disconnect()
    if (belumKetemu.size > 0) {
      console.log(`Element ${[...belumKetemu].join(", ")} Not Found`)
    }
  }, timeoutMs)
}
