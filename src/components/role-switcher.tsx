"use client";

import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { GalleryVerticalEnd, AudioWaveform } from "lucide-react";

type IconMapping = Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;
export const nameToIconMapping: IconMapping = {
  普通: GalleryVerticalEnd,
  限制: AudioWaveform,
};

export function RoleSwitcher() {
  const { isMobile } = useSidebar();
  const { data, activateRole, setActivateRole } = useSidebarStore();

  if (!activateRole) {
    return null;
  }

  const ActiveIcon = nameToIconMapping[activateRole.name];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {ActiveIcon && <ActiveIcon className="size-4" />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activateRole.name}
                </span>
                <span className="truncate text-xs">这里填充一些</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {data?.roles.map((role, index) => {
              const IconComponent = nameToIconMapping[role.name];
              return (
                <DropdownMenuItem
                  key={role.name}
                  onClick={() => setActivateRole(role)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    {IconComponent && (
                      <IconComponent className="size-3.5 shrink-0" />
                    )}
                  </div>
                  {role.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
