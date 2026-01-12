'use client';

import React from 'react';
import { MenuItem as MenuItemType } from '@/types/menu';

import { useAppLauncher } from '@/hooks/useAppLauncher';

interface MenuItemProps {
  item: MenuItemType;
  onAction?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAction }) => {
  const { launchApp } = useAppLauncher();

  if (item.divider) {
    return <div className="mx-1 my-1 border-t border-white/5" />;
  }

  return (
    <button
      onClick={() => {
        if (!item.disabled) {
          if (item.appId) {
            launchApp(item.appId);
          } else if (item.action) {
            item.action();
          }
          onAction?.();
        }
      }}
      disabled={item.disabled}
      className={`flex w-full items-center rounded-[4px] px-4 py-0.5 text-[13px] font-medium transition-colors ${
        item.disabled
          ? 'cursor-default text-white/30'
          : 'cursor-default text-[#f3f4f6] hover:bg-[#007aff] hover:text-white'
      } `}
    >
      <span className="flex-1 text-left">{item.label}</span>

      {item.children && <span className="ml-4 text-[10px] opacity-60">▶</span>}
    </button>
  );
};
