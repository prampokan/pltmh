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
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <Hidrometri
            title="Hidrometri 1"
            deviceId="icAiGJGWb6tLbwYCsCei"
            cmdId="10"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Hidrometri
            title="Hidrometri 2"
            deviceId="x5IuCisDQZolEVkOmaJW"
            cmdId="20"
          />
        </div>
        <div className="col-span-2">
          <Kelistrikan />
        </div>
      </div>
    </main>
  );
}
