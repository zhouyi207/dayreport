import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { validateToken } from "@/api/auth";
import React from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setValid(false);
      setChecking(false);
      return;
    }

    validateToken()
      .then(() => setValid(true))
      .catch(() => {
        localStorage.removeItem("access_token");
        setValid(false);
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) return null;

  if (!valid) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
