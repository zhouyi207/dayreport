"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReactECharts from "echarts-for-react";
import {
  getmarginalProfit,
  type MarginalPorfit,
  type TotalMarginalProfit,
} from "@/api/marginalProfit";
import { useEffect, useState } from "react";

export function StackBarChart({ data }: { data: MarginalPorfit[] }) {
  const option = {
    grid: {
      left: "3%",
      right: "2%",
      top: "10%",
      bottom: "10%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: [
      {
        type: "category",
        data: data.map((item) => item["标费预期赔付率分组"]),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "昨日签单保费",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series",
        },
        data: data.map((item) => item["昨日签单保费"]),
      },
      {
        name: "昨日平均定价系数",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series",
        },
        data: data.map((item) => item["昨日签单保费"]),
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

export function MarginalProfitTable({ data }: { data: MarginalPorfit[] }) {
  return (
    <Table className="border-collapse [&_th]:border-0 [&_td]:border-0 [&_tr]:border-0">
      <TableHeader>
        {/* 第一行表头 */}
        <TableRow className="bg-gray-50">
          <TableHead
            colSpan={2}
            className="text-center text-sm font-semibold text-gray-700"
          >
            组别
          </TableHead>
          <TableHead
            colSpan={5}
            className="text-center text-sm font-semibold text-gray-700"
          >
            本年合计数(截至昨日)
          </TableHead>
          <TableHead
            colSpan={5}
            className="text-center text-sm font-semibold text-gray-700"
          >
            本月合计数(截至昨日)
          </TableHead>
          <TableHead
            colSpan={5}
            className="text-center text-sm font-semibold text-gray-700"
          >
            昨日合计数
          </TableHead>
        </TableRow>
        {/* 第二行表头 */}
        <TableRow className="bg-gray-50">
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            分组序号
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            标费预期赔付率分组
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单保费
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单保费占比
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            平均定价系数
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单预期赔付率
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            边际贡献额
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单保费
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单保费占比
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            平均定价系数
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单预期赔付率
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            边际贡献额
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单保费
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单保费占比
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            平均定价系数
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            签单预期赔付率
          </TableHead>
          <TableHead className="text-center text- font-medium text-gray-500 uppercase tracking-wider">
            边际贡献额
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className={`bg-${
              index % 2 === 0 ? "gray-50" : "white"
            } hover:bg-gray-100 transition-colors h-full`}
          >
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["分组序号"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-500">
              {item["标费预期赔付率分组"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-500">
              {item["本年签单保费"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["本年签单保费占比"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["本年平均定价系数"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["本年签单预期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["本年边际贡献额"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-500">
              {item["本月签单保费"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["本月签单保费占比"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["本月平均定价系数"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["本月签单预期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["本月边际贡献额"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-500">
              {item["昨日签单保费"]}
            </TableCell>
            <TableCell className="text-center text-sm text-gray-900">
              {item["昨日签单保费占比"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["昨日平均定价系数"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["昨日签单预期赔付率"]}
            </TableCell>
            <TableCell className="text-center text-sm font-medium text-gray-900">
              {item["昨日边际贡献额"]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function MarginalProfit() {
  const [selectedTab1, setSelectedTab1] = useState<"v1" | "v2">("v1");
  const [selectedTab2, setSelectedTab2] = useState<"整体" | "新车" | "旧车">(
    "整体"
  );
  const [data, setData] = useState<TotalMarginalProfit>();

  useEffect(() => {
    async function fetchData() {
      const data = await getmarginalProfit();
      setData(data);
    }
    fetchData();
  }, []);

  if (!data) {
    return;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 border-2 rounded-2xl overflow-hidden min-h-50">
        <StackBarChart data={data[selectedTab1][selectedTab2]} />
      </div>

      <div defaultValue="整体" className="flex flex-col gap-0">
        <div className="flex justify-between w-full mt-3 mb-3">
          <div className="flex">
            <div className="text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] bg-green-200">
              <div
                className={`w-40 rounded-md text-sm font-medium px-2 py-1 cursor-default items-center justify-center text-center ${
                  selectedTab1 === "v1" ? "bg-white" : ""
                }`}
                onClick={() => setSelectedTab1("v1")}
              >
                v1
              </div>
              <div
                className={`w-40 rounded-md text-sm font-medium px-2 py-1 cursor-default items-center justify-center text-center ${
                  selectedTab1 === "v2" ? "bg-white" : ""
                }`}
                onClick={() => setSelectedTab1("v2")}
              >
                v2
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] bg-green-200">
              <div
                className={`w-40 rounded-md text-sm font-medium px-2 py-1 cursor-default items-center justify-center text-center ${
                  selectedTab2 === "整体" ? "bg-white" : ""
                }`}
                onClick={() => setSelectedTab2("整体")}
              >
                整体
              </div>
              <div
                className={`w-40 rounded-md text-sm font-medium px-2 py-1 cursor-default items-center justify-center text-center ${
                  selectedTab2 === "新车" ? "bg-white" : ""
                }`}
                onClick={() => setSelectedTab2("新车")}
              >
                新车
              </div>
              <div
                className={`w-40 rounded-md text-sm font-medium px-2 py-1 cursor-default items-center justify-center text-center ${
                  selectedTab2 === "旧车" ? "bg-white" : ""
                }`}
                onClick={() => setSelectedTab2("旧车")}
              >
                旧车
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 rounded-2xl h-full overflow-hidden">
          <MarginalProfitTable data={data[selectedTab1][selectedTab2]} />
        </div>
      </div>
    </div>
  );
}
