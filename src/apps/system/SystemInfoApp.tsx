'use client';

import React from 'react';
import { Monitor, Cpu, Layers, Database, ShieldCheck } from 'lucide-react';

export const SystemInfoApp: React.FC = () => {
  return (
    <div className="flex h-full flex-col overflow-auto bg-[#1e1e1e] p-6 text-white">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
          <Monitor size={48} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Deepak&apos;s Portfolio OS</h1>
        <p className="text-sm text-zinc-500">Version 1.2.0 (Stable)</p>
      </div>

      <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-blue-500/30">
          <div className="mb-3 flex items-center gap-2 text-blue-400">
            <Cpu size={18} />
            <h2 className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              Creator
            </h2>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">Deepak Tewatia</p>
            <p className="font-mono text-xs text-zinc-500">Software Development Engineer</p>
            <p className="mt-1 w-fit rounded border border-blue-500/20 px-1.5 text-[10px] text-blue-500">
              Developer / DevOps
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-purple-500/30">
          <div className="mb-3 flex items-center gap-2 text-purple-400">
            <Database size={18} />
            <h2 className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              Live Stack
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-zinc-300">
            <li>Next.js / TS</li>
            <li>Tailwind CSS</li>
            <li>Zustand</li>
            <li>PostgreSQL</li>
            <li>Framer Motion</li>
            <li>Node.js</li>
          </ul>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-green-500/30 md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-green-400">
            <ShieldCheck size={18} />
            <h2 className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              Architectural Core
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 text-[11px] text-zinc-400 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Layers size={12} className="text-blue-500" /> Interaction Engine
              </span>
              <span>
                Proprietary window manager with z-index orchestration and coordinate-perfect
                dragging.
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Monitor size={12} className="text-purple-500" /> App Launcher
              </span>
              <span>
                1:1 Configuration-driven mapping for Dock, Search, and Menu Bar interfaces.
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Database size={12} className="text-green-500" /> Data Persistence
              </span>
              <span>
                Server-side CSV feedback logging with secure header-based admin extraction tool.
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center text-zinc-700">
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase">
          © 2026 Deepak Tewatia. All rights reserved.
        </p>
      </div>
    </div>
  );
};
