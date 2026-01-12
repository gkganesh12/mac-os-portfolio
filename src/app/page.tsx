'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { WindowManager } from '@/components/window/WindowManager';

export default function Home() {
  const windows = useWindowStore((state) => state.windows);
  const hasActiveWindows = Object.values(windows).some((w) => w.isOpen && !w.isMinimized);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #2b3a67 0%, #0f172a 100%)',
      }}
    >
      {/* Desktop Content Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasActiveWindows ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="px-4 text-center text-4xl font-bold tracking-tighter text-white/10 uppercase select-none md:text-6xl">
          Deepak Tewatia — Developer / DevOps
        </h1>
        <p className="mt-4 text-center font-mono text-xs tracking-[0.3em] text-white/5 uppercase select-none md:text-sm">
          Architecting & scaling robust web applications
        </p>
      </motion.div>

      {/* Window Layer */}
      <WindowManager />

      {/* Grid of Files */}
      <div className="pointer-events-none grid w-fit grid-cols-1 grid-rows-6 gap-8 p-10">
        {/* Icons rendered here if needed */}
      </div>
    </div>
  );
}
