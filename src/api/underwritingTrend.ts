import http from "@/lib/http";
import type { Selected } from "@/data/select";

export interface DataItem {
  日期: string;
  [key: string]: string;
}

export interface TrendData {
  列名: string[];
  数据: DataItem[];
}

export async function getunderwritingTrend(data: Selected): Promise<TrendData> {
  const res = await http.post("/api/underwriting-trend/data", data);
  return res.data;
}
