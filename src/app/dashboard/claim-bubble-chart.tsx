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

import { Select as Select_ } from "@/components/custom-ui/select";
import { selectParams } from "@/data/select";
import { BubbleChart } from "@/components/echart/BubbleChart";

const data = {
  地区: [
    "安徽",
    "山东",
    "广东",
    "江西",
    "河南",
    "深圳",
    "湖南",
    "陕西",
    "总体",
  ],
  满期赔付率: ["65%", "68%", "72%", "70%", "67%", "73%", "69%", "71%", "69%"],
  签单保费: [120, 150, 200, 110, 130, 180, 125, 140, 1155],
  保费占比: ["10%", "12%", "16%", "9%", "11%", "15%", "10%", "12%", "100%"],
  最近30日签单保费: [30, 40, 55, 25, 35, 50, 28, 32, 295],
  满期保费: [115, 140, 190, 100, 120, 170, 120, 135, 1090],
  非零赔案数: [10, 14, 20, 9, 12, 18, 11, 13, 107],
  商业险自主定价系数: [1.12, 1.15, 1.18, 1.1, 1.13, 1.2, 1.11, 1.14, 1.14],
  满期保费商业险自主定价系数: [
    1.1, 1.12, 1.16, 1.08, 1.11, 1.18, 1.09, 1.13, 1.12,
  ],
  非满期保费商业险自主定价系数: [
    1.14, 1.18, 1.22, 1.12, 1.16, 1.23, 1.13, 1.15, 1.17,
  ],
};

export function ClaimTable() {
  return (
    <Table className="border-collapse [&_th]:border-0 [&_td]:border-0 [&_tr]:border-0">
      <TableHeader>
        {/* 第一行表头 */}
        <TableRow className="bg-gray-50">
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            地区
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            满期赔付率
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>签单保费(万元)</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>标准保费 = 基准保费 * NCD系数</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>保费占比</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>签单保费为不含税口径</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>最近30日<br />签单保费(万元)</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>签单保费 / 标准保费</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            满期保费(万元)
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            非零赔案数
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            商业险<br />自主定价系数
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            满期保费商业险<br />自主定价系数
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            非满期保费商业险<br />自主定价系数
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data["地区"].map((_, index) => (
          <TableRow
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <TableCell className="text-center p-4.5 text-sm text-gray-900">
              {data["地区"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["满期赔付率"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["签单保费"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["保费占比"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["最近30日签单保费"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["满期保费"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["非零赔案数"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["商业险自主定价系数"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["满期保费商业险自主定价系数"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["非满期保费商业险自主定价系数"][index]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function ClaimBubbleChart() {
  const onDataChange = (data: any) => {
    console.log("Data changed:", data);
  };

  return (
    <div className="flex flex-col">
      <div>
        <Select_ selectParams={selectParams} onDataChange={onDataChange} />
      </div>
      <div className="flex mt-5">
        <div className="flex-1/3 h-125 border-2 rounded-2xl mr-2">
          <BubbleChart />
        </div>
        <div className="flex-2/3 h-125 border-2 rounded-2xl mr-2 overflow-hidden overflow-y-scroll">
          <ClaimTable />
        </div>
      </div>
    </div>
  );
}
