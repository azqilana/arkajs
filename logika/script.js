import {runDOM} from "../sistem/util.js"

runDOM('h1',(el)=>{
  el.addEventListener('click',()=>{
  el.textContent='Header Nya kan ini'
  })
})