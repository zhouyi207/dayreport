import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = Array.from({ length: 20 }, (_, i) => ({
  序号: i + 1, // 从 1 开始递增
  姓名: `周易${i + 1}`, // 姓名加编号
  邮箱: `test${i + 1}@example.com`, // 邮箱加编号
  工号: String(8387163 + i), // 工号递增
  部门: "产品精算部",
  角色: "超级管理员",
}));

function AccountManagement() {
  return (
    <Table className="border-collapse [&_th]:border-0 [&_td]:border-0 [&_tr]:border-0">
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            序号
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            姓名
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            邮箱
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            工号
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            部门
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            角色
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className={`bg-${
              index % 2 === 0 ? "gray-50" : "white"
            } hover:bg-gray-100 transition-colors`}
          >
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.序号}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.姓名}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.邮箱}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.工号}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.部门}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.角色}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RoleManagement() {
  return (
    <Table className="border-collapse [&_th]:border-0 [&_td]:border-0 [&_tr]:border-0 h-200">
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            序号
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            角色
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            权限
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className={`bg-${
              index % 2 === 0 ? "gray-50" : "white"
            } hover:bg-gray-100 transition-colors`}
          >
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.序号}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.姓名}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.姓名}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function SuperUser() {
  return (
    <div>
      <Tabs defaultValue="账号管理">
        <div className="flex justify-end m-0 mb-2">
          <TabsList className="bg-green-200">
            <TabsTrigger value="账号管理" className="w-40">
              账号管理
            </TabsTrigger>
            <TabsTrigger value="角色管理" className="w-40">
              角色管理
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="账号管理">
          <div className="rounded-lg border overflow-hidden">
            <AccountManagement />
          </div>
        </TabsContent>
        <TabsContent value="角色管理">
          <div className="rounded-lg border overflow-hidden">
            <RoleManagement />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
