import { create } from 'zustand';

interface OSState {
  isMenuOpen: boolean;
  activeAppId: string | null;
  toggleMenu: () => void;
  setActiveApp: (appId: string | null) => void;
}

export const useOSStore = create<OSState>((set) => ({
  isMenuOpen: false,
  activeAppId: null,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setActiveApp: (appId) => set({ activeAppId: appId }),
}));
