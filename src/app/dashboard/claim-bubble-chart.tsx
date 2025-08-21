import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectMonth from "@/components/custom-ui/select-month";
import {
  type CheckState,
  type DateState,
  type DateStateWithoutOpen,
  type Selected,
  type SelectParams,
} from "@/data/select";
import { type ClaimBubbleData, getclaimBubble } from "@/api/claimBubble";
import { useEffect, useState } from "react";
import { getselects } from "@/api/protected";
import ReactECharts from "echarts-for-react";

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

function getCurve({
  min,
  max,
  value,
}: {
  min: number;
  max: number;
  value: number;
}): [number, number][] {
  let CurveData: [number, number][] = [];
  for (let i = 0; i < 50; i++) {
    let x = min + (max - min) * (i / 49);
    CurveData.push([x, value / x]);
  }
  return CurveData;
}

const BubbleChart = ({
  data,
  cat,
}: {
  data: ClaimBubbleData;
  cat: "品牌" | "地区";
}) => {
  const rawData = data[cat].slice(0, -1);
  const min_x: number = Math.min(
    ...rawData.map((item) => item["万元满期保费出险次数"])
  );
  const max_x: number = Math.max(
    ...rawData.map((item) => item["万元满期保费出险次数"])
  );
  const min_y: number = Math.min(
    ...rawData.map((item) => item["案均赔款（元）"])
  );
  const max_y: number = Math.max(
    ...rawData.map((item) => item["案均赔款（元）"])
  );

  const option = {
    legend: {
      right: "10%",
      top: "3%",
      data: rawData.map((item) => item["指标"]),
    },
    grid: {
      left: "8%",
      top: "10%",
      right: "5%",
      bottom: "8%",
    },
    xAxis: {
      min: min_x * 0.95,
      max: max_x * 1.05,
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
      scale: true,
    },
    yAxis: {
      min: min_y * 0.95,
      max: max_y * 1.05,
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
      scale: true,
    },
    series: [
      {
        name: "90%",
        type: "line",
        data: getCurve({ min: min_x * 0.9, max: max_x * 1.1, value: 9000 }),
        smooth: true,
        showSymbol: false,
        z: -1,
      },
      {
        name: "100%",
        type: "line",
        data: getCurve({ min: min_x * 0.9, max: max_x * 1.1, value: 7000 }),
        smooth: true,
        showSymbol: false,
        z: -1,
      },
      {
        name: "110%",
        type: "line",
        data: getCurve({ min: min_x * 0.9, max: max_x * 1.1, value: 11000 }),
        smooth: true,
        showSymbol: false,
        z: -1,
      },
      ...rawData.map((item) => {
        const result = {
          name: item["指标"],
          type: "scatter",
          symbolSize: function (data: any) {
            return data[2] / 400;
          },
          data: [
            [
              item["万元满期保费出险次数"],
              item["案均赔款（元）"],
              item["满期保费（万元）"],
            ],
          ],

          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param: any) {
                return param.data[2];
              },
              position: "top",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            // shadowOffsetY: -2,
          },
        };
        return result;
      }),
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

function ClaimBubbleTable({
  data,
  cat,
}: {
  data: ClaimBubbleData;
  cat: "地区" | "品牌";
}) {
  return (
    <Table className="h-full">
      <TableHeader>
        {/* 第一行表头 */}
        <TableRow className="bg-gray-50">
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            {cat}
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            整体满期赔付率
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            人伤满期赔付率
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            车物满期赔付率
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            昨日新增报案数
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            已决金额（万元）
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            已决件数
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            未决金额（万元）
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            未决件数
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            零赔注销件数
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            零赔注销率
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data[cat].map((item, index) => (
          <TableRow
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <TableCell className="text-center text-sm text-gray-900">
              {item["指标"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["整体满期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["人伤满期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["车物满期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["昨日新增报案数"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["已决金额(万元)"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["已决件数"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["未决金额(万元)"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["未决件数"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["零赔注销件数"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["零赔注销率"]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ClaimBubbleChart() {
  const [selectedTab1, setSelectedTab1] = useState<"地区" | "品牌">("地区");
  const [selectParams, setSelectParams] = useState<SelectParams>();
  const [selected, setSelected] = useState<Selected>();
  const [data, setData] = useState<ClaimBubbleData>();

  useEffect(() => {
    async function fetchData() {
      const data1 = await getselects();

      setSelectParams(data1);
    }
    fetchData();
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
      getclaimBubble(selected).then((res) => {
        setData(res);
      });
    }
  }, [selected]);

  if (!selectParams) {
    return;
  }

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="relative">
        <SelectMonth
          selectParams={selectParams}
          onDataChange={handleDataChange}
        />
        <div className="absolute bottom-3 right-3 flex justify-end">
          <div className="text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] bg-green-200">
            <div
              className={`w-40 rounded-md text-sm px-2 py-1 cursor-default items-center justify-center text-center ${
                selectedTab1 === "地区" ? "bg-white" : ""
              }`}
              onClick={() => setSelectedTab1("地区")}
            >
              地区
            </div>
            <div
              className={`w-40 rounded-md text-sm px-2 py-1 cursor-default items-center justify-center text-center ${
                selectedTab1 === "品牌" ? "bg-white" : ""
              }`}
              onClick={() => setSelectedTab1("品牌")}
            >
              品牌
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 h-full">
        <div className="flex-1/3 border-2 rounded-2xl mr-2 h-full ">
          {data ? <BubbleChart data={data} cat={selectedTab1} /> : <></>}
        </div>
        <div className="flex-2/3 border-2 rounded-2xl ml-2 overflow-hidden">
          {data ? <ClaimBubbleTable data={data} cat={selectedTab1} /> : <></>}
        </div>
      </div>
    </div>
  );
}
