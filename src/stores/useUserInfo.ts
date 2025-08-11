import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "@/data/userinfo";

interface UserInfoState {
  data: UserInfo | null;
  setData: (data: UserInfo) => void;
  clearData: () => void;
}

export const useUserInfo = create<UserInfoState>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }), // 直接存 data
      clearData: () => set({ data: null }),
    }),
    {
      name: "userinfo",
      partialize: (state) => ({ data: state.data }), // 只持久化 data
    }
  )
);
