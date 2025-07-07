"use client";

import { Area, AreaChart } from "recharts";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CardsStatsParams {
  label: string;
  description: string;
  values: number[];
}

export function Metric({
  cardsStatsParams,
}: {
  cardsStatsParams: CardsStatsParams;
}) {
  const data = cardsStatsParams.values.map((value, index) => ({
    index: index,
    value,
  }));

  const chartConfig = {
    value: {
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  const delta =
    cardsStatsParams.values[cardsStatsParams.values.length - 1] -
    cardsStatsParams.values[cardsStatsParams.values.length - 2];

  return (
    <Card
      className={`pb-0 overflow-auto bg-gradient-to-t from-primary/5 ${
        delta < 0 ? "to-red-100" : "to-green-100"
      }`}
    >
      <CardHeader>
        <CardDescription className="text-">
          {cardsStatsParams.label}
        </CardDescription>
        <CardTitle className="text-3xl">
          {cardsStatsParams.values[cardsStatsParams.values.length - 1]}
        </CardTitle>
        <CardDescription>{cardsStatsParams.description}</CardDescription>
        <CardAction>
          {delta > 0 ? (
            <TrendingUp size={40} color="green" />
          ) : (
            <TrendingDown size={40} color="red" />
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="mt-auto max-h-[100px] flex-1 p-0">
        <ChartContainer config={chartConfig} className="size-full">
          <AreaChart
            data={data}
            margin={{
              left: 0,
              right: 0,
            }}
            style={{ pointerEvents: "none" }}
          >
            <Area
              dataKey="value"
              fillOpacity={0.1}
              fill="var(--color-value)"
              stroke="var(--color-value)"
              strokeWidth={2}
              type="monotone"
              animationDuration={0}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
