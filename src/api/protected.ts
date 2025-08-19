import http from "@/lib/http";
import type { SelectParams } from "@/data/select";

export interface Item {
  id: string;
  name: string;
}

export async function getdepartments(): Promise<Item[]> {
  const res = await http.get("/api/protected/departments");
  return res.data;
}

export async function getroles(): Promise<Item[]> {
  const res = await http.get("/api/protected/roles");
  return res.data;
}

export async function getselects(): Promise<SelectParams> {
  const res = await http.get("/api/protected/select");
  return res.data;
}
