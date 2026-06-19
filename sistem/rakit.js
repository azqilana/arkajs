
export class Rakit {
  ambilHasil(hasil){
    this.pasangJudul(hasil.judul)
    this.pasangHeader(hasil.header)
    this.pasangCss(hasil.css)
    this.pasangMain(hasil.main)
  }
  pasangJudul(judul){
    document.title=judul
  }
  pasangHeader(header){
    const Header=this.selectEl("#header")
    Header.innerHTML=header
  }
  pasangMain(main){
    const Main =this.selectEl("#main")
    Main.innerHTML=main
  }
  pasangCss(css){
    const Css=this.selectEl("#gaya")
    Css.innerHTML=css
  }
  selectEl(selector){
    return document.querySelector(selector)
  }
}