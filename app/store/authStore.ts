import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '../types';

interface AuthState {
  user: { role: UserRole ,id?:string } | null;
  isAuthenticated: boolean;
  setUser: (role: UserRole,id?:string ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (role: UserRole,id?:string ) => set({ user: { role ,id}, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);