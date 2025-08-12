// stores/useSidebarStore.ts
import { create } from "zustand";
import { getsiderbar } from "@/api/auth";
import type { Role, SidebarData } from "@/data/sidebar";

interface SidebarState {
  data: SidebarData | null;
  activateRole: Role | undefined;
  setActivateRole: (role: Role) => void;
  init: () => void;
  fetchSidebar: () => Promise<void>;
}

export const useSidebarStore = create<SidebarState>()((set, get) => ({
  data: null,
  roles: [],
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
        activateRole: rawData.roles[0],
      });
    } catch (e) {
      set({ data: null, activateRole: undefined });
    }
  },
}));
