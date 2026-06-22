import { runDOM } from "../sistem/util.js"

runDOM('#btn-copy', (el) => {
  const teksAsli = el.textContent
  el.addEventListener('click', async () => {
    const command = el.getAttribute('data-command')
    try {
      await navigator.clipboard.writeText(command)
      el.textContent = '✅ Tersalin!'
    } catch {
      el.textContent = '⚠️ Gagal menyalin'
    }
    setTimeout(() => { el.textContent = teksAsli }, 1800)
  })
})
