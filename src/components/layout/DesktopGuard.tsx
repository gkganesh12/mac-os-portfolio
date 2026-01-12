'use client';

import React, { useState, useEffect } from 'react';
import { MonitorOff } from 'lucide-react';

export const DesktopGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsMounted(true));
    const checkViewport = () => {
      // Standard breakpoint for tablet/mobile is 1024px
      setIsMobile(window.innerWidth < 1024);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  if (!isMounted) return null;

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0f1115] p-10 text-center">
        <div className="mb-6 rounded-3xl bg-white/5 p-8 shadow-2xl ring-1 ring-white/10">
          <MonitorOff size={64} className="mx-auto mb-6 text-blue-500" />
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-white">
            Desktop Experience Only
          </h1>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
            Please open this portfolio on a laptop or desktop for the best experience.
          </p>
        </div>
        <p className="mt-8 text-[10px] tracking-widest text-zinc-600 uppercase">
          Deepak Tewatia — Portfolio OS
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
