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
import SelectMonth from "@/components/custom-ui/select-month";
import { useState } from "react";
import type { SelectParams, Selected } from "@/data/select";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { getselects2 } from "@/api/protected";
import { useEffect } from "react";
import type {
  DateState,
  CheckState,
  DateStateWithoutOpen,
} from "@/data/select";
import {
  getclaimTrendTotal,
  type TrendData,
  type DataItem,
} from "@/api/claimTrendTotal";

function convertDateStateWithoutOpen(
  dateState: DateState
): DateStateWithoutOpen {
  const result: DateStateWithoutOpen = {};

  for (const title in dateState) {
    const options = dateState[title];
    result[title] = {
      起始日期: { selected: options["起始日期"].selected },
      结束日期: { selected: options["结束日期"].selected },
    };
  }
  return result;
}

export function TrendChart({ data, col }: { data: DataItem[]; col: string }) {
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
      data: data.map((item) => item.date),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        showSymbol: false,
        data: data.map((item) => item[col]),
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

export default function ClaimTrendTotalChart() {
  const [selectParams, setSelectParams] = useState<SelectParams>();
  const [selected, setSelected] = useState<Selected>();
  const [timeRange, setTimeRange] = useState("-30d");
  const [dataRange, setDataRange] = useState("");
  const [data, setData] = useState<TrendData>();
  const [datafilter, setDataFilter] = useState<DataItem[]>();

  useEffect(() => {
    getselects2().then((res) => {
      setSelectParams(res);
    });
  }, []);

  useEffect(() => {
    const dayLength = parseInt(timeRange);
    if (data) {
      setDataFilter(data?.数据.slice(dayLength));
    }
  }, [timeRange, data]);

  const handleDataChange = ({
    dateStates,
    checkStates,
  }: {
    dateStates: DateState;
    checkStates: CheckState;
  }) => {
    const newDateStates = convertDateStateWithoutOpen(dateStates);

    if (
      JSON.stringify(newDateStates) !== JSON.stringify(selected?.dateStates) ||
      JSON.stringify(checkStates) !== JSON.stringify(selected?.checkStates)
    ) {
      const res = {
        dateStates: newDateStates,
        checkStates: checkStates,
      };
      setSelected(res);
    }
  };

  useEffect(() => {
    if (selected) {
      getclaimTrendTotal(selected).then((res) => {
        setData(res);
        setDataRange(res.列名[0]);
        setTimeRange("-30d");
      });
    }
  }, [selected]);

  if (!selectParams) {
    return;
  }

  return (
    <div className="flex flex-col h-full">
      <div>
        <SelectMonth
          selectParams={selectParams}
          onDataChange={handleDataChange}
        />
      </div>
      <div className="flex flex-1 mt-3 h-full">
        <Card className="flex flex-3 h-full border-2 rounded-2xl mr-2">
          <CardHeader>
            <CardTitle>趋势图</CardTitle>
            <CardDescription>趋势图</CardDescription>
            <CardAction className="flex gap-5">
              <Select value={dataRange} onValueChange={setDataRange}>
                <SelectTrigger className="rounded-lg flex w-40">
                  <SelectValue placeholder={data?.列名[0]} />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {data?.列名.map((item) => {
                    return (
                      <SelectItem
                        key={item}
                        value={item}
                        className="rounded-lg"
                      >
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="rounded-lg flex w-40">
                  <SelectValue placeholder="过去30天" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="0d" className="rounded-lg">
                    过去所有天数
                  </SelectItem>
                  <SelectItem value="-180d" className="rounded-lg">
                    过去180天
                  </SelectItem>
                  <SelectItem value="-90d" className="rounded-lg">
                    过去90天
                  </SelectItem>
                  <SelectItem value="-30d" className="rounded-lg">
                    过去30天
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardAction>
          </CardHeader>
          <CardContent className="h-full">
            {datafilter ? (
              <TrendChart data={datafilter} col={dataRange} />
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
        <div className="flex-1 border-2 rounded-2xl ml-2 overflow-hidden grid grid-cols-2 grid-rows-2">
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
