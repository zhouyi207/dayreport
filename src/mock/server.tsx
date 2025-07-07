import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { sidebarData } from "@/data/sidebar";

export default {
  bootstrap() {
    var mock = new MockAdapter(axios);
    // 在这里写构造请求
    mock.onGet("/users").reply(200, sidebarData);
    mock.onPost("/login").reply((config) => {
      const { email, password } = JSON.parse(config.data);
      if (email === "test@example.com" && password === "123") {
        return [200, { message: "Login successful" }];
      }
      return [401, { message: "Invalid email or password" }];
    });
  },
};
