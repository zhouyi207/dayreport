import http from "@/lib/http";

export interface MarginalPorfit {
  分组序号: string;
  标费预期赔付率分组: string;
  本年签单保费: number;
  本年签单保费占比: string;
  本年平均定价系数: number;
  本年签单预期赔付率: string;
  本年边际贡献额: number;
  本月签单保费: number;
  本月签单保费占比: string;
  本月平均定价系数: number;
  本月签单预期赔付率: string;
  本月边际贡献额: number;
  昨日签单保费: number;
  昨日签单保费占比: string;
  昨日平均定价系数: number;
  昨日签单预期赔付率: string;
  昨日边际贡献额: number;
}

export interface TotalMarginalProfit {
  v1: {
    整体: MarginalPorfit[];
    新车: MarginalPorfit[];
    旧车: MarginalPorfit[];
  };
  v2: {
    整体: MarginalPorfit[];
    新车: MarginalPorfit[];
    旧车: MarginalPorfit[];
  };
}

export async function getmarginalProfit(): Promise<TotalMarginalProfit> {
  const res = await http.get("/api/marginal-profit/data");
  return res.data;
}
