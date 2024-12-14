import Header from "@/components/header";
import Kelistrikan from "./components/kelistrikan";
import Hidrometri1 from "./components/hidrometri1";
import Hidrometri2 from "./components/hidrometri2";

export default function Home() {
  return (
    <main>
      <Header
        head="Sistem Monitoring PLTMH"
        body="Selamat datang di Website Sistem Monitoring dan Prediksi PLTMH Kincang, Banjarnegara. Selamat Bekerja!"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <Hidrometri1 />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Hidrometri2 />
        </div>
        <div className="col-span-2">
          <Kelistrikan />
        </div>
      </div>
    </main>
  );
}
