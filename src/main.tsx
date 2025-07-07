import { createBrowserRouter, RouterProvider } from "react-router";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./app/dashboard/page.tsx";
import { MarginalProfit } from "./app/dashboard/marginal-profit.tsx";
import { UnderwritingBubbleChart } from "./app/dashboard/underwriting-bubble-chart.tsx";
import { ZZ } from "./app/dashboard/zz.tsx";

// Auth
import Auth from "./app/auth/auth.tsx";
import { LoginForm } from "./app/auth/login-form.tsx";
import { ChangeForm } from "./app/auth/change-form.tsx";
import { ForgetForm } from "./app/auth/forget-form.tsx";
import { SignForm } from "./app/auth/sign-form.tsx";
import mock from "./mock";
mock.bootstrap();

const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
    handle: { breadcrumb: "主页" },
    children: [
      { path: "test", Component: ZZ, handle: { breadcrumb: "测试" }, },
      { path: "marginal-profit", Component: MarginalProfit, handle: { breadcrumb: "边际利润表" }, },
      { path: "underwriting-bubble-chart", Component: UnderwritingBubbleChart, handle: { breadcrumb: "承保气泡图" }, },
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
