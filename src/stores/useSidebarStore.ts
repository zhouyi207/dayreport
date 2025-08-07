// stores/useSidebarStore.ts
import { create } from "zustand";
import { getsiderbar } from "@/api/auth";
import { persist } from "zustand/middleware";
import type { SidebarData } from "@/data/sidebar";

interface SidebarState {
  data: SidebarData | null;
  fetchSidebar: () => Promise<void>;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      data: null,
      fetchSidebar: async () => {
        // 已有数据就不重复请求
        if (get().data) return;
        try {
          const rawData = await getsiderbar();
          set({ data: rawData });
        } catch (e) {
          set({ data: null });
        }
      },
    }),
    {
      name: "sidebar-storage", // localStorage key
      partialize: (state) => ({ data: state.data }), // 只持久化 data，loading 不持久化
    }
  )
);
