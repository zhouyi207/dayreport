import { Pill, PillIndicator } from "@/components/ui/pill";
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
import { ArrowRight, UserPen, UserX, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateuser, createuser } from "@/api/user";
import type { CreateUser } from "@/api/user";

function UserUpdate({
  item,
  onUpdate,
}: {
  item: User;
  onUpdate: (user: User) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const fields: { name: keyof User; label: string }[] = [
    { name: "name", label: "姓名" },
    { name: "email", label: "邮箱" },
    { name: "work_id", label: "工号" },
    { name: "department", label: "部门" },
  ];

  const formSchema = z.object({
    name: z.string().min(1, "姓名不能为空"),
    email: z.email("邮箱格式不正确"),
    work_id: z.string().min(1, "工号不能为空"),
    department: z.string().min(1, "部门不能为空"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      email: item.email,
      work_id: item.work_id,
      department: item.department,
    },
    mode: "all",
  });

  function onSubmit(values: Omit<User, "id" | "roles">) {
    updateuser(item.id, values).then((res) => {
      onUpdate(res);
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mr-1">
          <UserPen size={18} />
          修改
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>编辑</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as "name" | "email" | "work_id" | "department"}
                render={({ field: f }) => (
                  <FormItem>
                    <div className="flex gap-3 items-center">
                      <FormLabel className="w-1/2 text-center">
                        <p className="w-1/6">{label}</p>
                        <p className="w-4/6">{item[name]}</p>
                        <ArrowRight className="w-1/6" />
                      </FormLabel>
                      <FormControl>
                        <Input {...f} className="w-1/2" />
                      </FormControl>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-1/2"></div>
                      <FormMessage className="w-1/2 text-red-500 text-xs" />
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
      </DialogContent>
    </Dialog>
  );
}

function UserCreate({ onCreate }: { onCreate: (user: User) => void }) {
  const [open, setOpen] = useState<boolean>(false);

  const fields: { name: keyof CreateUser; label: string }[] = [
    { name: "name", label: "姓名" },
    { name: "email", label: "邮箱" },
    { name: "work_id", label: "工号" },
    { name: "password", label: "密码" },
    { name: "department_id", label: "部门" },
  ];

  const formSchema = z.object({
    name: z.string().min(1, "姓名不能为空"),
    email: z.email("邮箱格式不正确"),
    password: z.string().min(1, "密码不能为空"),
    work_id: z.string().min(1, "工号不能为空"),
    department_id: z.string().min(1, "部门不能为空"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      work_id: "",
      password: "",
      department_id: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(values: CreateUser) {
    console.log(values);
    createuser(values).then((res) => {
      console.log(res);
      onCreate(res);
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-5">
          <UserPlus size={18} />
          创建用户
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建用户</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field: f }) => (
                  <FormItem>
                    <div className="flex gap-3 items-center">
                      <FormLabel className="w-1/7 text-center">
                        {label}
                      </FormLabel>
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
      </DialogContent>
    </Dialog>
  );
}

function AccountManagement({
  users,
  onUpdateUser,
}: {
  users: User[];
  onUpdateUser: (user: User) => void;
}) {
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
              {item.roles.map((role, index) => (
                <Pill className="bg-amber-100 m-1" key={index}>
                  <PillIndicator variant="success" pulse />
                  {role}
                </Pill>
              ))}
            </TableCell>
            <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
              <UserUpdate item={item} onUpdate={onUpdateUser} />

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

  function updateUserInList(updatedUser: User) {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  }

  function createUserInList(createUser: User) {
    setUsers((prevUsers) => [...prevUsers, createUser]);
  }

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
            <AccountManagement users={users} onUpdateUser={updateUserInList} />
          </div>
          <UserCreate onCreate={createUserInList} />
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
