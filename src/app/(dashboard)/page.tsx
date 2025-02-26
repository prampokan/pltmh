import Header from "@/components/header";
import HomePage from "./components/home";
import RevenuePrediction from "./components/revenue-prediction";
import ElectricityProduction from "./components/electricity-production";
import Location from "./components/location";

export default function Home() {
  return (
    <main>
      <Header
        head="Sistem Monitoring PLTMH"
        body="Selamat datang di Website Sistem Monitoring dan Prediksi PLTMH Kincang, Banjarnegara. Selamat Bekerja!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <ElectricityProduction />
        <RevenuePrediction />
        <Location />
        <HomePage />
      </div>
    </main>
  );
}
