import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router";
import { toast } from "sonner";
import { login } from "@/api/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // 处理输入变化
  const handleusernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await login({ username, password });
      localStorage.setItem("token", data.access);
      toast.success("登入成功！");
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err.response?.data?.detail || "登录失败，请检查用户名和密码";
      toast.error(msg);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="p-6 md:p-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">欢迎访问产品精算部</h1>
            <p className="text-muted-foreground text-balance">登录账号</p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username">邮箱</Label>
            <Input
              id="username"
              type="email"
              placeholder="m@example.com"
              required
              value={username}
              onChange={handleusernameChange}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">密码</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button type="submit" className="w-full">
            登录
          </Button>

          <div className="text-center text-sm">
            <Link to="/auth/sign" className="underline underline-offset-4">
              申请账号
            </Link>
            &nbsp; | &nbsp;
            <Link to="/auth/change" className="underline underline-offset-4">
              修改密码
            </Link>
            &nbsp; | &nbsp;
            <Link to="/auth/forget" className="underline underline-offset-4">
              忘记密码
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
