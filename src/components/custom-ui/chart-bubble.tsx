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
  type ChartConfig,
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis } from "recharts";

const data01 = [
  { hour: "12a", index: 1, value: 170 },
  { hour: "1a", index: 1, value: 180 },
  { hour: "2a", index: 1, value: 150 },
  { hour: "3a", index: 1, value: 120 },
  { hour: "4a", index: 1, value: 200 },
  { hour: "5a", index: 1, value: 300 },
  { hour: "6a", index: 1, value: 400 },
  { hour: "7a", index: 1, value: 200 },
  { hour: "8a", index: 1, value: 100 },
  { hour: "9a", index: 1, value: 150 },
  { hour: "10a", index: 1, value: 160 },
  { hour: "11a", index: 1, value: 170 },
  { hour: "12a", index: 1, value: 180 },
  { hour: "1p", index: 1, value: 144 },
  { hour: "2p", index: 1, value: 166 },
  { hour: "3p", index: 1, value: 145 },
  { hour: "4p", index: 1, value: 150 },
  { hour: "5p", index: 1, value: 170 },
  { hour: "6p", index: 1, value: 180 },
  { hour: "7p", index: 1, value: 165 },
  { hour: "8p", index: 1, value: 130 },
  { hour: "9p", index: 1, value: 140 },
  { hour: "10p", index: 1, value: 170 },
  { hour: "11p", index: 1, value: 180 },
];

export function ChartBubble() {
  const chartConfig: ChartConfig = {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>气泡图</CardTitle>
        <CardDescription>这是一个气泡图表示。</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[500px] w-full"
        >
          {/* Add your chart implementation here */}
          <ScatterChart
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
            data={data01}
          >
            <XAxis dataKey="value" type="number" />
            <YAxis dataKey="value" type="number" />
            <ZAxis
              type="number"
              dataKey="value"
              domain={[0, 0.001]}
              range={[16, 225]}
            />
            <Scatter fill="#8884d8"/>
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
