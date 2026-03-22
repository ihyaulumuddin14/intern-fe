import { create } from 'zustand';

type LandingPageMenuType = {
  isOpen: boolean,
  open: () => void,
  close: () => void,
  toggle: () => void
}

export const useLandingPageMenuStore = create<LandingPageMenuType>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));