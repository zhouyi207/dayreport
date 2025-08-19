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
import { useShortcut } from "@/hooks/use-shortcut";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { GalleryVerticalEnd, AudioWaveform, UserCog } from "lucide-react";
import usePersistentState from "@/hooks/sidebar";
import type { Role } from "@/data/sidebar";
import { useEffect } from "react";

type IconMapping = Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;

export function RoleSwitcher() {
  const { isMobile } = useSidebar();
  const { data, activateRole, setActivateRole } = useSidebarStore();
  const [rolename, setRolename] = usePersistentState<string>("role_name", "");

  const nameToIconMapping: IconMapping = {
    管理员: UserCog,
    普通: GalleryVerticalEnd,
    限制: AudioWaveform,
  };

  const setRole = (newRole: Role) => {
    setRolename(newRole.name);
    setActivateRole(newRole);
  };

  data?.roles.forEach((role, index) => {
    useShortcut([`${index + 1}`], () => setRole(role), {
      requireCtrlOrMeta: false,
      preventDefault: false,
    });
  });

  useEffect(() => {
    if (!data?.roles?.length) return;

    const foundRole = data.roles.find((item: Role) => item.name === rolename);
    if (foundRole) {
      if (activateRole?.name !== foundRole.name) {
        setRole(foundRole);
      }
    } else {
      setRole(data.roles[0]);
    }
  }, [rolename, data]);

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
              选择角色
            </DropdownMenuLabel>
            {data?.roles.map((role, index) => {
              const IconComponent = nameToIconMapping[role.name];
              return (
                <DropdownMenuItem
                  key={role.name}
                  onClick={() => setRole(role)}
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
