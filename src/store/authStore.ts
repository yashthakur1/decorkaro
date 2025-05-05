import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  setUser: (user: any | null) => void;
  setAuthenticated: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user }),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
}));