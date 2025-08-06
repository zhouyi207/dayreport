import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select as Select_ } from "@/components/custom-ui/select";
import { selectParams } from "@/data/select";
import { EChartAreaInteractive } from "@/components/echart/AreaChart";
import { chartAreaInteractiveParams } from "@/data/chartArea";
import { useState } from "react";

export function UnderwritingTrendChart() {
  const [timeRange, setTimeRange] = useState("90d");
  const onDataChange = (data: any) => {
    console.log("Data changed:", data);
  };
  return (
    <div className="flex flex-col">
      <div>
        <Select_ selectParams={selectParams} onDataChange={onDataChange} />
      </div>
      <div className="flex flex-1 mt-5">
        {/* <div className="relative flex-3 h-125 border-2 rounded-2xl mr-2">
          <div className="absolute h-125 z-10 top-4 right-4 flex gap-5">
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
          </div>

          <div className="absolute h-125 z-10 top-4 left-4 flex gap-5">
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
          </div>
          <EChartAreaInteractive
            chartAreaInteractiveParams={chartAreaInteractiveParams}
          />
        </div> */}

        <Card className="flex-3 h-125 border-2 rounded-2xl mr-2">
          <CardHeader>
            <CardTitle>趋势图</CardTitle>
            <CardDescription>趋势图</CardDescription>
            <CardAction>
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
            </CardAction>
          </CardHeader>
          <CardContent className="h-120">
            <EChartAreaInteractive
              chartAreaInteractiveParams={chartAreaInteractiveParams}
            />
          </CardContent>
        </Card>
        <div className="flex-1 h-125 border-2 rounded-2xl ml-2 overflow-hidden grid grid-cols-2 grid-rows-2">
          <div key="1" className="flex items-center justify-center border">
            过去该指标一共上升了30天，下降了30天，持平了30天
          </div>
          <div key="2" className="flex items-center justify-center border">
            文本
          </div>
          <div key="3" className="flex items-center justify-center border">
            文本
          </div>
          <div key="4" className="flex items-center justify-center border">
            文本
          </div>
        </div>
      </div>
    </div>
  );
}
