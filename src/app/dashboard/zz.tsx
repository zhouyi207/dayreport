import { ChartAreaInteractive } from "@/components/custom-ui/chart-area";
import { MultiHeaderTable } from "@/components/custom-ui/table";
import { chartAreaInteractiveParams } from "@/data/chartArea";

export function ZZ() {
  return (
    <div>
      <MultiHeaderTable />
      <ChartAreaInteractive
        chartAreaInteractiveParams={chartAreaInteractiveParams}
      />
    </div>
  );
}
