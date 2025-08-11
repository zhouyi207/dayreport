// src/mock/index.ts
import MockAdapter from "axios-mock-adapter";
import http from "@/lib/http"; // 引入你封装的实例
import { sidebarData } from "@/data/sidebar";

const mock = new MockAdapter(http, { delayResponse: 500 });

mock.onGet("/users").reply((config) => {
  return [200, sidebarData];
});


mock.onAny().passThrough();

export default {
  bootstrap() {
    console.log("✅ Mock 启动成功");
  },
};
