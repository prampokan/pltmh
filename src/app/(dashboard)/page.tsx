"use client";

import Header from "@/components/header";
import Overview from "./components/overview";
import RevenuePrediction from "./components/revenue-prediction";
import ElectricityProduction from "./components/electricity-production";
import Location from "./components/location";
import {
  LatestTelemetryHidrometri,
  LatestTelemetryPowermeter,
} from "@/service";
import Prediction from "./components/prediction";

export default function Home() {
  const dataPowermeter = LatestTelemetryPowermeter();
  const dataHidrometri = LatestTelemetryHidrometri();
  return (
    <main>
      <Header
        head="Sistem Monitoring PLTMH"
        body="Selamat datang di Website Sistem Monitoring dan Prediksi PLTMH Kincang, Banjarnegara. Selamat Bekerja!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <ElectricityProduction dataPowermeter={dataPowermeter} />
        <RevenuePrediction dataPowermeter={dataPowermeter} />
        <Prediction />
        <Location />
        <Overview
          dataPowermeter={dataPowermeter}
          dataHidrometri={dataHidrometri}
        />
      </div>
    </main>
  );
}
