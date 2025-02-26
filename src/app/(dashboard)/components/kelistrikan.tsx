"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LatestTelemetryPowermeter } from "@/service";

export default function Kelistrikan() {
  const data = LatestTelemetryPowermeter();

  return (
    <>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Active Power</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value12 && data.Value12[0] && data.Value12[0][1] && (
            <>
              <h1 className="text-4xl font-bold">{data.Value12[0][1] / 10}</h1>
              <span className="font-semibold">Kw</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Power Factor</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value14 && data.Value14[0] && data.Value14[0][1] && (
            <>
              <h1 className="text-4xl font-bold">
                {data.Value14[0][1] / 1000}
              </h1>
              <span className="font-semibold">PF</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Reactive Power</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value28 && data.Value28[0] && data.Value28[0][1] && (
            <>
              <h1 className="text-4xl font-bold">
                {data.Value28[0][1] / 1000}
              </h1>
              <span className="font-semibold">kVAR</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Frequency</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value15 && data.Value15[0] && data.Value15[0][1] && (
            <>
              <h1 className="text-4xl font-bold">{data.Value15[0][1] / 100}</h1>
              <span className="font-semibold">Hz</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Speed Turbin</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value20 && data.Value20[0] && data.Value20[0][1] && (
            <>
              <h1 className="text-4xl font-bold">{data.Value20[0][1] / 10}</h1>
              <span className="font-semibold">rpm</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Voltage Phase R</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value21 && data.Value21[0] && data.Value21[0][1] && (
            <>
              <h1 className="text-4xl font-bold">
                {data.Value21[0][1] / 1000}
              </h1>
              <span className="font-semibold">V</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Voltage Phase S</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value22 && data.Value22[0] && data.Value22[0][1] && (
            <>
              <h1 className="text-4xl font-bold">
                {data.Value22[0][1] / 1000}
              </h1>
              <span className="font-semibold">V</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Voltage Phase T</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value23 && data.Value23[0] && data.Value23[0][1] && (
            <>
              <h1 className="text-4xl font-bold">
                {data.Value23[0][1] / 1000}
              </h1>
              <span className="font-semibold">V</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Current Phase R</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value24 && data.Value24[0] && data.Value24[0][1] && (
            <>
              <h1 className="text-4xl font-bold">
                {data.Value24[0][1] / 1000}
              </h1>
              <span className="font-semibold">A</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Current Phase S</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value25 && data.Value25[0] && data.Value25[0][1] && (
            <>
              <h1 className="text-4xl font-bold">
                {data.Value25[0][1] / 1000}
              </h1>
              <span className="font-semibold">A</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Current Phase T</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-end">
          {data && data.Value26 && data.Value26[0] && data.Value26[0][1] && (
            <>
              <h1 className="text-4xl font-bold">
                {data.Value26[0][1] / 1000}
              </h1>
              <span className="font-semibold">A</span>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
