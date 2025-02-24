import Header from "@/components/header";
import HomePage from "./components/home";

export default function Home() {
  return (
    <main>
      <Header
        head="Sistem Monitoring PLTMH"
        body="Selamat datang di Website Sistem Monitoring dan Prediksi PLTMH Kincang, Banjarnegara. Selamat Bekerja!"
      />
      <HomePage />
    </main>
  );
}
