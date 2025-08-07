// src/mock/index.ts
import MockAdapter from "axios-mock-adapter";
import http from "@/lib/http"; // 引入你封装的实例
import { sidebarData } from "@/data/sidebar";

const mock = new MockAdapter(http, { delayResponse: 500 });

mock.onPost("/auth/login/").reply((config) => {
  const { username, password } = JSON.parse(config.data);
  if (username === "test@example.com" && password === "123") {
    return [
      200,
      {
        access: "mock-access-token",
        refresh: "mock-refresh-token",
      },
    ];
  } else {
    return [401, { detail: "用户名或密码错误" }];
  }
});

mock.onGet("/auth/validate/").reply((config) => {
  const authHeader = config.headers?.Authorization;
  if (authHeader === "Bearer mock-access-token") {
    return [200, { detail: "Token is valid." }];
  } else {
    return [401, { detail: "Token 无效或已过期" }];
  }
});

mock.onGet("/users").reply((config) => {
  return [200, sidebarData];
});

mock.onPost("/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);
  if (email === "test@example.com" && password === "123") {
    return [200, { message: "Login successful" }];
  }
  return [401, { message: "Invalid email or password" }];
});

export default {
  bootstrap() {
    console.log("✅ Mock 启动成功");
  },
};
