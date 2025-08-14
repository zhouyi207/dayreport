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
import { Select } from "@/components/custom-ui/select";
import { selectParams } from "@/data/select";
import { BubbleChart } from "@/components/echart/BubbleChart";

const data = {
  分组序号: ["A", "B", "C", "D", "E", "F", "G", "H"],
  标费赔付率分组: ["低", "中", "高", "中", "低", "高", "中", "低"],
  标准保费: [100, 120, 90, 110, 95, 130, 105, 115],
  签单保费: [95, 115, 85, 100, 90, 125, 100, 110],
  平均定价系数: [1.1, 1.2, 1.05, 1.15, 1.1, 1.3, 1.12, 1.18],
  标准保费占比: ["12%", "14%", "10%", "13%", "11%", "15%", "12%", "14%"],
  签单保费占比: ["11%", "13%", "9%", "12%", "10%", "14%", "11%", "13%"],
  标准预期赔付率: ["70%", "72%", "78%", "74%", "69%", "80%", "73%", "71%"],
  签单预期赔付率: ["68%", "70%", "76%", "72%", "67%", "78%", "71%", "69%"],
  实际满期赔付率: ["66%", "73%", "79%", "75%", "68%", "81%", "74%", "70%"],
  预实差: ["2%", "-3%", "-3%", "-1%", "1%", "-3%", "-3%", "-1%"],
};

export function UnderwritingTable() {
  return (
    <Table className="border-collapse [&_th]:border-0 [&_td]:border-0 [&_tr]:border-0">
      <TableHeader>
        {/* 第一行表头 */}
        <TableRow className="bg-gray-50">
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            分组序号
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            标费赔付率分组
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>标准保费(万元)</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>标准保费 = 基准保费 * NCD系数</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>签单保费(万元)</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>签单保费为不含税口径</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <p>平均定价系数</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>签单保费 / 标准保费</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            标准保费占比
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            签单保费占比
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            标准预期赔付率
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            签单预期赔付率
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
            实际满期赔付率
          </TableHead>
          <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">
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
        {data["分组序号"].map((_, index) => (
          <TableRow
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <TableCell className="text-center p-4.5 text-sm text-gray-900">
              {data["分组序号"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["标费赔付率分组"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["标准保费"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["签单保费"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["平均定价系数"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["标准保费占比"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["签单保费占比"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["标准预期赔付率"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["签单预期赔付率"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["实际满期赔付率"][index]}
            </TableCell>
            <TableCell className="text-center p-4.5 text-sm text-gray-700">
              {data["预实差"][index]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function UnderwritingBubbleChart() {
  const onDataChange = (data: any) => {
    console.log("Data changed:", data);
  };

  return (
    <div className="flex flex-col">
      <div>
        <Select selectParams={selectParams} onDataChange={onDataChange} />
      </div>
      <div className="flex mt-5">
        <div className="flex-1/3 h-125 border-2 rounded-2xl mr-2">
          <BubbleChart />
        </div>
        <div className="flex-2/3 h-125 border-2 rounded-2xl ml-2 overflow-hidden">
          <UnderwritingTable />
        </div>
      </div>
    </div>
  );
}
