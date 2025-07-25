import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  roles: string[];
  token: string;
}

interface UserState {
  user: User | null;
  count: number;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// 创建用户状态管理
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      count: 0,
      setUser: (user: User) => set({ user }),
      setCount: (count: number) => set({ count }),
      clearUser: () => set({ user: null }),
      getToken: () => get().user?.token,
    }),
    {
      name: 'user-storage', // 持久化存储的键名
    }
  )
);