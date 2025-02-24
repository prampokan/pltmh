import Header from "@/components/header";
import Kelistrikan from "../components/kelistrikan";

export default function RealtimeSensors() {
  return (
    <main>
      <Header
        head="Realtime Sensors"
        body="Selamat datang di Website Sistem Monitoring dan Prediksi PLTMH Kincang, Banjarnegara. Selamat Bekerja!"
      />
      <div className="grid grid-cols-5 gap-4">
        <Kelistrikan />
      </div>
    </main>
  );
}
