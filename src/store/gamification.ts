import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GamificationState {
  score: number;
  level: number;
  badges: string[];
  addPoints: (points: number) => void;
  addBadge: (badge: string) => void;
}

const calculateLevel = (score: number) => Math.floor(Math.sqrt(score / 100)) + 1;

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      score: 0,
      level: 1,
      badges: [],
      addPoints: (points) =>
        set((state) => {
          const newScore = state.score + points;
          const newLevel = calculateLevel(newScore);
          return { score: newScore, level: newLevel };
        }),
      addBadge: (badge) =>
        set((state) => ({
          badges: state.badges.includes(badge)
            ? state.badges
            : [...state.badges, badge],
        })),
    }),
    {
      name: 'gamification-storage',
    }
  )
);