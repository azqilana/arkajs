import kelolaNavigasi from "./navigasi.js"

const kelNav=new kelolaNavigasi();

window.addEventListener('DOMContentLoaded',async ()=> kelNav.kelolaW())
document.addEventListener('click', async (e)=> await kelNav.kelolaKlik(e))
window.addEventListener('popstate',async ()=>kelNav.kelolaW())
console.log(window.location.pathname)
