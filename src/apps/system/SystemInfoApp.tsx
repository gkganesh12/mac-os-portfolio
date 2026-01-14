'use client';

import React from 'react';
import { Monitor, Cpu, Layers, Database, ShieldCheck } from 'lucide-react';

export const SystemInfoApp: React.FC = () => {
  return (
    <div className="flex h-full flex-col overflow-auto bg-[#1e1e1e] p-6 text-white">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 p-2 shadow-xl">
          <img src="/ganesh.png" alt="Ganesh Khetawat" className="h-full w-full object-contain" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Ganesh&apos;s Portfolio OS</h1>
        <p className="text-sm text-zinc-500">Version 1.2.0 (Stable)</p>
      </div>

      <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Creator Section */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-blue-500/30">
          <div className="mb-3 flex items-center gap-2 text-blue-400">
            <Cpu size={18} />
            <h2 className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              Creator
            </h2>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">Ganesh Khetawat</p>
            <p className="font-mono text-xs text-zinc-500">Software Developer / SDE Intern</p>
            <p className="mt-1 w-fit rounded border border-blue-500/20 px-1.5 text-[10px] text-blue-500">
              Full-Stack / AI & SaaS
            </p>
          </div>
        </section>

        {/* Technical Stack Section */}
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

        {/* Expanded System Capabilities Section */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-green-500/30 md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-green-400">
            <ShieldCheck size={18} />
            <h2 className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              System Capabilities
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 text-[11px] text-zinc-400 sm:grid-cols-3">
            {/* Window Management */}
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Layers size={12} className="text-blue-500" /> Window Manager
              </span>
              <p className="leading-relaxed">
                A fully functional windowing engine supporting drag-and-drop, multi-directional
                resizing, and active state management. Includes global z-index handling to ensure
                proper stacking contexts.
              </p>
            </div>

            {/* Desktop Interaction */}
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Monitor size={12} className="text-purple-500" /> Interaction Engine
              </span>
              <p className="leading-relaxed">
                Features a scalable Dock with active indicators, a context-aware Menu Bar, and
                Spotlight-style fuzzy search. The entire lifecycle is managed via fragmented Zustand
                stores for performance.
              </p>
            </div>

            {/* Platform Constraints */}
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Database size={12} className="text-green-500" /> Platform Core
              </span>
              <p className="leading-relaxed">
                Built as a desktop-first browser OS simulation. Includes accurate system behaviors
                like Lock Screen, Sleep simulation, and power management loops, gracefully handling
                browser security constraints.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center text-zinc-700">
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase">
          © 2026 Ganesh Khetawat. All rights reserved.
        </p>
      </div>
    </div>
  );
};
