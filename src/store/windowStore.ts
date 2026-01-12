import { create } from 'zustand';
import { APPS_CONFIG } from '@/config/apps.config';

interface WindowInstance {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowState {
  windows: Record<string, WindowInstance>;
  activeWindowId: string | null;
  maxZIndex: number;
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string, onFocusNext?: (nextId: string) => void) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string, onFocusNext?: (nextId: string) => void) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (
    id: string,
    idOrWidth: string | number,
    height?: number,
    x?: number,
    y?: number,
  ) => void;
  resetWindows: () => void;
}

export const useWindowStore = create<WindowState>((set, get) => ({
  windows: {},
  activeWindowId: null,
  maxZIndex: 100,

  openWindow: (id, title) => {
    const { windows, maxZIndex } = get();
    if (windows[id] && windows[id].isOpen) {
      get().focusWindow(id);
      return;
    }

    const config = APPS_CONFIG[id];
    const width = config?.width || 800;
    const height = config?.height || 600;

    // Calculate center relative to viewport
    const x = Math.max(0, (window.innerWidth - width) / 2);
    const y = Math.max(31, (window.innerHeight - height) / 2);

    const newZIndex = maxZIndex + 1;

    set({
      windows: {
        ...windows,
        [id]: {
          id,
          title,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: newZIndex,
          position: { x, y },
          size: { width, height },
        },
      },
      activeWindowId: id,
      maxZIndex: newZIndex,
    });
  },

  closeWindow: (id, onFocusNext) => {
    const { windows } = get();
    const newWindows = { ...windows };
    delete newWindows[id];

    const windowIds = Object.keys(newWindows).filter((wid) => !newWindows[wid].isMinimized);
    const newActiveId = windowIds.length > 0 ? windowIds[windowIds.length - 1] : null;

    if (onFocusNext) {
      onFocusNext(newActiveId || 'default');
    }

    set({
      windows: newWindows,
      activeWindowId: newActiveId,
    });
  },

  focusWindow: (id) => {
    const { windows, maxZIndex, activeWindowId } = get();
    if (activeWindowId === id && windows[id] && !windows[id].isMinimized) return;

    if (!windows[id]) return;

    const newZIndex = maxZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], zIndex: newZIndex, isMinimized: false },
      },
      activeWindowId: id,
      maxZIndex: newZIndex,
    });
  },

  minimizeWindow: (id, onFocusNext) => {
    const { windows, activeWindowId } = get();
    const isCurrentlyActive = activeWindowId === id;

    let nextActiveId = activeWindowId;
    if (isCurrentlyActive) {
      const remainingIds = Object.keys(windows).filter(
        (wid) => wid !== id && !windows[wid].isMinimized,
      );
      nextActiveId = remainingIds.length > 0 ? remainingIds[remainingIds.length - 1] : null;
    }

    if (onFocusNext) {
      onFocusNext(nextActiveId || 'default');
    }

    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isMinimized: true },
      },
      activeWindowId: nextActiveId,
    });
  },

  toggleMaximize: (id) => {
    const { windows } = get();
    if (!windows[id]) return;
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isMaximized: !windows[id].isMaximized },
      },
    });
  },

  updateWindowPosition: (id, x, y) => {
    const { windows } = get();
    if (!windows[id]) return;
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], position: { x, y } },
      },
    });
  },

  updateWindowSize: (id, widthOrId, height, x, y) => {
    const { windows } = get();
    // Support two signatures for backward compatibility or flexibility
    const targetId = typeof id === 'string' ? id : (widthOrId as string);
    const newWidth = typeof widthOrId === 'number' ? widthOrId : (height as number);
    const newHeight = typeof height === 'number' ? height : (x as number);
    const newX = typeof x === 'number' ? x : (y as number);
    const newY = typeof y === 'number' ? y : undefined;

    if (!windows[targetId]) return;

    const current = windows[targetId];
    set({
      windows: {
        ...windows,
        [targetId]: {
          ...current,
          size: {
            width: Math.max(newWidth, 300),
            height: Math.max(newHeight, 200),
          },
          position: {
            x: newX !== undefined ? newX : current.position.x,
            y: newY !== undefined ? newY : current.position.y,
          },
        },
      },
    });
  },
  resetWindows: () => {
    set({
      windows: {},
      activeWindowId: null,
      maxZIndex: 100,
    });
  },
}));
