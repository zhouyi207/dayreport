"use client";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";
import { type SidebarData } from "@/data/sidebar/type";

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

import axios from "axios";
import { useState, useEffect } from "react";

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

type AppSidebarProps = {
  getSidebarStatus: (open: boolean) => void;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({
  getSidebarStatus, // 确保命名一致
  ...props
}: AppSidebarProps) {
  const [data, setData] = useState<SidebarData | null>(null);
  const [loading, setLoading] = useState(true);
  const sidebar = useSidebar();
  // const [error, setError] = useState(null);

  useEffect(() => {
    getSidebarStatus(sidebar.open)
  }, [sidebar]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users");
        setData(response.data);
      } catch (err) {
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Sidebar {...props}>Loading...</Sidebar>;
  // if (error) return <Sidebar {...props}>Error: {error.message}</Sidebar>;
  if (!data) return <Sidebar {...props}>No data available</Sidebar>;

  data.teams.forEach((element) => {
    const Icon = nameToIconMapping[element.name];
    if (Icon) {
      element.icon = Icon;
    }
  });

  data.navMain.forEach((element) => {
    const Icon = nameToIconMapping[element.title];
    if (Icon) {
      element.icon = Icon;
    }
  });

  data.projects.forEach((element) => {
    const Icon = nameToIconMapping[element.name];
    if (Icon) {
      element.icon = Icon;
    }
  });

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
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
