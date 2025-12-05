import { create } from 'zustand';

export type HeroMode = 'systems' | 'landing';

interface HomeState {
  mode: HeroMode;
  setMode: (mode: HeroMode) => void;
  toggleMode: () => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  mode: 'systems',
  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'systems' ? 'landing' : 'systems'
    }))
}));