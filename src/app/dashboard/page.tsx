import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import React from "react";
import { Outlet, useMatches, type UIMatch } from "react-router";

type CustomRouteMatch = UIMatch & {
  handle?: {
    breadcrumb?: string;
  };
};

function getBreadcrumbLabel(match: CustomRouteMatch) {
  // 使用类型守卫进行安全访问
  if (match.handle?.breadcrumb !== undefined) {
    return match.handle.breadcrumb;
  }
  const pathParts = match.pathname.split("/").filter((part) => part);
  return pathParts.length > 0 ? pathParts[pathParts.length - 1] : "Home";
}

export default function Dashboard() {
  const matches = useMatches() as CustomRouteMatch[];
  const { open } = useSidebar();

  return (
    <div className="flex overflow-hidden h-screen">
      <AppSidebar />
      <div
        className={`transition-all duration-300 ${
          open ? "w-[calc(100vw-18rem)]" : "w-[calc(100vw-4rem)]"
        }`}
      >
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {matches.map((match, index) => {
                  const label = getBreadcrumbLabel(match);
                  const isLast = index === matches.length - 1;

                  return (
                    <React.Fragment key={`match.pathname-${index}`}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={match.pathname}>
                            {label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
