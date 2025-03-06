"use client";

import { useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  LSTM: {
    label: "LSTM",
    color: "#2563eb",
  },
  GRU: {
    label: "GRU",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function Prediction() {
  const [prediction, setPrediction] = useState<{
    lstm_predictions: number[];
    gru_predictions: number[];
  }>({
    lstm_predictions: [],
    gru_predictions: [],
  });

  const data = [
    211, 228, 234, 241, 247, 254, 260, 253, 247, 241, 211, 228, 234, 241, 247,
    254, 260, 253, 247, 241, 211, 228, 234, 241, 247, 254, 260, 253, 247, 241,
    211, 228, 234, 241, 247, 254, 260, 253, 247, 241, 211, 228, 234, 241, 247,
    254, 260, 253, 247, 241, 211, 228, 234, 241, 247, 254, 260, 253, 247, 241,
  ];

  const getPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Prediction result:", result);
      setPrediction(result);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  useEffect(() => {
    getPrediction();
  }, []);

  const minutes = ["m 1", "m 2", "m 3", "m 4", "m 5", "m 6", "m 7"];

  const chartData = minutes.map((minute, index) => ({
    minute,
    LSTM: Math.round(prediction.lstm_predictions[index] || 0),
    GRU: Math.round(prediction.gru_predictions[index] || 0),
  }));

  return (
    <div className="w-full border rounded-lg col-span-1">
      <div className="border-b p-4">
        <h1 className="font-bold">Prediksi kWh</h1>
        <p className="text-sm text-muted-foreground">
          Prediksi Metode LSTM dan GRU.
        </p>
      </div>
      <div className="flex items-center justify-center h-64 overflow-hidden p-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
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
              dataKey="minute"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="LSTM"
              type="monotone"
              stroke="var(--color-LSTM)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="GRU"
              type="monotone"
              stroke="var(--color-GRU)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
