import http from "@/lib/http";
import type { Selected } from "@/data/select";

export interface DataItem {
  满期保费分组: string;
  "当前组签单保费（万元）": number;
  "当前组已暴露鼎然精算纯风险保费（万元）": number;
  "当前组满期保费（万元）": number;
  当前组出险次数: number;
  "当前组已决赔款（万元）": number;
  "当前组未决赔款（万元）": number;
  "当前组已报告赔款（万元）": number;
  当前组鼎然预期赔付率: number;
  当前组实际满期赔付率: number;
  万元满期保费出险次次数: number;
  绝对偏差率: number;
}

export type DecileData = {
  上升系数: number;
  偏差率: number;
  数据: DataItem[];
};

export async function getdecile(data: Selected): Promise<DecileData> {
  const res = await http.post("/api/decile/data", data);
  return res.data;
}
