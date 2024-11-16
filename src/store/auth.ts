import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  register: (email: string, password: string, username: string) => void;
  logout: () => void;
}

const mockUser: User = {
  id: '1',
  username: 'johndoe',
  avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=johndoe',
  bio: 'Full-stack developer passionate about React and TypeScript',
  joinedAt: new Date(),
  following: [],
  followers: []
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (username, password) => {
    set({ user: mockUser, isAuthenticated: true });
  },
  register: (email, password, username) => {
    const newUser: User = {
      ...mockUser,
      username,
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`,
    };
    set({ user: newUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));