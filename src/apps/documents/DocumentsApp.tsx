'use client';

import React, { useState } from 'react';
import {
  FileText,
  Database,
  Download,
  ExternalLink,
  Layout,
  Menu,
  Search,
  Box,
} from 'lucide-react';

type Section = 'resume' | 'architecture';
type ArchitectureDocId = 'window-manager' | 'menu-bar' | 'spotlight-search' | 'state-management';

interface ArchitectureDoc {
  id: ArchitectureDocId;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const ARCHITECTURE_DOCS: ArchitectureDoc[] = [
  {
    id: 'window-manager',
    title: 'Window Manager',
    icon: <Layout size={16} />,
    content: (
      <div className="space-y-4">
        <p>
          The Window Manager core is responsible for the orchestration of z-index, window
          positioning, and resizing logic across the environment.
        </p>
        <h3 className="text-lg font-bold text-white">Design Decisions</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Z-Index Stacking:</strong> Uses a global counter in a Zustand store to ensure
            the last clicked window always receives the highest stack value (+1).
          </li>
          <li>
            <strong>Coordinate System:</strong> Windows use absolute positioning relative to the
            main desktop viewport (excluding the 31px menu bar).
          </li>
        </ul>
        <h3 className="text-lg font-bold text-white">Trade-offs & Constraints</h3>
        <p>
          While an absolute coordinate system allows for precise macOS-like behavior, it requires
          manual handling of window boundaries to prevent windows from being dragged entirely
          off-screen or hidden behind the menu bar.
        </p>
      </div>
    ),
  },
  {
    id: 'menu-bar',
    title: 'Menu Bar',
    icon: <Menu size={16} />,
    content: (
      <div className="space-y-4">
        <p>
          A context-aware system that dynamically renders menu items based on the currently focused
          application.
        </p>
        <h3 className="text-lg font-bold text-white">Design Decisions</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Config-Driven:</strong> Every application defines its own section in a central
            menu configuration. The MenuBar component simply subscribes to the activeAppId and maps
            the corresponding array.
          </li>
          <li>
            <strong>Global Tray:</strong> System-wide features (Clock, Wi-Fi, Spotlight trigger) are
            decoupled from app-specific menus.
          </li>
        </ul>
        <h3 className="text-lg font-bold text-white">Browser Constraints</h3>
        <p>
          Standard browser context menus are suppressed in specific zones to allow our custom
          macOS-style menus to take precedence, though internal links still follow standard
          navigation security (rel=&quot;noopener&quot;).
        </p>
      </div>
    ),
  },
  {
    id: 'spotlight-search',
    title: 'Spotlight Search',
    icon: <Search size={16} />,
    content: (
      <div className="space-y-4">
        <p>
          A global command palette inspired by macOS Spotlight, enabling fast app navigation and
          information retrieval.
        </p>
        <h3 className="text-lg font-bold text-white">Fuzzy Matching</h3>
        <p>
          The search logic implements a weighted matching algorithm that prioritizes app names over
          descriptions or categories, ensuring intended tools appear at the top of results.
        </p>
        <h3 className="text-lg font-bold text-white">Architecture</h3>
        <p>
          Implemented as a singleton overlay controlled by a specialized Spotlight store, separate
          from the standard windowing system to ensure it always appears above active windows.
        </p>
      </div>
    ),
  },
  {
    id: 'state-management',
    title: 'State Management',
    icon: <Box size={16} />,
    content: (
      <div className="space-y-4">
        <p>
          The OS lifecycle is managed via Zustand, providing a performant and lightweight
          alternative to Redux for this scale.
        </p>
        <h3 className="text-lg font-bold text-white">Store Fragmentation</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>OS Store:</strong> Manages global states like lock/unlock, active appId, and
            shutdown dialogs.
          </li>
          <li>
            <strong>Window Store:</strong> Handles the registry of open/minimized/maximized windows.
          </li>
          <li>
            <strong>Menu Store:</strong> Tracks temporary UI states like which menu is currently
            expanded.
          </li>
        </ul>
        <h3 className="text-lg font-bold text-white">Benefits</h3>
        <p>
          Fragmenting the stores prevents unnecessary re-renders in components that don&apos;t need
          to track window positions—for example, the MenuBar only cares about the activeAppId.
        </p>
      </div>
    ),
  },
];

export const DocumentsApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('resume');
  const [activeArchDoc, setActiveArchDoc] = useState<ArchitectureDocId>('window-manager');

  const resumePath = "/Deepak's Tewatia Resume.pdf";

  return (
    <div className="flex h-full bg-[#1e1e1e] text-zinc-300">
      {/* Sidebar */}
      <div className="w-56 border-r border-white/5 bg-black/20 p-4">
        <div className="mb-8 pl-2 text-xs font-bold tracking-widest text-zinc-500 uppercase">
          Documents
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveSection('resume')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              activeSection === 'resume' ? 'bg-blue-600 text-white' : 'hover:bg-white/5'
            }`}
          >
            <FileText size={16} />
            <span>Resume</span>
          </button>

          <button
            onClick={() => setActiveSection('architecture')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              activeSection === 'architecture' ? 'bg-blue-600 text-white' : 'hover:bg-white/5'
            }`}
          >
            <Database size={16} />
            <span>Architecture</span>
          </button>
        </nav>

        {activeSection === 'architecture' && (
          <div className="mt-6 ml-4 space-y-1 border-l border-white/10">
            {ARCHITECTURE_DOCS.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveArchDoc(doc.id)}
                className={`flex w-full items-center gap-2 rounded-r-md py-1.5 pr-2 pl-4 text-[13px] transition-all ${
                  activeArchDoc === doc.id
                    ? 'bg-white/10 font-medium text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <div className="h-1 w-1 rounded-full bg-current" />
                <span className="truncate">{doc.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeSection === 'resume' ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-3">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-blue-400" />
                <span className="font-bold text-white">Deepak&apos;s Tewatia Resume.pdf</span>
              </div>
              <div className="flex gap-2">
                <a
                  href={resumePath}
                  download
                  className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium hover:bg-white/10"
                >
                  <Download size={14} />
                  Download
                </a>
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium hover:bg-white/10"
                >
                  <ExternalLink size={14} />
                  Open Externally
                </a>
              </div>
            </div>
            <div className="flex-1 bg-zinc-800">
              <iframe
                src={`${resumePath}#toolbar=0`}
                className="h-full w-full"
                title="Resume PDF"
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <header className="border-b border-white/5 px-8 py-10">
              <div className="mb-2 flex items-center gap-3 text-blue-400">
                {ARCHITECTURE_DOCS.find((d) => d.id === activeArchDoc)?.icon}
                <span className="text-xs font-bold tracking-widest uppercase">
                  Architecture Documentation
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                {ARCHITECTURE_DOCS.find((d) => d.id === activeArchDoc)?.title}
              </h2>
            </header>
            <main className="flex-1 overflow-auto p-8 lg:p-12">
              <div className="mx-auto max-w-2xl leading-relaxed">
                {ARCHITECTURE_DOCS.find((d) => d.id === activeArchDoc)?.content}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
