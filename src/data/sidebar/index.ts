import type {  SidebarData, Team, NavItem, Project } from "./type";

export const sidebarData: SidebarData = {
  user: {
    name: "周易",
    email: "m@bydpcic.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "预期边际利润来源分析",
      url: "#",
      isActive: true,
      items: [
        { title: "边际利润表", url: "/marginal-profit" },
        { title: "承保气泡图", url: "/underwriting-bubble-chart" },
        { title: "承保新旧车气泡图", url: "#" },
      ],
    },
    {
      title: "预期边际利润可实现性分析",
      url: "#",
      items: [
        { title: "十等分检验图", url: "#" },
        { title: "理赔气泡图", url: "#" },
        { title: "理赔整车统计趋势", url: "#" },
        { title: "理赔非整车统计趋势", url: "#" },
      ],
    },
    {
      title: "智能分析",
      url: "#",
      items: [
        { title: "迪保 AI", url: "#" },
      ],
    },
    {
      title: "备用材料",
      url: "#",
      items: [
        { title: "赔款追踪", url: "#" },
        { title: "业务情况进展", url: "#" },
        { title: "整体气泡图", url: "#" },
        { title: "整体趋势图（保单制）", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "工作计划", url: "#" },
    { name: "工作安排", url: "#" },
    { name: "备忘录", url: "#" },
  ],
};

export { type SidebarData, type Team, type NavItem, type Project };