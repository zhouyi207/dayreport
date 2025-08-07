// src/api/auth.ts
import http from "@/lib/http";
import type { SidebarData } from "@/data/sidebar";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await http.post("/auth/login/", data);
  return res.data;
}

export async function validateToken(): Promise<void> {
  await http.get("/auth/validate/");
}

export async function getsiderbar(): Promise<SidebarData> {
  const res = await http.get("/users");
  return res.data;
}
