import { MultiHeaderTable } from "@/components/custom-ui/table";
import { ChartAreaInteractive } from "@/components/custom-ui/chart-area";
import { chartAreaInteractiveParams } from "@/data/chartArea";
import { EChartAreaInteractive } from "@/components/echart/AreaChart";
import { BubbleChart } from "@/components/echart/BubbleChart";
import { MapChart } from "@/components/echart/MapChat";

export default function Test() {
  return (
    <div className="h-screen overflow-y-scroll">
      <div className="h-200">
        <MapChart />
      </div>
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
