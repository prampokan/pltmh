"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { LatestTelemetryPowermeter } from "@/service";
import { formatNumber } from "@/service/helper";

export default function ElectricityProduction() {
  const dataPowermeter = LatestTelemetryPowermeter();
  const [period, setPeriod] = useState(1);

  let activePower = dataPowermeter?.Value12?.[0]?.[1] ?? 0;

  let activePowetByPeriod = (activePower / 10) * period;

  return (
    <div className="w-full border rounded-lg col-span-1">
      <div className="border-b p-4 flex justify-between">
        <div>
          <h1 className="font-bold">Electricity Production</h1>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <Select onValueChange={(value) => setPeriod(Number(value))}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Pilih Periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24">Per Hari</SelectItem>
            <SelectItem value="720">Per Bulan</SelectItem>
            <SelectItem value="8760">Per Tahun</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4 flex items-center justify-center h-64">
        <h1 className="font-bold text-xl">
          {formatNumber(activePowetByPeriod)}{" "}
          <span className="text-sm font-light">kW</span>
        </h1>
      </div>
    </div>
  );
}
