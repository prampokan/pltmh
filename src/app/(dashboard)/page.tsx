import Header from "@/components/header";
import Kelistrikan from "./components/kelistrikan";
import Hidrometri from "./components/hidrometri";

export default function Home() {
  return (
    <main>
      <Header
        head="Sistem Monitoring PLTMH"
        body="Selamat datang di Website Sistem Monitoring dan Prediksi PLTMH Kincang, Banjarnegara. Selamat Bekerja!"
      />
      <div className="grid grid-cols-1 gap-4">
        <div className="">
          <Hidrometri />
        </div>
        <div className="">
          <Kelistrikan />
        </div>
      </div>
    </main>
  );
}
