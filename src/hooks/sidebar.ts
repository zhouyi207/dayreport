import { useState } from "react";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function usePersistentSidebarState(key = "sidebar_state", defaultValue = true) {
  const [open, setOpen] = useState(() => {
    const cookieValue = getCookie(key);
    return cookieValue === "true"
      ? true
      : cookieValue === "false"
      ? false
      : defaultValue;
  });

  return [open, setOpen] as const;
}

export default usePersistentSidebarState;