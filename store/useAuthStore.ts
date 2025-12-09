import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  hydrated: boolean; // <-- nouvel état
  login: (userData: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loadAuthState: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  hydrated: false, // <-- par défaut false

  login: async (userData, token) => {
    set({ user: userData, token, isLoggedIn: true });
    await AsyncStorage.setItem('@user', JSON.stringify(userData));
    await AsyncStorage.setItem('@token', token);
  },

  logout: async () => {
    set({ user: null, token: null, isLoggedIn: false });
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
  },

  loadAuthState: async () => {
    const userJson = await AsyncStorage.getItem('@user');
    const token = await AsyncStorage.getItem('@token');

    if (userJson && token) {
      const user = JSON.parse(userJson);
      set({ user, token, isLoggedIn: true });
    }

    set({ hydrated: true });
  },
}));
