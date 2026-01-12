'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useOSStore } from '@/store/useOSStore';

export const LockScreen: React.FC = () => {
  const { isLocked, setLocked } = useOSStore();
  const [password, setPassword] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isLocked) {
      Promise.resolve().then(() => setPassword(''));
    }
  }, [isLocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setLocked(false);
    setPassword('');
  };

  if (!isLocked) return null;

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-between px-6 py-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1e2e 0%, #000000 100%)',
          }}
        >
          {/* Date and Time Section */}
          <div className="flex flex-col items-center text-white select-none">
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium tracking-tight md:text-xl"
            >
              {format(time, 'EEEE, d MMMM')}
            </motion.p>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-8xl font-bold tracking-tighter md:text-9xl"
            >
              {format(time, 'HH:mm')}
            </motion.h1>
          </div>

          {/* Password Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex w-full max-w-[240px] flex-col items-center"
          >
            <form onSubmit={handleUnlock} className="group relative w-full">
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="transition-duration-300 w-full rounded-lg border border-white/10 bg-white/20 px-4 py-2.5 text-center text-white placeholder-white/50 backdrop-blur-md transition-all focus:ring-2 focus:ring-white/30 focus:outline-none"
              />
              <button type="submit" className="hidden" />
            </form>
            <p className="mt-4 text-[11px] font-medium tracking-wide text-white/50 uppercase select-none">
              Enter any password to unlock
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
