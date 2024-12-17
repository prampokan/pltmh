"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LatestTelemetry } from "@/service";

const chartConfig = {
  tinggi: {
    label: "Tinggi Sungai",
    color: "#2563eb",
  },
  debit: {
    label: "Debit Air",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function Hidrometri() {
  const data = LatestTelemetry("6084a3b0-bb83-11ef-8a8c-99b651c1f145", 20);

  const chartData = [
    { month: "January", tinggi: 186, debit: 80 },
    { month: "February", tinggi: 305, debit: 200 },
    { month: "March", tinggi: 237, debit: 120 },
    { month: "April", tinggi: 73, debit: 190 },
    { month: "May", tinggi: 209, debit: 130 },
    { month: "June", tinggi: 214, debit: 140 },
  ];

  // const chartData = data.map((entry, index) => ({
  //   month: `Month ${index + 1}`,
  //   tinggi: entry.suhu ? entry.suhu[0][1] : 0,
  //   debit: entry.temperature ? entry.temperature[0][1] : 0,
  // }));

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Hidrometri</CardTitle>
          <CardDescription>Tinggi Sungai & Debit Air</CardDescription>
        </div>

        <div className="flex">
          {data &&
            data.waterLevel &&
            data.waterLevel[0] &&
            data.waterLevel[0][1] && (
              <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8">
                <span className="text-xs text-muted-foreground">
                  Tinggi Sungai
                </span>
                <span className="text-lg font-bold leading-none sm:text-xl">
                  <h1 className="flex items-center gap-1">
                    {data.waterLevel[0][1] / 1000}
                    <span className="text-xs font-thin">m</span>
                  </h1>
                </span>
              </div>
            )}

          {data &&
            data.smallInstataneous &&
            data.smallInstataneous[0] &&
            data.smallInstataneous[0][1] && (
              <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8">
                <span className="text-xs text-muted-foreground">Debit Air</span>
                <span className="text-lg font-bold leading-none sm:text-xl">
                  <h1 className="flex items-center gap-1">
                    {data.smallInstataneous[0][1] / 1000}
                    <span className="text-xs font-thin">m³/s</span>
                  </h1>
                </span>
              </div>
            )}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="tinggi"
              type="monotone"
              stroke="var(--color-tinggi)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="debit"
              type="monotone"
              stroke="var(--color-debit)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
