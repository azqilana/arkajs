const h1=document.querySelector('h1')
h1.addEventListener('click',(e)=>{
  e.stopPropagation();
  h1.textContent='Header Nya kan ini'
  })