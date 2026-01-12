import { create } from 'zustand';

interface MenuState {
  activeMenuTitle: string | null;
  setActiveMenu: (title: string | null) => void;
  closeMenus: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  activeMenuTitle: null,
  setActiveMenu: (title) => set({ activeMenuTitle: title }),
  closeMenus: () => set({ activeMenuTitle: null }),
}));
