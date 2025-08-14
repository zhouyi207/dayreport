import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RequireAuth } from "@/components/RequireAuth";

// dashboard
import Dashboard from "./app/dashboard/page.tsx";
import MarginalProfit from "./app/dashboard/marginal-profit.tsx";
import UnderwritingBubbleChart from "./app/dashboard/underwriting-bubble-chart.tsx";
import UnderwritingTrendChart from "./app/dashboard/underwriting-trend-chart.tsx";
import Decile from "./app/dashboard/decile.tsx";
import ClaimBubbleChart from "./app/dashboard/claim-bubble-chart.tsx";
import Test from "./app/test.tsx";
import RoleManage from "./app/superUser/RoleManage.tsx";
import UserManage from "./app/superUser/UserManage.tsx";

// Auth
import Auth from "./app/auth/auth.tsx";
import LoginForm from "./app/auth/login-form.tsx";
import ChangeForm from "./app/auth/change-form.tsx";
import ForgetForm from "./app/auth/forget-form.tsx";
import SignForm from "./app/auth/sign-form.tsx";

// 403, 404
import NotFound from "./components/NotFound.tsx";
import NoPermission from "./components/NoPermission.tsx";

import { GlobalAuthListener } from "./components/GlobalAuthListener";

// mock
import mock from "./mock";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import usePersistentState from "./hooks/sidebar.ts";
mock.bootstrap();

function AppLayout({ children }: { children: React.ReactNode }) {
  const [open] = usePersistentState("sidebar_state", true);

  return (
    <SidebarProvider defaultOpen={open}>
      <GlobalAuthListener />
      <RequireAuth>{children}</RequireAuth>
    </SidebarProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    ),
    handle: { breadcrumb: "主页" },
    children: [
      {
        index: true,
        Component: Test, // 主页默认展示的组件
      },
      { path: "test", Component: Test, handle: { breadcrumb: "测试" } },
      {
        path: "marginal-profit",
        Component: MarginalProfit,
        handle: { breadcrumb: "边际利润表" },
      },
      {
        path: "underwriting-bubble-chart",
        Component: UnderwritingBubbleChart,
        handle: { breadcrumb: "承保气泡图" },
      },
      {
        path: "underwriting-trend-chart",
        Component: UnderwritingTrendChart,
        handle: { breadcrumb: "承保趋势图" },
      },
      {
        path: "decile",
        Component: Decile,
        handle: { breadcrumb: "十等分检验图" },
      },
      {
        path: "claim-bubble-chart",
        Component: ClaimBubbleChart,
        handle: { breadcrumb: "理赔气泡图" },
      },
      {
        path: "usermanage",
        Component: UserManage,
        handle: { breadcrumb: "用户管理" },
      },
      {
        path: "rolemanage",
        Component: RoleManage,
        handle: { breadcrumb: "角色管理" },
      },
      {
        path: "/no-permission",
        Component: NoPermission,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/auth",
    Component: Auth,
    children: [
      { index: true },
      { path: "login", Component: LoginForm },
      { path: "change", Component: ChangeForm },
      { path: "forget", Component: ForgetForm },
      { path: "sign", Component: SignForm },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
