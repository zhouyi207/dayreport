"use client";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";
import { useSidebarStore } from "@/stores/useSidebarStore";

import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  Component,
  ChartPie,
  Bot,
  FileStack,
  Route,
  Waypoints,
  Notebook,
} from "lucide-react";
import { useEffect } from "react";

type IconMapping = Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;
export const nameToIconMapping: IconMapping = {
  // 团队名称映射
  "Acme Inc": GalleryVerticalEnd,
  "Acme Corp.": AudioWaveform,
  "Evil Corp.": Command,

  // 导航标题映射
  预期边际利润来源分析: Component,
  预期边际利润可实现性分析: ChartPie,
  智能分析: Bot,
  备用材料: FileStack,

  // 项目名称映射
  工作计划: Route,
  工作安排: Waypoints,
  备忘录: Notebook,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, fetchSidebar } = useSidebarStore();

  useEffect(() => {
    if (!data) {
      fetchSidebar();
    }
  }, [data, fetchSidebar]);

  if (!data) return <Sidebar {...props}>No data available</Sidebar>;

  data.teams.forEach((element: any) => {
    const Icon = nameToIconMapping[element.name];
    if (Icon) {
      element.icon = Icon;
    }
  });

  data.navMain.forEach((element: any) => {
    const Icon = nameToIconMapping[element.title];
    if (Icon) {
      element.icon = Icon;
    }
  });

  data.projects.forEach((element: any) => {
    const Icon = nameToIconMapping[element.name];
    if (Icon) {
      element.icon = Icon;
    }
  });

  return (
    <Sidebar side="left" collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
