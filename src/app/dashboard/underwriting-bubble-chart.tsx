import { ChartBubble } from "@/components/custom-ui/chart-bubble";
import { Select } from "@/components/custom-ui/select";
import { selectParams } from "@/data/select";

export function UnderwritingBubbleChart() {
  const onDataChange = (data: any) => {
    console.log("Data changed:", data);
  };

  return (
    <div>
      <Select selectParams={selectParams} onDataChange={onDataChange} />
      <div className="mt-10">
        <ChartBubble />
      </div>
    </div>
  );
}
