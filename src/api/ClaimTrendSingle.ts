import http from "@/lib/http";
import type { AxiosRequestConfig } from "axios";
import type { Selected } from "@/data/select";

export interface DataItem {
  日期: string;
  [key: string]: string;
}

export interface TrendData {
  列名: string[];
  数据: DataItem[];
}

export async function getclaimTrendSingle(
  data: Selected,
  signal?: AbortSignal
): Promise<TrendData> {
  const config: AxiosRequestConfig = {
    signal,
  };
  const res = await http.post("/api/claim-trend-single/data", data, config);
  return res.data;
}
