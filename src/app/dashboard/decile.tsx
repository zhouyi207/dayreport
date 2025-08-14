import type { SelectParams } from "@/data/select";
import ReactECharts from "echarts-for-react";
import { Select } from "@/components/custom-ui/select";

export const selectParams: SelectParams = {
  check: [
    { title: "新旧车", options: ["新车", "旧车"] },
    {
      title: "销售渠道",
      options: ["直营", "直营平台", "经销商", "集团联营", "企业渠道"],
    },
    {
      title: "地区",
      options: ["华东", "华南", "华北", "西南", "西北", "华中", "其他"],
    },
    { title: "品牌", options: ["奥迪", "宝马", "奔驰", "丰田", "福特"] },
  ],
};

const option = {
  grid: {
    left: "4%", // 无左边距
    right: "4%", // 无右边距
    bottom: "10%", // 无下边距
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  legend: {
    data: ["Evaporation", "Precipitation", "Temperature"],
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "Precipitation",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} ml",
      },
    },
    {
      type: "value",
      name: "Temperature",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} °C",
      },
    },
  ],
  series: [
    {
      name: "Evaporation",
      type: "bar",
      tooltip: {
        valueFormatter: function (value: any) {
          return value + " ml";
        },
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
    },
    {
      name: "Precipitation",
      type: "bar",
      tooltip: {
        valueFormatter: function (value: any) {
          return value + " ml";
        },
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
    },
    {
      name: "Temperature",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: any) {
          return value + " °C";
        },
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
  ],
};

export default function Decile() {
  const onDataChange = (data: any) => {
    console.log("Data changed:", data);
  };
  return (
    <div>
      <Select selectParams={selectParams} onDataChange={onDataChange} />
      <div className="h-150 mt-2 rounded-2xl border-2">
        <ReactECharts
          option={option}
          opts={{ renderer: "svg" }}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}
