import { useEffect } from "react";
import { useNavigate } from "react-router";
import { onUnauthorized, onForbidden } from "../lib/navigation";

export function GlobalAuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate("/auth/login", { replace: true });
    };
    const handleForbidden = () => {
      navigate("/no-permission", { replace: true });
    };

    onUnauthorized(handleUnauthorized);
    onForbidden(handleForbidden);

    // 可选：返回取消订阅函数（如果实现了取消订阅）
    // 这里为简单示例暂不实现

  }, [navigate]);

  return null;
}
