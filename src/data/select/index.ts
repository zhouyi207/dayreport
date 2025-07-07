import type { DateState, CheckState, SelectParams } from "./type";

export const selectParams: SelectParams = {
  date: [{ title: "日期筛选", options: ["起始日期", "结束日期"] }],
  check: [
    { title: "新旧车", options: ["新车", "旧车"] },
    {
      title: "销售渠道",
      options: ["直营", "直营平台", "经销商", "集团联营", "企业渠道"],
    },
    { title: "地区", options: ["华东", "华南", "华北", "西南", "西北", "华中", "其他"] },
    { title: "品牌", options: ["奥迪", "宝马", "奔驰", "丰田", "福特"] },
  ],
};

export type { DateState, CheckState, SelectParams };