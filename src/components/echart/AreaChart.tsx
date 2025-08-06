import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import type { ChartAreaInteractiveParams } from "@/data/chartArea";

export function EChartAreaInteractive({
  chartAreaInteractiveParams,
}: {
  chartAreaInteractiveParams: ChartAreaInteractiveParams;
}) {
  const option = {
    grid: {
      left: "4%", // 无左边距
      right: "2%", // 无右边距
      bottom: "10%", // 无下边距
    },
    tooltip: {
      trigger: "axis",
      triggerOn: "mousemove",
      axisPointer: {
        type: "line", // 或 'shadow'，显示跟随指示线
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chartAreaInteractiveParams.data.map((item) => item.date),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        showSymbol: false,
        data: chartAreaInteractiveParams.data.map((item) => item.desktop),
        type: "line",
        smooth: 0.6,
        smoothMonotone: "x",
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(0, 136, 212, 0.8)" },
            { offset: 1, color: "rgba(0, 255, 255, 0.2)" },
          ]),
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      opts={{ renderer: "svg" }}
      style={{ height: "100%", width: "100%" }}
    />
  );
}
