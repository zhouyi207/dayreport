import axios from "axios";
import { triggerUnauthorized, triggerForbidden } from "./navigation";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "",
  timeout: 10000,
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const url = error.config.url || "";

    if (status === 401 && !url.includes("/auth/login/")) {
      localStorage.removeItem("token");
      triggerUnauthorized();
    } else if (status === 403) {
      triggerForbidden();
    }

    return Promise.reject(error);
  }
);

export default http;
