import http from "@/lib/http";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  work_id: string;
  roles: string[];
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  department_id: string;
  work_id: string;
}

interface UpdateUser {
  name?: string;
  email?: string;
  work_id?: string;
  department_id?: string;
}

export async function getuserList(): Promise<User[]> {
  const res = await http.get("/api/users/list");
  return res.data;
}

export async function getuserId(user_id: string): Promise<User> {
  const res = await http.get(`/api/users/${user_id}`);
  return res.data;
}

export async function createuser(data: CreateUser): Promise<User> {
  const res = await http.post(`/api/users/create`, data);
  return res.data;
}

export async function updateuser(
  user_id: string,
  data: UpdateUser
): Promise<User> {
  const res = await http.put(`/api/users/${user_id}`, data);
  return res.data;
}

export async function deleteuser(user_id: string) {
  const res = await http.delete(`/api/users/${user_id}`);
  return res.data;
}

export type { User };
