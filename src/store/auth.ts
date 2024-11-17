import { create } from 'zustand';
import { User } from '../types';
import { neo4jService } from '../services/neo4j';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (username, password) => {
    try {
      const user = await neo4jService.getUser(username);
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  register: async (email, password, username) => {
    try {
      const user = await neo4jService.createUser({
        username,
        email,
        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`,
        bio: ''
      });
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));