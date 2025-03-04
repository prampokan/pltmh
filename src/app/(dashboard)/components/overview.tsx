import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Overview({
  dataPowermeter,
  dataHidrometri,
}: {
  dataPowermeter: any;
  dataHidrometri: any;
}) {
  return (
    <Card className="col-span-1 lg:col-span-2 xl:col-span-3">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 xl:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Overview</CardTitle>
          <CardDescription>PLTMH Monitoring System</CardDescription>
        </div>
        <div className="flex flex-col lg:flex-row border-t xl:border-0">
          <div className="flex w-full">
            <div className="flex flex-1 flex-col justify-center gap-1 border-l px-6 py-4 sm:px-8">
              <span className="text-xs text-muted-foreground">
                Tinggi Sungai
              </span>
              {dataHidrometri &&
                dataHidrometri.waterLevel &&
                dataHidrometri.waterLevel[0] &&
                dataHidrometri.waterLevel[0][1] && (
                  <span className="text-lg font-bold leading-none sm:text-xl">
                    <h1 className="flex items-center gap-1">
                      {dataHidrometri.waterLevel[0][1] / 1000}
                      <span className="text-xs font-thin">m</span>
                    </h1>
                  </span>
                )}
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 border-l px-6 py-4 sm:px-8">
              <span className="text-xs text-muted-foreground">
                Kecepatan Aliran
              </span>
              {dataHidrometri &&
                dataHidrometri.VelocityofFlow &&
                dataHidrometri.VelocityofFlow[0] &&
                dataHidrometri.VelocityofFlow[0][1] && (
                  <span className="text-lg font-bold leading-none sm:text-xl">
                    <h1 className="flex items-center gap-1">
                      {dataHidrometri.VelocityofFlow[0][1] / 1000}
                      <span className="text-xs font-thin">m/s</span>
                    </h1>
                  </span>
                )}
            </div>
          </div>
          <div className="flex w-full border-t lg:border-0">
            <div className="flex flex-1 flex-col justify-center gap-1 border-l px-6 py-4 sm:px-8">
              <span className="text-xs text-muted-foreground">
                Daya Listrik
              </span>
              {dataPowermeter &&
                dataPowermeter.Value12 &&
                dataPowermeter.Value12[0] &&
                dataPowermeter.Value12[0][1] && (
                  <span className="text-lg font-bold leading-none sm:text-xl">
                    <h1 className="flex items-center gap-1">
                      {dataPowermeter.Value12[0][1] / 10}
                      <span className="text-xs font-thin">kW</span>
                    </h1>
                  </span>
                )}
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 border-l px-6 py-4 sm:px-8">
              <span className="text-xs text-muted-foreground">
                Speed Turbin
              </span>
              {dataPowermeter &&
                dataPowermeter.Value20 &&
                dataPowermeter.Value20[0] &&
                dataPowermeter.Value20[0][1] && (
                  <span className="text-lg font-bold leading-none sm:text-xl">
                    <h1 className="flex items-center gap-1">
                      {dataPowermeter.Value20[0][1] / 10}
                      <span className="text-xs font-thin">RPM</span>
                    </h1>
                  </span>
                )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <Image
          src="/pltmh3.png"
          alt="image"
          width={1500}
          height={1500}
          className="w-full h-full"
        />
      </CardContent>
    </Card>
  );
}
