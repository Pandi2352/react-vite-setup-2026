import { create } from 'zustand';
import { User } from '@/types/auth.types';
import { storage } from '@/lib/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const initialUser = storage.get<User>('user');
const initialToken = storage.get<string>('access_token');

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  token: initialToken,
  isAuthenticated: !!initialToken,

  setAuth: (user, token) => {
    storage.set('user', user);
    storage.set('access_token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    storage.remove('user');
    storage.remove('access_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (updatedFields) =>
    set((state) => {
      if (!state.user) return state;
      const newUser = { ...state.user, ...updatedFields };
      storage.set('user', newUser);
      return { user: newUser };
    }),
}));
