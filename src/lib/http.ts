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
    const status = error.response?.status;
    const url = error.config.url || "";

    if (status === 401 && !url.includes("/auth/login/")) {
      // token 无效或过期，跳登录
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    } else if (status === 403) {
      // 无权限，跳无权限页面或者弹提示
      window.location.href = "/no-permission";
    }

    return Promise.reject(error);
  }
);

export default http;
