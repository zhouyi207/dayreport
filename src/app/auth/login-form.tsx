import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 处理输入变化
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("/login", { email, password })
      .then((response) => {
        if (response.status == 200) {
          const { token, user } = response.data;
          localStorage.setItem("authToken", token);
          localStorage.setItem("userData", JSON.stringify(user));
          toast.success("登陆成功！");
          navigate("/");
        } else {
          console.log("asdsad");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.info("Event has been created");
      });
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
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={handleEmailChange}
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
