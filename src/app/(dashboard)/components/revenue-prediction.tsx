"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/service/helper";
import { useState } from "react";

export default function RevenuePrediction({
  dataPowermeter,
}: {
  dataPowermeter: any;
}) {
  const [period, setPeriod] = useState(1);

  let activePower = dataPowermeter?.Value27?.[0]?.[1] ?? 0;

  let revenuePrediction = (activePower / 10) * 600 * period;

  return (
    <div className="w-full border rounded-lg col-span-1">
      <div className="border-b p-4 flex justify-between">
        <div>
          <h1 className="font-bold">Revenue Prediction</h1>
          <p className="text-sm text-muted-foreground">Prediksi Omset PLTMH.</p>
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
        <h1 className="font-bold text-2xl tracking-tight">
          {formatCurrency(revenuePrediction)}
        </h1>
      </div>
    </div>
  );
}
