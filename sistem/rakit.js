
export class Rakit {
  constructor(){
    this.navbarHtml = "";
    this.statisDipasang = false;
  }
  ambilHasil(hasil){
    this.pasangJudul(hasil.judul)
    this.pasangHeader(hasil.header)
    this.pasangCss(hasil.css)
    this.pasangMain(hasil.main)
  }
  ambilStatis(statis){
    this.navbarHtml = statis.navbar || "";
    if(!this.statisDipasang){
      this.pasangSidebar(statis.sidebar)
      this.pasangFooter(statis.footer)
      this.statisDipasang = true
    }
  }
  tampilkan404(rute){
    document.title = "404 - Halaman Tidak Ditemukan"
    const Main = this.selectEl("#main")
    if (Main) {
      Main.innerHTML = `<section class="not-found"><h1>404</h1><p>Halaman "${rute}" tidak ditemukan.</p></section>`
    }
  }
  pasangJudul(judul){
    document.title=judul
  }
  pasangHeader(header){
    const Header=this.selectEl("#header")
    Header.innerHTML=header
    if(this.navbarHtml){
      const target = Header.querySelector(".header__inner") || Header
      target.insertAdjacentHTML("beforeend", this.navbarHtml)
    }
  }
  pasangMain(main){
    const Main =this.selectEl("#main")
    Main.innerHTML=main
  }
  pasangCss(css){
    const Css=this.selectEl("#gaya")
    Css.innerHTML=css
  }
  pasangSidebar(sidebar){
    if(!sidebar) return
    const Main=this.selectEl("#main")
    Main.insertAdjacentHTML("afterend", sidebar)
  }
  pasangFooter(footer){
    if(!footer) return
    document.body.insertAdjacentHTML("beforeend", footer)
  }
  selectEl(selector){
    return document.querySelector(selector)
  }
}
