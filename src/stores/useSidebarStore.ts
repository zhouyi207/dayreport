import { create } from "zustand";
import { getsiderbar } from "@/api/auth";
import type { Role, SidebarData } from "@/data/sidebar";
import { devtools } from "zustand/middleware";

interface SidebarState {
  data: SidebarData | null;
  activateRole: Role | undefined;
  setActivateRole: (role: Role) => void;
  init: () => void;
  fetchSidebar: () => Promise<void>;
}


export const useSidebarStore = create<SidebarState>()(
  devtools((set, get) => ({
    data: null,
    activateRole: undefined,

    init: async () => {
      set({ data: null, activateRole: undefined });
    },

    setActivateRole: (role: Role) => {
      set({ activateRole: role });
    },

    fetchSidebar: async () => {
      try {
        const rawData = await getsiderbar();
        set({
          data: rawData,
        });
      } catch (e) {
        set({ data: null, activateRole: undefined });
      }
    },
  }))
);
