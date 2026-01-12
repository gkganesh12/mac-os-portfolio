'use client';

import { useWindowStore } from '@/store/windowStore';
import { useOSStore } from '@/store/useOSStore';
import { APPS_CONFIG } from '@/config/apps.config';

export const useAppLauncher = () => {
  const { openWindow, focusWindow, windows } = useWindowStore();
  const { setActiveApp } = useOSStore();

  const launchApp = (appId: string) => {
    const config = APPS_CONFIG[appId];

    if (!config) {
      console.warn(`No app config found for ID: ${appId}`);
      return;
    }

    if (config.type === 'external' && config.url) {
      window.open(config.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (config.type === 'internal') {
      // If window is already open, focus it
      if (windows[appId]) {
        focusWindow(appId);
      } else {
        openWindow(appId, config.name);
      }

      // Update global OS status focus
      setActiveApp(appId);
    }
  };

  return { launchApp };
};
