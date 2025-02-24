"use client";

import Header from "@/components/header";
import RealtimeCard from "@/components/realtime-card";
import { LatestTelemetry } from "@/service";

export default function RealtimeSensors() {
  const dataHidrometri = LatestTelemetry(
    "50826780-ec35-11ef-9389-77a321a8daf2",
    20
  );
  const dataPowermeter = LatestTelemetry(
    "e2d1b230-ec35-11ef-9389-77a321a8daf2",
    10
  );
  return (
    <main>
      <Header
        head="Realtime Sensors"
        body="Selamat datang di Website Sistem Monitoring dan Prediksi PLTMH Kincang, Banjarnegara. Selamat Bekerja!"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {dataHidrometri &&
          dataHidrometri.waterLevel &&
          dataHidrometri.waterLevel[0] &&
          dataHidrometri.waterLevel[0][1] && (
            <RealtimeCard
              title="Water Level"
              value={dataHidrometri.waterLevel[0][1] / 1000}
              unit="m"
            />
          )}
        {dataHidrometri &&
          dataHidrometri.VelocityofFlow &&
          dataHidrometri.VelocityofFlow[0] &&
          dataHidrometri.VelocityofFlow[0][1] && (
            <RealtimeCard
              title="Velocity of Flow"
              value={dataHidrometri.VelocityofFlow[0][1] / 1000}
              unit="m/s"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value12 &&
          dataPowermeter.Value12[0] &&
          dataPowermeter.Value12[0][1] && (
            <RealtimeCard
              title="Active Power"
              value={dataPowermeter.Value12[0][1] / 10}
              unit="kW"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value14 &&
          dataPowermeter.Value14[0] &&
          dataPowermeter.Value14[0][1] && (
            <RealtimeCard
              title="Power Factor"
              value={dataPowermeter.Value14[0][1] / 1000}
              unit="PF"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value28 &&
          dataPowermeter.Value28[0] &&
          dataPowermeter.Value28[0][1] && (
            <RealtimeCard
              title="Reactive Power"
              value={dataPowermeter.Value28[0][1] / 1000}
              unit="kVAR"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value15 &&
          dataPowermeter.Value15[0] &&
          dataPowermeter.Value15[0][1] && (
            <RealtimeCard
              title="Frequency"
              value={dataPowermeter.Value12[0][1] / 100}
              unit="Hz"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value20 &&
          dataPowermeter.Value20[0] &&
          dataPowermeter.Value20[0][1] && (
            <RealtimeCard
              title="Speed Turbin"
              value={dataPowermeter.Value20[0][1] / 10}
              unit="RPM"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value21 &&
          dataPowermeter.Value21[0] &&
          dataPowermeter.Value21[0][1] && (
            <RealtimeCard
              title="Voltage Phase R"
              value={dataPowermeter.Value21[0][1] / 1000}
              unit="V"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value22 &&
          dataPowermeter.Value22[0] &&
          dataPowermeter.Value22[0][1] && (
            <RealtimeCard
              title="Voltage Phase S"
              value={dataPowermeter.Value22[0][1] / 1000}
              unit="V"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value23 &&
          dataPowermeter.Value23[0] &&
          dataPowermeter.Value23[0][1] && (
            <RealtimeCard
              title="Voltage Phase T"
              value={dataPowermeter.Value21[0][1] / 1000}
              unit="V"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value24 &&
          dataPowermeter.Value24[0] &&
          dataPowermeter.Value24[0][1] && (
            <RealtimeCard
              title="Current Phase R"
              value={dataPowermeter.Value24[0][1] / 1000}
              unit="A"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value25 &&
          dataPowermeter.Value25[0] &&
          dataPowermeter.Value25[0][1] && (
            <RealtimeCard
              title="Current Phase S"
              value={dataPowermeter.Value25[0][1] / 1000}
              unit="A"
            />
          )}
        {dataPowermeter &&
          dataPowermeter.Value26 &&
          dataPowermeter.Value26[0] &&
          dataPowermeter.Value26[0][1] && (
            <RealtimeCard
              title="Current Phase T"
              value={dataPowermeter.Value26[0][1] / 1000}
              unit="A"
            />
          )}
      </div>
    </main>
  );
}
