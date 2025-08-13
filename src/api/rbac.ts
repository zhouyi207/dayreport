import http from "@/lib/http";

interface AssignRole {
  user_id: string;
  role_ids: string;
}

interface MSG {
  msg: string;
}

export interface CreateRole {
  name: string;
}


interface Permission {
  level_1_name: string;
  id: number;
  level_2_id: number;
  level_2_url: string;
  level_1_id: number;
  name: string;
  level_1_url: string;
  level_2_name: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export async function assignroles(data: AssignRole): Promise<MSG> {
  const res = await http.post("/api/rbac/assign_role", data);
  return res.data;
}

export async function listroles(): Promise<Role[]> {
  const res = await http.get("/api/rbac/list_roles");
  return res.data;
}
