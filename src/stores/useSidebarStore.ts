// stores/useSidebarStore.ts
import { create } from "zustand";
import { getsiderbar } from "@/api/auth";
import { persist } from "zustand/middleware";
import type { Role, SidebarData } from "@/data/sidebar";

interface SidebarState {
  data: SidebarData | null;
  activateRole: Role | undefined;
  setActivateRole: (role: Role) => void;
  fetchSidebar: () => Promise<void>;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      data: null,
      roles: [],
      activateRole: undefined,

      setActivateRole: (role: Role) => {
        set({ activateRole: role });
      },

      fetchSidebar: async () => {
        if (get().data) return;
        try {
          const rawData = await getsiderbar();
          set({
            data: rawData,
            activateRole: rawData.roles[0],
          });
        } catch (e) {
          set({ data: null, activateRole: undefined });
        }
      },
    }),
    {
      name: "sidebar-storage",
      partialize: (state) => ({
        data: state.data,
        activateRole: state.activateRole,
      }),
    }
  )
);
