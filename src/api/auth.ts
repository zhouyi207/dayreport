// src/api/auth.ts
import http from "@/lib/http";
import type { SidebarData } from "@/data/sidebar";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface User {
  id: number;
  username: string;
  roles: string;
}

interface LogoutResponse {
  msg: string;
}

interface Me {
  id: number;
  username: string;
  name: string;
  department: string;
  work_id: number;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await http.post("/api/auth/login", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res.data;
}

export async function validateToken(): Promise<Me> {
  const res = await http.get("/api/auth/me");
  return res.data;
}

export async function getsiderbar(): Promise<SidebarData> {
  const res = await http.get("/api/auth/sidebar");
  return res.data;
}

export async function getuserList(): Promise<User[]> {
  const res = await http.get("/api/user_list");
  return res.data;
}

export async function LogOut(): Promise<LogoutResponse> {
  const res = await http.post("/api/auth/logout", {
    refresh_token: localStorage.getItem("refresh_token"),
  });
  return res.data;
}
