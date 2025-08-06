import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { chinaJSON } from "@/data/map";

export function MapChart() {
  echarts.registerMap("China", chinaJSON);
  const option = {
    series: [
      {
        type: "map",
        map: "China",
      },
    ],
  };

  return <ReactECharts option={option} opts={{ renderer: "svg" }} />;
}
