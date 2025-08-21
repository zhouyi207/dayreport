import { MultiHeaderTable } from "@/components/custom-ui/table";
import { MapChart } from "@/components/echart/MapChat";

export default function Test() {
  return (
    <div className="h-screen overflow-y-scroll">
      <div className="h-200">
        <MapChart />
      </div>
      <MultiHeaderTable />
    </div>
  );
}
