import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getuserList, type User } from "@/api/user";
import { useState, useEffect } from "react";
import { UserPen, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function EditUser({ item }: { item: User }) {
  const fields = [
    { name: "name", label: "姓名" },
    { name: "email", label: "邮箱" },
    { name: "work_id", label: "工号" },
    { name: "department", label: "部门" },
    { name: "roles", label: "角色" },
  ];

  const formSchema = z.object({
    name: z.string().min(1, "姓名不能为空"),
    email: z.email("邮箱格式不正确"),
    work_id: z.string().min(1, "工号不能为空"),
    department: z.string().min(1, "部门不能为空"),
    roles: z.string().min(1, "角色不能为空"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      email: item.email,
      work_id: item.work_id,
      department: item.department,
      roles: "测试",
    },
    mode: "all",
  });

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map(({ name, label }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as "name" | "email" | "work_id" | "department" | "roles"}
            render={({ field: f }) => (
              <FormItem>
                <div className="flex gap-3 items-center">
                  <FormLabel className="w-1/7 text-center">{label}</FormLabel>
                  <FormControl>
                    <Input {...f} className="w-6/7" />
                  </FormControl>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-1/7"></div>
                  <FormMessage className="w-6/7 text-red-500 text-xs" />
                </div>
              </FormItem>
            )}
          />
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

function AccountManagement({ users }: { users: User[] }) {
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
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            操作
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((item, index) => (
          <TableRow
            key={index}
            className={`bg-${
              index % 2 === 0 ? "gray-50" : "white"
            } hover:bg-gray-100 transition-colors`}
          >
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.id}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.name}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.email}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.work_id}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.department}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.roles}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mr-1">
                    <UserPen size={18} />
                    修改
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>编辑</DialogTitle>
                  </DialogHeader>
                  <DialogDescription></DialogDescription>
                  <EditUser item={item} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-1">
                    <UserX size={18} />
                    删除
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>提示</DialogTitle>
                  </DialogHeader>
                  <div className="text-cyan-500">
                    你确定要删除用户名为 {item.name} 的用户吗？
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">取消</Button>
                    </DialogClose>
                    <Button type="submit">确定</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RoleManagement({ users }: { users: User[] }) {
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
        {users.map((item, index) => (
          <TableRow
            key={index}
            className={`bg-${
              index % 2 === 0 ? "gray-50" : "white"
            } hover:bg-gray-100 transition-colors`}
          >
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.id}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.name}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              {item.email}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function SuperUser() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getuserList();
      setUsers(data);
    }
    fetchUsers();
  }, []);
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
            <AccountManagement users={users} />
          </div>
        </TabsContent>
        <TabsContent value="角色管理">
          <div className="rounded-lg border overflow-hidden">
            <RoleManagement users={users} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
