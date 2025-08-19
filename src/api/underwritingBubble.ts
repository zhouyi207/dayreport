import http from "@/lib/http";
import type { Selected } from "@/data/select";

export interface DataItem {
  分组序号: string;
  标费赔付率分组: string;
  标准保费: number;
  签单保费: number;
  平均定价系数: number;
  标准保费占比: string;
  签单保费占比: string;
  标准预期赔付率: string;
  签单预期赔付率: string;
  实际满期赔付率: string;
  预实差: string;
}

export async function getunderwritingBubble(
  data: Selected
): Promise<DataItem[]> {
  const res = await http.post("/api/underwriting-bubble/data", data);
  return res.data;
}
