'use client';

import React from 'react';
import { AboutApp } from '@/apps/about/AboutApp';
import { ProjectsApp } from '@/apps/projects/ProjectsApp';
import { ContactApp } from '@/apps/contact/ContactApp';
import { ResumeApp } from '@/apps/resume/ResumeApp';
import { DocumentsApp } from '@/apps/documents/DocumentsApp';
import { SystemInfoApp } from '@/apps/system/SystemInfoApp';
import { ExperienceApp } from '@/apps/experience/ExperienceApp';

export type AppType = 'internal' | 'external';

export interface AppConfig {
  id: string;
  name: string;
  type: AppType;
  component?: React.ComponentType;
  url?: string;
  width: number;
  height: number;
}

export const APPS_CONFIG: Record<string, AppConfig> = {
  about: {
    id: 'about',
    name: 'About',
    type: 'internal',
    component: AboutApp,
    width: 800,
    height: 600,
  },
  projects: {
    id: 'projects',
    name: 'Projects',
    type: 'internal',
    component: ProjectsApp,
    width: 900,
    height: 650,
  },
  contact: {
    id: 'contact',
    name: 'Contact',
    type: 'internal',
    component: ContactApp,
    width: 500,
    height: 650,
  },
  resume: {
    id: 'resume',
    name: 'Resume',
    type: 'internal',
    component: ResumeApp,
    width: 850,
    height: 900,
  },
  documents: {
    id: 'documents',
    name: 'Documents',
    type: 'internal',
    component: DocumentsApp,
    width: 700,
    height: 500,
  },
  experience: {
    id: 'experience',
    name: 'Experience',
    type: 'internal',
    component: ExperienceApp,
    width: 850,
    height: 700,
  },
  systemInfo: {
    id: 'systemInfo',
    name: 'System Information',
    type: 'internal',
    component: SystemInfoApp,
    width: 650,
    height: 500,
  },
  github: {
    id: 'github',
    name: 'GitHub',
    type: 'external',
    url: 'https://github.com/gkganesh12',
    width: 0,
    height: 0,
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    type: 'external',
    url: 'https://www.linkedin.com/in/ganeshkhetawat/',
    width: 0,
    height: 0,
  },
};
