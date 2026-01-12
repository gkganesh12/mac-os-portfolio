import { create } from 'zustand';

interface OSState {
  isMenuOpen: boolean;
  activeAppId: string | null;
  isLocked: boolean;
  isShutdownDialogOpen: boolean;
  toggleMenu: () => void;
  setActiveApp: (appId: string | null) => void;
  setLocked: (locked: boolean) => void;
  setShutdownDialogOpen: (open: boolean) => void;
}

export const useOSStore = create<OSState>((set) => ({
  isMenuOpen: false,
  activeAppId: null,
  isLocked: true,
  isShutdownDialogOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setActiveApp: (appId) => set({ activeAppId: appId }),
  setLocked: (locked) => set({ isLocked: locked }),
  setShutdownDialogOpen: (open) => set({ isShutdownDialogOpen: open }),
}));
