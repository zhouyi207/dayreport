"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ChartAreaInteractiveParams } from "@/data/chartArea";

export function ChartAreaInteractive({
  chartAreaInteractiveParams,
}: {
  chartAreaInteractiveParams: ChartAreaInteractiveParams;
}) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartAreaInteractiveParams.data.filter((item) => {
    const date = new Date(item.date);

    const referenceDate = new Date(
      chartAreaInteractiveParams.data[
        chartAreaInteractiveParams.data.length - 1
      ].date
    );

    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const lastDate = new Date(referenceDate);
    lastDate.setDate(lastDate.getDate() - daysToSubtract);
    return date >= lastDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{chartAreaInteractiveParams.title}</CardTitle>
          <CardDescription>
            {chartAreaInteractiveParams.description}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex">
            <SelectValue placeholder="过去90天" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              过去90天
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              过去30天
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              过去7天
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartAreaInteractiveParams.chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {Object.keys(chartAreaInteractiveParams.chartConfig).map(
                (item, index) => {
                  return (
                    <linearGradient
                      key={item}
                      id={`fill${item}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={`var(--chart-${index + 1})`}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={`var(--chart-${index + 1})`}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  );
                }
              )}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {Object.keys(chartAreaInteractiveParams.chartConfig).map(
              (item, index) => {
                return (
                  <Area
                    key={item}
                    dataKey={item}
                    type="natural"
                    fill={`url(#fill${item})`}
                    stroke={`var(--chart-${index + 1})`}
                    stackId="a"
                    animationDuration={0}
                  />
                );
              }
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
