import { MultiHeaderTable } from "@/components/custom-ui/table";
import { ChartAreaInteractive } from "@/components/custom-ui/chart-area";
import { chartAreaInteractiveParams } from "@/data/chartArea";
import { EChartAreaInteractive } from "@/components/echart/AreaChart";
import { BubbleChart } from "@/components/echart/BubbleChart";
import { MapChart } from "@/components/echart/MapChat";

export function Test() {
  return (
    <div>
      <MapChart />
      <BubbleChart />
      <EChartAreaInteractive
        chartAreaInteractiveParams={chartAreaInteractiveParams}
      />
      <MultiHeaderTable />
      <ChartAreaInteractive
        chartAreaInteractiveParams={chartAreaInteractiveParams}
      />
    </div>
  );
}
