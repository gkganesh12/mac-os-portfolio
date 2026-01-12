import React from 'react';
import { ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    name: 'ProtoBots',
    link: 'https://protobots.ai',
    description:
      'AI-based platform enabling users to create, train, and deploy custom bots, with sharing and iframe embedding support.',
    tech: ['AI', 'Svelte', 'Integration', 'Scaling'],
  },
  {
    name: 'Movie Flicks',
    link: 'https://movie-flicks-8f653.web.app/',
    description:
      'Movie discovery web app with real-time data, search, and optimized UI performance.',
    tech: ['React.js', 'IMDb API', 'Performance'],
  },
  {
    name: 'Portfolio (Terminal-style)',
    link: 'https://deepak-tewatia-portfolio.web.app/',
    description:
      'Terminal-inspired developer portfolio built with Next.js and deployed on Firebase.',
    tech: ['Next.js', 'Firebase', 'CSS', 'UI/UX'],
  },
  {
    name: 'Kiosk, Brand Website & Admin Dashboard',
    description:
      'Developed a comprehensive real-time system serving three clients: web, mobile, and kiosk. Backend built with Node.js and Hasura enabled near-instant data synchronization across platforms. Engineered a centralized admin dashboard that reduced content update time by over 70%.',
    tech: ['Node.js', 'Hasura', 'Real-time', 'Admin Panel'],
  },
  {
    name: 'Clipboard Manager (Python)',
    link: 'https://github.com/deepak1-1/Clip_Board---Task',
    description:
      'Built a Python-based clipboard management system with a GUI and persistent storage. Implemented database-backed clipboard history, recycle-bin functionality, and modular backend architecture handling automated cleanup tasks.',
    tech: ['Python', 'SQLite', 'GUI', 'Automation'],
  },
];

export const ProjectsApp: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold tracking-tight uppercase">Selected Projects</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-blue-500/30 hover:bg-white/10"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="pr-4 text-lg font-bold tracking-tighter text-blue-400 uppercase">
                {project.name}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-blue-500 hover:text-white"
                  aria-label={`Visit ${project.name}`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400">{project.description}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-widest text-zinc-300 uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
