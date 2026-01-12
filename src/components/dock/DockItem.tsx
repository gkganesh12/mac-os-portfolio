'use client';

import React from 'react';
import { useOSStore } from '@/store/useOSStore';
import { DockItemConfig } from '@/config/dock.config';
import { useWindowStore } from '@/store/windowStore';
import { useAppLauncher } from '@/hooks/useAppLauncher';

interface DockItemProps {
  item: DockItemConfig;
}

export const DockItem: React.FC<DockItemProps> = ({ item }) => {
  const { activeAppId } = useOSStore();
  const { windows } = useWindowStore();
  const { launchApp } = useAppLauncher();

  const Icon = item.icon;
  const isRunning = !!windows[item.id];
  const isFocused = activeAppId === item.id;

  return (
    <div className="group relative flex flex-col items-center">
      {/* Tooltip */}
      <div className="pointer-events-none absolute -top-12 scale-0 rounded-md border border-white/10 bg-zinc-800/80 px-3 py-1 text-[12px] whitespace-nowrap text-white shadow-lg backdrop-blur-md transition-transform group-hover:scale-100">
        {item.label}
      </div>

      <button
        onClick={() => launchApp(item.id)}
        className={`relative flex h-[50px] w-[50px] items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 ${isFocused ? 'bg-white/20' : 'bg-transparent'} `}
      >
        <div className="relative">
          <Icon
            size={36}
            strokeWidth={1.5}
            className={` ${item.type === 'folder' ? 'text-blue-400' : 'text-white/90'} transition-colors duration-200`}
          />
          {/* Active Indicator Dot (Running) */}
          {isRunning && (
            <div
              className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white shadow-sm ${isFocused ? 'opacity-100' : 'opacity-40'}`}
            />
          )}
        </div>
      </button>
    </div>
  );
};
