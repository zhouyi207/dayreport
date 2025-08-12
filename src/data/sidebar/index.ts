import type { SidebarData, Role } from "./type";

export const sidebarData: SidebarData = {
  user: {
    name: "周易",
    email: "demo@example.com",
    department: "产品精算部",
  },
  roles: [
    {
      name: "普通",
      permissions: [
        {
          title: "预期边际利润来源分析",
          url: "/origin",
          items: [
            {
              title: "边际利润表",
              url: "/marginal-profit",
            },
            {
              title: "承保气泡图",
              url: "/underwriting-bubble-chart",
            },
            {
              title: "承保新旧车气泡图",
              url: "/underwriting-trend-chart",
            },
          ],
        },
        {
          title: "预期边际利润可实现性分析",
          url: "/realize",
          items: [
            {
              title: "十等分检验图",
              url: "/decile",
            },
            {
              title: "理赔气泡图",
              url: "/claim-bubble-chart",
            },
            {
              title: "理赔整车统计趋势",
              url: "/claim-trend-total",
            },
            {
              title: "理赔非整车统计趋势",
              url: "/claim-trend-single",
            },
          ],
        },
        {
          title: "智能分析",
          url: "/ai",
          items: [
            {
              title: "迪保 AI",
              url: "/chat",
            },
          ],
        },
        {
          title: "备用材料",
          url: "/backup",
          items: [
            {
              title: "赔款追踪",
              url: "/trace",
            },
            {
              title: "业务情况进展",
              url: "/process",
            },
            {
              title: "整体气泡图",
              url: "/total-buble-chart",
            },
            {
              title: "整体趋势图（保单制）",
              url: "/total-trend-chart",
            },
          ],
        },
      ],
    },
    {
      name: "限制",
      permissions: [
        {
          title: "预期边际利润来源分析",
          url: "/origin",
          items: [
            {
              title: "边际利润表",
              url: "/marginal-profit",
            },
            {
              title: "承保气泡图",
              url: "/underwriting-bubble-chart",
            },
          ],
        },
      ],
    },
  ],
  tools: [
    {
      name: "工作计划",
      url: "#",
    },
    {
      name: "工作安排",
      url: "#",
    },
    {
      name: "备忘录",
      url: "#",
    },
    {
      name: "超级管理员",
      url: "/superuser",
    },
  ],
};

export type { SidebarData, Role };
