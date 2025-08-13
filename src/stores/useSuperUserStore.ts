import { create } from "zustand";
import { getdepartments, getroles, type Item } from "@/api/protected";

interface SuperUserState {
  departments: Item[];
  roles: Item[];
  fetchData: () => Promise<void>;
}

export const useSuperUserStore = create<SuperUserState>()((set, get) => ({
  departments: [],
  roles: [],
  fetchData: async () => {
    try {
      const rawdepartments = await getdepartments();
      const rawroles = await getroles();
      set({ departments: rawdepartments, roles: rawroles });
    } catch (e) {
      set({ departments: [], roles: [] });
    }
  },
}));
