'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  categories?: {
    title: string;
    points: string[];
  }[];
  points?: string[];
}

const experiences: Experience[] = [
  {
    company: 'Betacraft Technologies',
    role: 'Software Apprentice',
    duration: 'November 2024 – Present',
    location: 'Hybrid',
    categories: [
      {
        title: 'Data Processing & Analytics',
        points: [
          'Processed and standardized a dataset of over 1,00,000 rows from multiple regions to support weekly analytics—enabled business teams to track KPIs across geography and time.',
          'Designed smart Excel templates embedded with lookup functions and pivot logic, saving 40% reporting time across 4 departments.',
          'Developed and maintained Power BI dashboards to visualize revenue trends, customer mix, and monthly performance—regularly used by managers and analysts across business units.',
          'Collaborated with 4 analysts and 2 senior managers to define and validate 6 KPIs, improving report reliability and strategic alignment.',
        ],
      },
    ],
  },
  {
    company: 'Microsoft, Edunet Foundation',
    role: 'AI: Transformative Learning with TechSaksham',
    duration: 'December 2024 – March 2025',
    location: 'Remote',
    points: [
      'Developed SMS and Email Spam Detection models using supervised machine learning, achieving 92 - 95% accuracy across multiple classifiers.',
      'Preprocessed and engineered features from 10,000+ messages using text normalization, tokenization, and TF-IDF.',
      'Built end-to-end ML pipelines (data preprocessing → training → evaluation) and reduced false positives by ~20% through model optimization.',
      'Evaluated models using Precision, Recall, F1-Score, and Confusion Matrix, adhering to Responsible AI practices.',
    ],
  },
];

export const ExperienceApp: React.FC = () => {
  return (
    <div className="italic-none flex h-full flex-col overflow-auto bg-[#1e1e1e] p-6 text-zinc-100">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header className="border-b border-white/10 pb-6 tracking-wider uppercase">
          <h1 className="text-3xl font-bold">Professional Experience</h1>
        </header>

        <div className="relative space-y-12">
          {/* Timeline bar */}
          <div className="absolute top-0 bottom-0 left-0 ml-4 w-[1px] bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />

          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12">
              {/* Point on timeline */}
              <div className="absolute top-2 left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-500 ring-4 ring-[#1e1e1e]" />

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07]">
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white uppercase">
                      {exp.role}
                    </h2>
                    <div className="mt-1 flex items-center gap-2 font-medium text-blue-400">
                      <Briefcase size={16} />
                      <span className="text-sm font-bold tracking-widest uppercase">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col font-mono text-sm text-zinc-400 md:items-end">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {exp.categories ? (
                    exp.categories.map((cat, i) => (
                      <div key={i}>
                        <h3 className="mb-3 text-xs font-bold tracking-widest text-zinc-500 uppercase">
                          {cat.title}
                        </h3>
                        <ul className="space-y-2">
                          {cat.points.map((point, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300"
                            >
                              <div className="mt-1.5 h-[4px] min-w-[4px] rounded-full bg-blue-500/50" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <ul className="space-y-2">
                      {exp.points?.map((point, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300"
                        >
                          <div className="mt-1.5 h-[4px] min-w-[4px] rounded-full bg-blue-500/50" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
