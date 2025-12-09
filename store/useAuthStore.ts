import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    isPremium: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  login: (userData, token) =>
    set({
      user: userData,
      token,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    }),
}));
