import React from 'react';
import { ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    name: 'DevConnect - MERN Developer Community Platform',
    link: 'https://github.com/gkganesh12/DevConnect',
    description:
      'Built a full-stack developer networking platform featuring real-time chat, discussion forums, job board, and secure authentication. Implemented JWT-based user authentication and role management with protected routes. Integrated Cloudinary for scalable storage of profile images and post media. Deployed frontend on Vercel and backend on Render, achieving 98% uptime in production.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT', 'Cloudinary'],
  },
  {
    name: 'HealthCare Portal',
    description:
      'Designed and developed a full-stack healthcare management system with role-based patient and doctor dashboards, appointment scheduling, and digital medical records. Implemented JWT-based authentication and secure REST APIs, ensuring protected access to sensitive healthcare data. Built dynamic dashboards and data visualizations to track appointments, patient history, and system usage in real time.',
    tech: ['MERN Stack', 'REST APIs', 'MongoDB', 'JWT', 'Data Visualization'],
  },
  {
    name: 'Privacy-Preserving Synthetic Data Generator',
    link: 'https://github.com/gkganesh12/Privacy-Preserving-Synthetic-Data-Generator',
    description:
      'Engineered a privacy-safe synthetic data generation tool using CTGAN to enable ML workflows without exposing sensitive information. Implemented Differential Privacy metrics and model fidelity visualizations via an interactive Streamlit web application.',
    tech: ['Python', 'CTGAN', 'Differential Privacy', 'Streamlit', 'Machine Learning'],
  },
  {
    name: 'Sales Dashboard for Regional Performance',
    description:
      'Queried and joined 3 sales-related tables covering over 25,000 rows across 12 months and 5 regions using optimized SQL joins. Built 10 dynamic measures and KPIs in Power BI to track regional sales, return trends, and product performance. Designed multipage dashboards with slicers and filters. Detected a 14% sales drop post-festival in the South region, which was used for a marketing recovery plan.',
    tech: ['SQL', 'Power BI', 'Data Analysis', 'KPIs', 'Dashboard Design'],
  },
  {
    name: 'Customer Churn Analysis',
    description:
      'Analyzed behavior of 7,043 telecom customers to identify churn patterns based on tenure, contract type, and monthly charges. Engineered new features including contract type buckets and tenure bands to improve segmentation. Generated 11 visualizations (histograms, box plots, heatmaps) to highlight churn-prone segments. Revealed that 38% of churned users were on monthly contracts with less than 3-month tenure—suggested early engagement strategies.',
    tech: ['Python', 'Data Analysis', 'Visualization', 'Feature Engineering', 'Telecom Analytics'],
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
