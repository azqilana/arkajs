import kelolaRute from "./kelola.js";
import {Rakit} from "./rakit.js"

const kR = new kelolaRute();
const R= new Rakit();

export default class kelolaNavigasi {
 async kelolaKlik(e){
    const el = e.target.closest("a");
  const w_origin = window.location.origin;
  if ( el &&el.hasAttribute("href") &&
    el.getAttribute("href") &&
    el.origin === w_origin) {
    const hrefnya = el.getAttribute("href");
    e.preventDefault();
    history.pushState(null, "", hrefnya);
    const hasil=await this.hasilCekRute(hrefnya)
    }
  }
 async kelolaW(){
    const hrefnya = window.location.pathname
    const hasil=await this.hasilCekRute(hrefnya)
  }
  async hasilCekRute(rute){
    const hasilRute = await kR.cekRute(rute)
    R.ambilHasil(hasilRute)
  }
  
}