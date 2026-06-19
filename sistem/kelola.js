export default class kelolaRute {
  async cekIsiDataRute() {
    try {
      const response = await fetch("sistem/rute.json");
      const dataRute = await response.json();
      return dataRute;
    } catch (error) {
      console.log("Error:", error);
    }
  }
  async cekRute(rute) {
    if (rute) {
      const dataIsiRute = await this.cekIsiDataRute();
      if (dataIsiRute[rute]) {
        const dIR=dataIsiRute[rute];
        const resMain = await fetch(`./halaman/${dIR.main}`);
        const resHeader = await fetch(`./rancangan/${dIR.header}`);
        const resCss = await fetch(`./gaya/${dIR.css}`);
        const isiHeader = await resHeader.text();
        const isiMain=await resMain.text()
        const isiCss= await resCss.text()
        const isiRute={
          judul:dIR.judul,
          css: isiCss,
          header: isiHeader,
          main: isiMain
        }
        return isiRute;
      }
    }
  }
}
