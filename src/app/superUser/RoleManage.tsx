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
import { listroles, type CreateRole, type Role } from "@/api/rbac";
import { useState, useEffect } from "react";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSuperUserStore } from "@/stores/useSuperUserStore";
import { Link } from "react-router";

function RoleCreate() {
  const [open, setOpen] = useState<boolean>(false);
  const { roles } = useSuperUserStore.getState();

  const invalidNames = roles.map((role) => role.name);

  const fields: { name: keyof CreateRole; label: string }[] = [
    { name: "name", label: "角色名" },
  ];

  const formSchema = z.object({
    name: z
      .string()
      .nonempty({ message: "name 不能为空" }) // 不允许空字符串
      .refine((val) => !invalidNames.includes(val), {
        message: `name 不能是 ${invalidNames.join(", ")}`,
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(value: CreateRole) {
    console.log(value);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-5">
          <IdCard size={18} />
          创建角色
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px]">
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
                name={name}
                render={({ field: f }) => (
                  <FormItem>
                    <div className="flex gap-3 items-center">
                      <FormLabel className="w-1/4 flex items-center justify-center">
                        <p>{label}</p>
                      </FormLabel>
                      <FormControl>
                        <Input {...f} className="w-3/4" />
                      </FormControl>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-1/4"></div>
                      <FormMessage className="w-3/4 text-red-500 text-xs" />
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

function RoleManagement({ roles }: { roles: Role[] }) {
  let rowCounter = 0;

  return (
    <Table className="border-collapse [&_th]:border-0 [&_td]:border-0 [&_tr]:border-0">
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            序号
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            角色
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            一级url
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            一级权限名
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            二级url
          </TableHead>
          <TableHead className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            二级权限名
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) =>
          role.permissions.map((permission) => {
            const bgColor = rowCounter % 2 === 0 ? "gray-50" : "white";
            rowCounter++;
            return (
              <TableRow
                key={`${role.id}-${permission.id}`}
                className={`bg-${bgColor} hover:bg-gray-100 transition-colors`}
              >
                <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
                  {rowCounter}
                </TableCell>
                <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
                  {role.name}
                </TableCell>
                <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
                  {permission.level_1_name}
                </TableCell>
                <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
                  <Link to={permission.level_1_url}>
                    <Button variant="link">{permission.level_1_url}</Button>
                  </Link>
                </TableCell>
                <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
                  {permission.level_2_name}
                </TableCell>
                <TableCell className="text-center p-2 text-sm font-medium text-gray-900">
                  <Link to={permission.level_2_url}>
                    <Button variant="link">{permission.level_2_url}</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export function RoleManage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const { fetchData } = useSuperUserStore();

  useEffect(() => {
    async function fetchUsers() {
      const data = await listroles();
      setRoles(data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="rounded-lg border overflow-hidden h-180 overflow-y-auto">
        <RoleManagement roles={roles} />
      </div>
      <RoleCreate />
    </div>
  );
}
