'use client';

import React from 'react';
import { DOCK_APPS, DOCK_FOLDERS } from '@/config/dock.config';
import { DockItem } from './DockItem';

export const Dock: React.FC = () => {
  return (
    <div className="fixed bottom-3 left-1/2 z-[50] -translate-x-1/2">
      <div className="flex items-end gap-2 rounded-2xl border border-white/20 bg-white/10 p-1 px-3 shadow-2xl backdrop-blur-2xl">
        {/* Apps Section */}
        <div className="flex items-center gap-2">
          {DOCK_APPS.map((app) => (
            <DockItem key={app.id} item={app} />
          ))}
        </div>

        {/* Divider */}
        <div className="mx-1 mb-1 h-10 w-[1px] bg-white/20" />

        {/* Folders Section */}
        <div className="flex items-center gap-2">
          {DOCK_FOLDERS.map((folder) => (
            <DockItem key={folder.id} item={folder} />
          ))}
        </div>
      </div>
    </div>
  );
};
