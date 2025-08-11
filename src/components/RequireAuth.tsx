import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { validateToken } from "@/api/auth"; // 用封装好的 API
import React from "react";
import { useUserInfo } from "@/stores/useUserInfo";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const { setData } = useUserInfo();

  useEffect(() => {
    const cached = sessionStorage.getItem("token_valid");
    if (cached === "true") {
      setValid(true);
      setChecking(false);
      return;
    }

    validateToken()
      .then((res) => {
        setValid(true);
        setData(res);
        sessionStorage.setItem("token_valid", "true");
      })
      .catch(() => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token_valid");
        setValid(false);
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return <></>;
  }

  if (!valid) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
