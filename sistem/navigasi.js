import kelolaRute from "./kelola.js";
import {Rakit} from "./rakit.js"

const kR = new kelolaRute();
const R= new Rakit();

export default class kelolaNavigasi {
  statisDimuat = false
  async muatStatis(){
    if(this.statisDimuat) return
    const statis = await kR.cekStatis()
    if(statis) R.ambilStatis(statis)
    this.statisDimuat = true
  }
 async kelolaKlik(e){
    const el = e.target.closest("a");
  const w_origin = window.location.origin;
  if ( el &&el.hasAttribute("href") &&
    el.getAttribute("href") &&
    el.origin === w_origin) {
    const hrefnya = el.getAttribute("href");
    e.preventDefault();
    history.pushState(null, "", hrefnya);
    await this.hasilCekRute(hrefnya)
    }
  }
 async kelolaW(){
    await this.muatStatis()
    const hrefnya = window.location.pathname + window.location.hash
    await this.hasilCekRute(hrefnya)
  }
  async hasilCekRute(rute){
    const [pathnya, hashnya] = rute.split("#")
    const hasilRute = await kR.cekRute(pathnya)
    if (hasilRute) {
      R.ambilHasil(hasilRute)
      if (hashnya) {
        requestAnimationFrame(() => {
          document.getElementById(hashnya)?.scrollIntoView({ behavior: "smooth" })
        })
      }
    } else {
      R.tampilkan404(rute)
    }
  }
  
}
