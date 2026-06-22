import { runDOM } from "../sistem/util.js"

const baris = [
  { teks: 'npx create-arkajs toko-online', prompt: true },
  { teks: 'Membuat project ARKAJS di: ./toko-online' },
  { teks: '✔ halaman/beranda.html' },
  { teks: '✔ rancangan/header.html' },
  { teks: '✔ gaya/gaya.css' },
  { teks: '✔ sistem/rute.json' },
  { teks: 'Selesai! Project ARKAJS sudah siap dipakai.' }
]

runDOM('#terminal-body', (el) => {
  let sudahJalan = false
  const jalankan = () => {
    if (sudahJalan) return
    sudahJalan = true
    el.innerHTML = ''
    baris.forEach((b, i) => {
      const p = document.createElement('p')
      p.className = 'terminal__line'
      p.style.animationDelay = `${i * 0.45}s`
      p.innerHTML = b.prompt
        ? `<span class="terminal__prompt">$</span> ${b.teks}`
        : b.teks
      el.appendChild(p)
    })
    const kursor = document.createElement('span')
    kursor.className = 'terminal__cursor'
    kursor.style.animationDelay = `${baris.length * 0.45}s`
    el.appendChild(kursor)
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) jalankan() })
    })
    obs.observe(el)
  } else {
    jalankan()
  }
})
