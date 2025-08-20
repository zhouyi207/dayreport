import type {
  CheckState,
  DateState,
  DateStateWithoutOpen,
  Selected,
  SelectParams,
} from "@/data/select";
import ReactECharts from "echarts-for-react";
import { Select } from "@/components/custom-ui/select";
import { getselects2 } from "@/api/protected";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type DecileData, getdecile } from "@/api/decile";

function convertDateStateWithoutOpen(
  dateState: DateState
): DateStateWithoutOpen {
  const result: DateStateWithoutOpen = {};

  for (const date in dateState) {
    const options = dateState[date];
    result[date] = {};

    for (const option in options) {
      const { selected } = options[option];
      result[date][option] = { selected };
    }
  }

  return result;
}

export const CompositeChart = ({ data }: { data: DecileData }) => {
  const option = {
    grid: {
      left: "4%",
      right: "4%",
      bottom: "10%",
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
    // toolbox: {
    //   feature: {
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ["line", "bar"] },
    //     restore: { show: true },
    //     saveAsImage: { show: true },
    //   },
    // },
    legend: {
      data: ["满期保费（万元）", "实际满期赔付率", "鼎然预期赔付率"],
    },
    xAxis: [
      {
        type: "category",
        data: data.数据.map((item) => {
          return item["满期保费分组"];
        }),
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "满期保费",
        // interval: 50,
        axisLabel: {
          formatter: "{value} ml",
        },
      },
      {
        type: "value",
        name: "赔付率",
        // interval: 5,
        axisLabel: {
          formatter: "{value} °C",
        },
      },
    ],
    series: [
      {
        name: "满期保费（万元）",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: any) {
            return value + " ml";
          },
        },
        data: data.数据.map((item) => {
          return item["当前组满期保费（万元）"];
        }),
      },
      {
        name: "实际满期赔付率",
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: any) {
            return value + " ml";
          },
        },
        data: data.数据.map((item) => {
          return item["当前组实际满期赔付率"];
        }),
      },
      {
        name: "鼎然预期赔付率",
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: any) {
            return value + " °C";
          },
        },
        data: data.数据.map((item) => {
          return item["当前组鼎然预期赔付率"];
        }),
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
};

export const DecileTable = ({ data }: { data: DecileData }) => {
  return (
    <Table className="h-full">
      <TableHeader>
        <TableRow className="bg-gray-50">
          {/* 表头内容 */}
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            满期保费分组
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组签单保费（万元）
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组已暴露鼎然精算纯风险保费（万元）
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组满期保费（万元）
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组出险次数
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组已决赔款（万元）
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组未决赔款（万元）
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组已报告赔款（万元）
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组鼎然预期赔付率
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            当前组实际满期赔付率
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            万元满期保费出险次次数
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            绝对偏差率
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data["数据"].map((item, index) => (
          <TableRow
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <TableCell className="text-center text-sm text-gray-900">
              {item["满期保费分组"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组签单保费（万元）"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组已暴露鼎然精算纯风险保费（万元）"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组满期保费（万元）"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组出险次数"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组已决赔款（万元）"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组未决赔款（万元）"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组已报告赔款（万元）"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组鼎然预期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["当前组实际满期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["万元满期保费出险次次数"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["绝对偏差率"]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function Decile() {
  const [selectParams, setSelectParams] = useState<SelectParams>();
  const [selected, setSelected] = useState<Selected>();
  const [data, setData] = useState<DecileData>();

  useEffect(() => {
    getselects2().then((res) => {
      setSelectParams(res);
    });
  }, []);

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
      getdecile(selected).then((res) => {
        setData(res);
      });
    }
  }, [selected]);

  if (!selectParams) {
    return;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col">
        <Select selectParams={selectParams} onDataChange={handleDataChange} />
      </div>
      <Tabs defaultValue="account" className="flex flex-1 h-full gap-0">
        <div className="flex justify-between w-full mt-3 mb-3">
          <TabsList className="bg-green-200">
            <TabsTrigger value="account" className="w-40">
              趋势图
            </TabsTrigger>
            <TabsTrigger value="password" className="w-40">
              数据
            </TabsTrigger>
          </TabsList>
          <div className="text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] bg-green-200">
            <div className="w-40 rounded-md text-sm font-medium px-2 py-1 cursor-default items-center justify-center text-center">
              上升系数：{data?.上升系数}
            </div>
            <div className="w-40 rounded-md text-sm font-medium px-2 py-1 cursor-default items-center justify-center text-center">
              偏差率：{data?.偏差率}
            </div>
          </div>
        </div>
        <TabsContent value="account" className="mt-0">
          <div className="rounded-2xl border-2 h-full">
            {data ? <CompositeChart data={data} /> : <></>}
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="rounded-2xl border-2 h-full overflow-auto">
            {data ? <DecileTable data={data} /> : <></>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
