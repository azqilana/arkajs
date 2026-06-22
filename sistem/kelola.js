export default class kelolaRute {
  async cekIsiDataRute() {
    try {
      const response = await fetch("/konfigurasi/rute.json");
      const dataRute = await response.json();
      return dataRute;
    } catch (error) {
      console.log("Error:", error);
      return null;
    }
  }
  async cekRute(rute) {
    if (!rute) return null;

    const dataIsiRute = await this.cekIsiDataRute();
    if (!dataIsiRute || !dataIsiRute[rute]) {
      return null;
    }

    const dIR = dataIsiRute[rute];
    const resMain = await fetch(`/halaman/${dIR.main}`);
    const resHeader = await fetch(`/rancangan/${dIR.header}`);
    const resCss = await fetch(`/gaya/${dIR.css}`);
    const isiHeader = await resHeader.text();
    const isiMain = await resMain.text();
    const isiCss = await resCss.text();

    return {
      judul: dIR.judul,
      css: isiCss,
      header: isiHeader,
      main: isiMain
    };
  }
  async cekStatis() {
    try {
      const resNavbar = await fetch("/rancangan/navbar.html");
      const resSidebar = await fetch("/rancangan/sidebar.html");
      const resFooter = await fetch("/rancangan/footer.html");
      const navbar = await resNavbar.text();
      const sidebar = await resSidebar.text();
      const footer = await resFooter.text();
      return { navbar, sidebar, footer };
    } catch (error) {
      console.log("Error:", error);
      return null;
    }
  }
}
