import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  resetToDefaults: () => void;
}

const defaultTheme = {
  primaryColor: '#3B82F6', // blue-500
  secondaryColor: '#1F2937', // gray-800
  textColor: '#F9FAFB', // gray-50
  backgroundColor: '#111827', // gray-900
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...defaultTheme,
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setSecondaryColor: (color) => set({ secondaryColor: color }),
      setTextColor: (color) => set({ textColor: color }),
      setBackgroundColor: (color) => set({ backgroundColor: color }),
      resetToDefaults: () => set(defaultTheme),
    }),
    {
      name: 'theme-storage',
    }
  )
);