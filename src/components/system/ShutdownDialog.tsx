'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { useWindowStore } from '@/store/windowStore';

export const ShutdownDialog: React.FC = () => {
  const { isShutdownDialogOpen, setShutdownDialogOpen, setLocked, setActiveApp } = useOSStore();
  const { resetWindows } = useWindowStore();

  const handleShutdown = () => {
    // 1. Reset all application and window states
    resetWindows();
    setActiveApp(null);

    // 2. Lock the screen immediately
    setLocked(true);

    // 3. Close the dialog
    setShutdownDialogOpen(false);
  };

  const handleCancel = () => {
    setShutdownDialogOpen(false);
  };

  return (
    <AnimatePresence>
      {isShutdownDialogOpen && (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-[420px] rounded-xl border border-white/20 bg-[#2d2d2d]/95 p-6 text-white shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-400 to-zinc-600 shadow-lg">
                <span className="text-3xl"></span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold tracking-tight">Shut Down Computer</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Are you sure you want to shut down your computer?
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 font-medium">
              <button
                onClick={handleCancel}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-1.5 text-xs transition-colors hover:bg-white/10 active:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleShutdown}
                className="rounded-md bg-blue-600 px-4 py-1.5 text-xs text-white transition-colors hover:bg-blue-500 active:bg-blue-700"
              >
                Shut Down
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
