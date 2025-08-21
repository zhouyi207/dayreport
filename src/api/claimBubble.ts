import http from "@/lib/http";
import type { Selected } from "@/data/select";

export type DataItem = {
  指标: string;
  整体满期赔付率: number;
  人伤满期赔付率: number;
  车物满期赔付率: number;
  昨日新增报案数: number;
  "已决金额(万元)": number;
  已决件数: number;
  "未决金额(万元)": number;
  未决件数: number;
  零赔注销件数: number;
  零赔注销率: number;
  万元满期保费出险次数: number;
  "案均赔款（元）": number;
  "满期保费（万元）": number;
};

export type ClaimBubbleData = {
  地区: DataItem[];
  品牌: DataItem[];
};

export async function getclaimBubble(data: Selected): Promise<ClaimBubbleData> {
  const res = await http.post("/api/claim-bubble/data", data);
  return res.data;
}
