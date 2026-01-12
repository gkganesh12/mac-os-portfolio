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
    company: 'Betacraft',
    role: 'Software Development Engineer (SDE)',
    duration: '2024 – Present',
    location: 'Pune, India',
    categories: [
      {
        title: 'Project & System Architecture',
        points: [
          'Architected and implemented a microservices-based backend, enabling greater scalability and improved fault tolerance for key application features.',
          'Designed and built an event-driven architecture using a pub/sub model with AWS SQS to decouple services, significantly improving system resilience.',
          'Integrated various AI APIs into the backend, creating new functionalities and enhancing user experience with intelligent features.',
          'Contributed to the development of an AI project using Svelte, enabling users to train custom bots and share them within their organizations or embed them on websites via iframes.',
        ],
      },
      {
        title: 'Performance Optimization',
        points: [
          'Reduced API response times by over 50% through targeted backend optimizations.',
          'Re-architected backend logic by migrating mappers to the backend, enhancing data consistency and simplifying front-end logic.',
          'Improved database performance and query efficiency by over 20% through strategic indexing and optimization.',
          'Optimized React.js application performance, achieving a 25% reduction in load times through lazy loading and memoization to minimize re-renders.',
          'Applied SOLID principles to enhance code quality, leading to a more scalable and maintainable codebase.',
        ],
      },
      {
        title: 'Deployment & Infrastructure',
        points: [
          'Automated application deployments using GitHub Actions, establishing robust CI/CD pipelines that reduced manual deployment time by over 80%.',
          'Leveraged AWS services, including CloudFront as a CDN, to efficiently handle over 1 million requests per day.',
          'Infrastructure includes Lambda, SQS, S3, App Runner, EC2, and RDS.',
          'Secured environments by configuring SSL certificates, managing IAM roles, and implementing monitoring with CloudWatch.',
        ],
      },
    ],
  },
  {
    company: 'Simplicity Projects',
    role: 'SDE',
    duration: '01/2024 – 08/2024',
    location: 'Faridabad, India',
    points: [
      'Developed a high-performance resource and task management system, architecting the backend with Hasura and GraphQL to improve data retrieval by 40% and implement secure, role-based access with PostgreSQL.',
      'Built a responsive React.js frontend with integrated real-time collaboration features to enhance user productivity and ensure cross-device accessibility.',
      'Ensured 99.9% uptime and scalability by deploying the application on AWS EC2 with Docker containers and Nginx.',
      'Optimized server performance by integrating Amazon S3 for efficient image storage and direct uploads via pre-signed URLs.',
    ],
  },
  {
    company: 'Dailykit (ONO)',
    role: 'SDE',
    duration: '01/2023 – 01/2024',
    location: 'Gurgaon, India',
    points: [
      'Developed and optimized robust backend services, implementing server-side pagination, advanced search, and filtering to improve data management efficiency.',
      'Designed and built dashboards and user interfaces that improved data visualization, increasing user engagement and retention.',
      'Used Docker for local development and containerized services to streamline deployment and improve scalability.',
      'Architected and implemented real-time, event-driven notification systems.',
      'Automated complex workflows, including a bulk query upload feature with Excel sheet integration, significantly reducing manual effort in procurement processes.',
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
