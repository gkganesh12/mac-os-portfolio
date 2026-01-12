'use client';

import React from 'react';
import { useOSStore } from '@/store/useOSStore';
import { MenuBar } from '@/components/menu-bar/MenuBar';
import { Dock } from '@/components/dock/Dock';
import { Spotlight } from '@/components/spotlight/Spotlight';
import { LockScreen } from '@/components/lock-screen/LockScreen';
import { ShutdownDialog } from '@/components/system/ShutdownDialog';

interface AppRootProps {
  children: React.ReactNode;
}

export const AppRoot: React.FC<AppRootProps> = ({ children }) => {
  const isLocked = useOSStore((state) => state.isLocked);

  return (
    <>
      <MenuBar />
      <LockScreen />
      <ShutdownDialog />

      {!isLocked && (
        <div className="animate-in fade-in duration-700">
          <main className="relative h-screen w-screen pt-[31px]">{children}</main>
          <Dock />
          <Spotlight />
        </div>
      )}
    </>
  );
};
