import { useState } from "react";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
}

function usePersistentState<T extends string | boolean>(
  key: string,
  defaultValue: T
) {
  const [state, _setState] = useState<T>(() => {
    const cookieValue = getCookie(key);

    if (cookieValue === undefined) return defaultValue;

    // 如果默认值是 boolean，就把 cookieValue 转成 boolean
    if (typeof defaultValue === "boolean") {
      return (cookieValue === "true") as T;
    }

    // 否则直接当字符串返回
    return cookieValue as T;
  });

  const setState = (value: T | ((prev: T) => T)) => {
    _setState((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value;
      setCookie(key, String(newValue));
      return newValue;
    });
  };

  return [state, setState] as const;
}

export default usePersistentState;
