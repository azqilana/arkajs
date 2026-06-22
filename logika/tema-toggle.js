import { runDOM } from "../sistem/util.js"

function pakaiTema(tema) {
  document.documentElement.setAttribute('data-tema', tema)
  localStorage.setItem('arkajs-tema', tema)
}

const temaTersimpan = localStorage.getItem('arkajs-tema')
if (temaTersimpan) {
  document.documentElement.setAttribute('data-tema', temaTersimpan)
}

runDOM('#tema-toggle', (el) => {
  el.textContent = document.documentElement.getAttribute('data-tema') === 'gelap' ? '☀️' : '🌙'
  el.addEventListener('click', () => {
    const sekarang = document.documentElement.getAttribute('data-tema') === 'gelap' ? 'terang' : 'gelap'
    pakaiTema(sekarang)
    el.textContent = sekarang === 'gelap' ? '☀️' : '🌙'
  })
})
