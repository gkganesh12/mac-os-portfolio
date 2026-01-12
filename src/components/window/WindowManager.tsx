'use client';

import React from 'react';
import { useWindowStore } from '@/store/windowStore';
import { Window } from './Window';

export const WindowManager: React.FC = () => {
  const windows = useWindowStore((state) => state.windows);
  const windowIds = Object.keys(windows);

  return (
    <div className="pointer-events-none absolute inset-0 z-[100]">
      {windowIds.map((id) => (
        <Window key={id} id={id} />
      ))}
    </div>
  );
};
