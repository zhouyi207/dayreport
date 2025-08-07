// src/lib/http.ts
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "", // 配置你的 API 地址
  timeout: 10000,
});

// 请求拦截器：加上 token
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理错误
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response?.status === 401 &&
        !error.config.url?.includes("/auth/login/")) ||
      error.response?.status === 403
    ) {
      // token 无效或过期
      localStorage.removeItem("token");

      // 自动跳转登录页
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default http;
