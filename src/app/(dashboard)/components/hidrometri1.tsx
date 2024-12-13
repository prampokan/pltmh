"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", tinggi: 186, debit: 80 },
  { month: "February", tinggi: 305, debit: 200 },
  { month: "March", tinggi: 237, debit: 120 },
  { month: "April", tinggi: 73, debit: 190 },
  { month: "May", tinggi: 209, debit: 130 },
  { month: "June", tinggi: 214, debit: 140 },
];
const chartConfig = {
  tinggi: {
    label: "Tinggi Sungai",
    color: "hsl(var(--chart-1))",
  },
  debit: {
    label: "Debit Air",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Hidrometri1() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Hidrometri 1</CardTitle>
          <CardDescription>Tinggi Sungai & Debit Air</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig}>
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
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
