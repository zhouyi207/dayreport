import MockAdapter from "axios-mock-adapter";
import http from "@/lib/http";

const mock = new MockAdapter(http, { delayResponse: 500 });

mock.onAny().passThrough();

export default {
  bootstrap() {
    console.log("✅ Mock 启动成功");
  },
};
