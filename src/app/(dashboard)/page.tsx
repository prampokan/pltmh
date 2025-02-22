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
      <div className="grid grid-cols-5 grid-rows-4 gap-4">
        <Hidrometri />
        <Kelistrikan />
      </div>
    </main>
  );
}
