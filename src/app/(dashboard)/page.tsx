import Header from "@/components/header";
import Kelistrikan from "./components/kelistrikan";
import Hidrometri1 from "./components/hidrometri1";
import Hidrometri2 from "./components/hidrometri2";
import { Chart } from "./components/chart";

export default function Home() {
  return (
    <main>
      <Header
        head="Sistem Monitoring PLTMH"
        body="Selamat datang di Website Sistem Monitoring dan Prediksi PLTMH Kincang, Banjarnegara. Selamat Bekerja!"
      />
      <div className="grid grid-cols-5 gap-4">
        <div className="rounded-md col-span-5 md:col-span-3">
          <Kelistrikan />
        </div>
        <div className="rounded-md col-span-5 md:col-span-2">
          <Hidrometri1 />
        </div>
        <div className="rounded-md col-span-5 md:col-span-2">
          <Hidrometri2 />
        </div>
        <div className="rounded-md col-span-5 md:col-span-3">
          <Chart />
        </div>
      </div>
    </main>
  );
}
