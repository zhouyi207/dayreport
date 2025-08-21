import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectMonth from "@/components/custom-ui/select-month";
import { useEffect, useState } from "react";
import { getselects } from "@/api/protected";
import type {
  Selected,
  SelectParams,
  DateState,
  DateStateWithoutOpen,
  CheckState,
} from "@/data/select";
import { getunderwritingBubble, type DataItem } from "@/api/underwritingBubble";
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

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const BubbleChart = ({ rawData }: { rawData: DataItem[] }) => {
  console.log(rawData);
  const option = {
    legend: {
      right: "10%",
      top: "3%",
      data: rawData.map((item) => item["分组序号"]),
    },
    grid: {
      left: "8%",
      top: "10%",
      right: "5%",
      bottom: "8%",
    },
    tooltip: {
      position: "top",
    },
    xAxis: {
      type: "value",
      min: Math.min(...rawData.map((item) => item["标准保费"])) * 0.8,
      max: Math.max(...rawData.map((item) => item["标准保费"])) * 1.2,
      axisLabel: {
        formatter: "{value}",
      },
    },
    yAxis: {
      type: "value",
      min: Math.min(...rawData.map((item) => item["签单保费"])) * 0.8,
      max: Math.max(...rawData.map((item) => item["签单保费"])) * 1.2,
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: [
      {
        name: "y = x",
        type: "line", // 使用折线图
        data: [
          [0, 0],
          [
            Math.max(...rawData.map((item) => item["签单保费"])) * 1.2,
            Math.max(...rawData.map((item) => item["签单保费"])) * 1.2,
          ],
        ],
        lineStyle: {
          color: "#ff0000", // 线条颜色
          type: "dashed", // 设置虚线
          width: 2, // 设置线宽
        },
        symbol: "none", // 数据点的形状
      },
      ...rawData.map((item) => {
        const res = {
          name: item["分组序号"],
          type: "scatter",
          symbolSize: () => {
            // 确保值是有效的，默认返回一个合理的大小
            return parseFloat(item["标准保费占比"]) * 5; // 假设大小由占比来决定
          },
          data: [
            [
              item["标准保费"], // x
              item["签单保费"], // y
              item["标准保费占比"], // size
            ],
          ],
          itemStyle: {
            color: getRandomColor(), // 为每个系列分配随机颜色
          },
        };
        return res;
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

export function UnderwritingTable({ data }: { data: DataItem[] }) {
  return (
    <Table className="h-full">
      <TableHeader>
        <TableRow className="bg-gray-50">
          {/* 表头内容 */}
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            分组序号
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            标费赔付率分组
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>标准保费(万元)</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>标准保费 = 基准保费 * NCD系数</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>签单保费(万元)</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>签单保费为不含税口径</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>平均定价系数</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>签单保费 / 标准保费</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            标准保费占比
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            签单保费占比
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            标准预期赔付率
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            签单预期赔付率
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            实际满期赔付率
          </TableHead>
          <TableHead className="text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>预实差</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>预实差 = 签单预期赔付率 - 实际满期赔付率</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <TableCell className="text-center text-sm text-gray-900">
              {item["分组序号"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["标费赔付率分组"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["标准保费"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["签单保费"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["平均定价系数"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["标准保费占比"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["签单保费占比"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["标准预期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["签单预期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["实际满期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-700">
              {item["预实差"]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function UnderwritingBubbleChart() {
  const [selectParams, setSelectParams] = useState<SelectParams>();
  const [selected, setSelected] = useState<Selected>();
  const [data, setData] = useState<DataItem[]>();

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
      getunderwritingBubble(selected).then((res) => {
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
        <SelectMonth
          selectParams={selectParams}
          onDataChange={handleDataChange}
        />
      </div>
      <div className="flex mt-3 flex-1">
        <div className="flex-1/3 border-2 rounded-2xl mr-2">
          {data ? <BubbleChart rawData={data} /> : <></>}
        </div>
        <div className="flex-2/3 border-2 rounded-2xl ml-2 overflow-hidden">
          {data ? <UnderwritingTable data={data} /> : <></>}
        </div>
      </div>
    </div>
  );
}
