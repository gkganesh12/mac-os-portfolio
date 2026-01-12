import { create } from 'zustand';

interface SpotlightState {
  isOpen: boolean;
  query: string;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  setQuery: (query: string) => void;
}

export const useSpotlightStore = create<SpotlightState>((set) => ({
  isOpen: false,
  query: '',
  openSpotlight: () => set({ isOpen: true, query: '' }),
  closeSpotlight: () => set({ isOpen: false, query: '' }),
  setQuery: (query) => set({ query }),
}));
