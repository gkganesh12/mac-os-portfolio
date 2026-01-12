'use client';

import React, { useRef, useEffect } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { useMenuStore } from '@/store/menuStore';
import { MENU_CONFIG } from '@/config/menu.config';
import { MenuItem as MenuItemType } from '@/types/menu';
import { MenuItem } from './MenuItem';
import { SystemTray } from './SystemTray';
import { useAppLauncher } from '@/hooks/useAppLauncher';
import { useWindowStore } from '@/store/windowStore';

export const MenuBar: React.FC = () => {
  const activeAppId = useOSStore((state) => state.activeAppId);
  const { activeMenuTitle, setActiveMenu, closeMenus } = useMenuStore();
  const menuBarRef = useRef<HTMLDivElement>(null);
  const { launchApp } = useAppLauncher();
  const { closeWindow, minimizeWindow, toggleMaximize } = useWindowStore();
  const setActiveApp = useOSStore((state) => state.setActiveApp);

  const activeConfig = MENU_CONFIG[activeAppId || 'default'] || MENU_CONFIG.default;
  const displayTitle =
    activeAppId && activeAppId !== 'default' ? activeConfig.displayName : 'Deepak';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(event.target as Node)) {
        closeMenus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenus]);

  const handleAction = (item: MenuItemType) => {
    if (item.appId) {
      launchApp(item.appId);
    } else if (item.action) {
      item.action();
    }
    closeMenus();
  };

  const getSystemMenu = (): MenuItemType[] => [
    { label: 'About This Mac', action: () => launchApp('systemInfo') },
    { divider: true, label: 'div-1' },
    { label: 'System Settings...', disabled: true },
    { label: 'App Store...', disabled: true },
    { divider: true, label: 'div-2' },
    { label: 'Force Quit...', action: () => console.log('Force Quit') },
    { divider: true, label: 'div-3' },
    { label: 'Sleep', action: () => console.log('Sleep') },
    { label: 'Restart...', action: () => window.location.reload() },
    { label: 'Shut Down...', action: () => console.log('Shut Down') },
    { divider: true, label: 'div-4' },
    { label: 'Lock Screen', action: () => console.log('Lock') },
    { label: 'Log Out Deepak...', action: () => console.log('Log Out') },
  ];

  return (
    <div
      ref={menuBarRef}
      className="fixed top-0 right-0 left-0 z-[1000] flex h-[31px] w-full items-center bg-[#0f0f10]/85 px-2 text-[13px] font-medium text-[#f3f4f6] shadow-sm backdrop-blur-3xl select-none"
    >
      <div className="flex h-full items-center">
        {/* Apple Icon */}
        <div className="relative flex h-full items-center">
          <div
            className={`flex h-[26px] w-[38px] cursor-default items-center justify-center rounded-[4px] transition-colors ${
              activeMenuTitle === 'apple' ? 'bg-white/20 text-white' : 'hover:bg-white/10'
            }`}
            onClick={() => setActiveMenu(activeMenuTitle === 'apple' ? null : 'apple')}
          >
            <span className="mb-0.5 text-[18px] leading-none"></span>
          </div>

          {activeMenuTitle === 'apple' && (
            <div className="animate-in fade-in zoom-in-95 absolute top-[28px] left-0 min-w-[220px] rounded-lg border border-white/10 bg-[#161617]/90 p-1 shadow-2xl backdrop-blur-3xl duration-100">
              {getSystemMenu().map((item, idx) => (
                <MenuItem key={idx} item={item} onAction={() => handleAction(item)} />
              ))}
            </div>
          )}
        </div>

        {/* Dynamic App Menus */}
        <div className="ml-1 flex h-full items-center">
          {activeConfig.sections.map((section) => {
            const isAppMenu = section.title === activeConfig.displayName;
            const sectionTitle = isAppMenu ? displayTitle : section.title;

            return (
              <div key={section.title} className="relative flex h-full items-center gap-0.5">
                <button
                  onClick={() =>
                    setActiveMenu(activeMenuTitle === section.title ? null : section.title)
                  }
                  onMouseEnter={() => {
                    if (activeMenuTitle) setActiveMenu(section.title);
                  }}
                  className={`flex h-[26px] cursor-default items-center rounded-[4px] px-2.5 transition-colors ${
                    activeMenuTitle === section.title
                      ? 'bg-white/20 text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className={isAppMenu ? 'font-bold' : ''}>{sectionTitle}</span>
                </button>

                {activeMenuTitle === section.title && (
                  <div className="animate-in fade-in zoom-in-95 absolute top-[28px] left-0 min-w-[220px] rounded-lg border border-white/10 bg-[#161617]/90 p-1 shadow-2xl backdrop-blur-3xl duration-100">
                    {section.items.map((item, idx) => {
                      const enrichedItem = { ...item };
                      if (item.label === 'Close' && activeAppId && activeAppId !== 'default') {
                        enrichedItem.action = () =>
                          closeWindow(activeAppId, (nextId) => setActiveApp(nextId));
                      }
                      if (item.label === 'Minimize' && activeAppId && activeAppId !== 'default') {
                        enrichedItem.action = () =>
                          minimizeWindow(activeAppId, (nextId) => setActiveApp(nextId));
                      }
                      if (item.label === 'Zoom' && activeAppId && activeAppId !== 'default') {
                        enrichedItem.action = () => toggleMaximize(activeAppId);
                      }

                      return (
                        <MenuItem
                          key={idx}
                          item={enrichedItem}
                          onAction={() => handleAction(enrichedItem)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="ml-auto flex h-full items-center">
        <SystemTray />
      </div>
    </div>
  );
};
