"use client";

import { RoleSwitcher } from "@/components/role-switcher";
import { NavMain } from "@/components/nav-main";
import { NavTools } from "@/components/nav-tools";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useEffect } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, fetchSidebar } = useSidebarStore();

  useEffect(() => {
    if (!data) {
      fetchSidebar();
    }
  }, []);

  if (!data) return <Sidebar {...props}>No data available</Sidebar>;
  return (
    <Sidebar side="left" collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <RoleSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavTools />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
