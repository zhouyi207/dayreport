"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

import { useSidebarStore } from "@/stores/useSidebarStore";
import {
  Component,
  ChartPie,
  Bot,
  FileStack,
} from "lucide-react";

type IconMapping = Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;
export const nameToIconMapping: IconMapping = {
  // 导航标题映射
  预期边际利润来源分析: Component,
  预期边际利润可实现性分析: ChartPie,
  智能分析: Bot,
  备用材料: FileStack,
};

export function NavMain() {
  const { activateRole } = useSidebarStore();
  const items = activateRole?.permissions;

  if (!items) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>报表</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const ItemIcon = nameToIconMapping[item.title];
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={true}
              // defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {ItemIcon && <ItemIcon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
