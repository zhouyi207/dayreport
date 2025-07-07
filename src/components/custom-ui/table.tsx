"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function MultiHeaderTable() {
  const data = {
    分组序号: ["A", "B", "C", "D", "E", "F", "G", "H"],
    标费预期赔付率分组: [
      "65%及以下",
      "65%-75%",
      "75%-85%",
      "85%-95%",
      "95%-105%",
      "105%-120%",
      "120%-140%",
      "140%以上",
    ],
    本年签单保费: [100, 200, 300, 400, 500, 600, 700, 800],
    本年签单保费占比: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%"],
    本年平均定价系数: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8],
    本年签单预期赔付率: [
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
      "110%",
      "120%",
      "130%",
    ],
    本年边际贡献额: [10, 20, 30, 40, 50, 60, 70, 80],
    本月签单保费: [100, 200, 300, 400, 500, 600, 700, 800],
    本月签单保费占比: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%"],
    本月平均定价系数: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8],
    本月签单预期赔付率: [
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
      "110%",
      "120%",
      "130%",
    ],
    本月边际贡献额: [10, 20, 30, 40, 50, 60, 70, 80],
    昨日签单保费: [100, 200, 300, 400, 500, 600, 700, 800],
    昨日签单保费占比: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%"],
    昨日平均定价系数: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8],
    昨日签单预期赔付率: [
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
      "110%",
      "120%",
      "130%",
    ],
    昨日边际贡献额: [10, 20, 30, 40, 50, 60, 70, 80],
  };

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse">
        <TableCaption className="mb-4 text-sm text-gray-500">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          {/* 第一行表头 */}
          <TableRow className="bg-gray-50">
            <TableHead
              colSpan={2}
              className="p-2 text-center text-sm font-semibold text-gray-700 border border-gray-200"
            >
              组别
            </TableHead>
            <TableHead
              colSpan={5}
              className="p-2 text-center text-sm font-semibold text-gray-700 border border-gray-200"
            >
              本年合计数(截至昨日)
            </TableHead>
            <TableHead
              colSpan={5}
              className="p-2 text-center text-sm font-semibold text-gray-700 border border-gray-200"
            >
              本年合计数(截至昨日)
            </TableHead>
            <TableHead
              colSpan={5}
              className="p-2 text-center text-sm font-semibold text-gray-700 border border-gray-200"
            >
              本年合计数(截至昨日)
            </TableHead>
          </TableRow>
          {/* 第二行表头 */}
          <TableRow className="bg-gray-50">
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              分组序号
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              标费预期赔付率分组
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单保费
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单保费占比
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              平均定价系数
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单预期赔付率
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              边际贡献额
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单保费
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单保费占比
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              平均定价系数
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单预期赔付率
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              边际贡献额
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单保费
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单保费占比
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              平均定价系数
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              签单预期赔付率
            </TableHead>
            <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
              边际贡献额
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow
              key={index}
              className={`bg-${
                index % 2 === 0 ? "gray-50" : "white"
              } hover:bg-gray-100 transition-colors`}
            >
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["分组序号"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm text-gray-500 border border-gray-200">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    data["标费预期赔付率分组"][index] === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {data["标费预期赔付率分组"][index]}
                </span>
              </TableCell>
              <TableCell className="text-center p-2 text-sm text-gray-500 border border-gray-200">
                {data["本年签单保费"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm text-gray-900 border border-gray-200">
                {data["本年签单保费占比"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["本年平均定价系数"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["本年签单预期赔付率"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["本年边际贡献额"][index]}
              </TableCell>

              <TableCell className="text-center p-2 text-sm text-gray-500 border border-gray-200">
                {data["本月签单保费"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm text-gray-900 border border-gray-200">
                {data["本月签单保费占比"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["本月平均定价系数"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["本月签单预期赔付率"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["本月边际贡献额"][index]}
              </TableCell>

              <TableCell className="text-center p-2 text-sm text-gray-500 border border-gray-200">
                {data["昨日签单保费"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm text-gray-900 border border-gray-200">
                {data["昨日签单保费占比"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["昨日平均定价系数"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["昨日签单预期赔付率"][index]}
              </TableCell>
              <TableCell className="text-center p-2 text-sm font-medium text-gray-900 border border-gray-200">
                {data["昨日边际贡献额"][index]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
