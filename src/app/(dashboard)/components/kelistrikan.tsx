"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { LatestTelemetry } from "@/service";

export default function Kelistrikan() {
  const data = LatestTelemetry("e2d1b230-ec35-11ef-9389-77a321a8daf2", 10);

  return (
    <Card className="h-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Kelistrikan PLTMH</CardTitle>
          <CardDescription>
            Putaran Turbin, Buka tutup Valve Turbin, Daya, Tegangan & Arus
            Luaran
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-center">
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {data && data.Value20 && data.Value20[0] && data.Value20[0][1] && (
          <p>Putaran Turbin : {data.Value20[0][1]}</p>
        )}
        {/* <Image src="/pltmh.png" alt="pltmh" width={1000} height={1000} /> */}
      </CardContent>
    </Card>
  );
}
