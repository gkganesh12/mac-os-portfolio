'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import { useSpotlightStore } from '@/store/spotlightStore';
import { SEARCH_CONFIG } from '@/config/search.config';
import { useAppLauncher } from '@/hooks/useAppLauncher';

export const Spotlight: React.FC = () => {
  const { isOpen, query, closeSpotlight, setQuery } = useSpotlightStore();
  const { launchApp } = useAppLauncher();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredResults = SEARCH_CONFIG.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
          e.preventDefault();
          useSpotlightStore.getState().openSpotlight();
        }
        return;
      }

      if (e.key === 'Escape') closeSpotlight();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filteredResults.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filteredResults.length) % filteredResults.length);
      }
      if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        launchApp(filteredResults[selectedIndex].id);
        closeSpotlight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, closeSpotlight, launchApp]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/20 backdrop-blur-[2px]"
            onClick={closeSpotlight}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: '-40%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, y: '-40%' }}
            className="fixed top-1/2 left-1/2 z-[10001] w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/20 bg-[#1e1e1e]/80 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex items-center border-b border-white/10 px-4 py-4">
              <Search size={22} className="mr-3 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Spotlight Search"
                className="flex-1 bg-transparent text-xl text-white outline-none placeholder:text-zinc-500"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <div className="flex items-center space-x-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500">
                <Command size={10} />
                <span>Space</span>
              </div>
            </div>

            {query !== '' && filteredResults.length > 0 && (
              <div className="max-h-[400px] overflow-auto p-2">
                <p className="px-3 py-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                  Applications
                </p>
                {filteredResults.map((result, index) => (
                  <button
                    key={result.id}
                    className={`flex w-full items-center rounded-lg px-3 py-3 text-left transition-colors ${
                      selectedIndex === index
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                    onClick={() => {
                      launchApp(result.id);
                      closeSpotlight();
                    }}
                  >
                    <div
                      className={`mr-3 rounded-md p-1.5 ${selectedIndex === index ? 'bg-white/20' : 'bg-white/10'}`}
                    >
                      <Search size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{result.label}</p>
                      <p
                        className={`text-[11px] ${selectedIndex === index ? 'text-blue-100' : 'text-zinc-500'}`}
                      >
                        {result.type === 'app' ? 'Application' : 'Link'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
