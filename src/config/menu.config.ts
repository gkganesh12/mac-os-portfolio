import { MenuConfigMap } from '@/types/menu';

export const MENU_CONFIG: MenuConfigMap = {
  default: {
    appId: 'default',
    displayName: 'Ganesh',
    sections: [
      {
        title: 'Ganesh',
        items: [
          { label: 'About This Portfolio', appId: 'systemInfo' },
          { divider: true, label: 'divider-1' },
          { label: 'System Settings...', disabled: true },
          { label: 'Lock Screen', action: () => console.log('Lock') },
        ],
      },
      {
        title: 'File',
        items: [
          { label: 'About Me', appId: 'about' },
          { label: 'Projects', appId: 'projects' },
          { label: 'Resume', appId: 'resume' },
          { label: 'Contact', appId: 'contact' },
        ],
      },
      {
        title: 'Social',
        items: [
          { label: 'GitHub', appId: 'github' },
          { label: 'LinkedIn', appId: 'linkedin' },
        ],
      },
    ],
  },
  about: {
    appId: 'about',
    displayName: 'About',
    sections: [
      {
        title: 'About',
        items: [
          { label: 'About Ganesh', appId: 'about' },
          { label: 'Professional Resume', appId: 'resume' },
        ],
      },
      {
        title: 'File',
        items: [{ label: 'Close' }],
      },
      {
        title: 'Window',
        items: [{ label: 'Minimize' }, { label: 'Zoom' }],
      },
    ],
  },
  experience: {
    appId: 'experience',
    displayName: 'Experience',
    sections: [
      {
        title: 'Experience',
        items: [{ label: 'View Timeline', appId: 'experience' }],
      },
      {
        title: 'File',
        items: [{ label: 'Close' }],
      },
      {
        title: 'Window',
        items: [{ label: 'Minimize' }, { label: 'Zoom' }],
      },
    ],
  },
  projects: {
    appId: 'projects',
    displayName: 'Projects',
    sections: [
      {
        title: 'Projects',
        items: [
          { label: 'View All', appId: 'projects' },
          { label: 'Request Quote', disabled: true },
        ],
      },
      {
        title: 'File',
        items: [{ label: 'Close' }],
      },
      {
        title: 'Window',
        items: [{ label: 'Minimize' }, { label: 'Zoom' }],
      },
    ],
  },
  resume: {
    appId: 'resume',
    displayName: 'Resume',
    sections: [
      {
        title: 'Resume',
        items: [
          { label: 'Print Resume', action: () => window.print() },
          { divider: true, label: 'div-res' },
          {
            label: 'Download Copy',
            action: () => {
              const link = document.createElement('a');
              link.href = "/Resume SDE New.pdf";
              link.download = 'Resume_SDE_New.pdf';
              link.click();
            },
          },
        ],
      },
      {
        title: 'File',
        items: [{ label: 'Close' }],
      },
      {
        title: 'Window',
        items: [{ label: 'Minimize' }, { label: 'Zoom' }],
      },
    ],
  },
  contact: {
    appId: 'contact',
    displayName: 'Contact',
    sections: [
      {
        title: 'Contact',
        items: [
          { label: 'Send Message', appId: 'contact' },
          { label: 'Email Me', action: () => window.open('mailto:gkganesh448@gmail.com') },
        ],
      },
      {
        title: 'File',
        items: [{ label: 'Close' }],
      },
      {
        title: 'Window',
        items: [{ label: 'Minimize' }, { label: 'Zoom' }],
      },
    ],
  },
  systemInfo: {
    appId: 'systemInfo',
    displayName: 'System Information',
    sections: [
      {
        title: 'System Information',
        items: [{ label: 'About System', appId: 'systemInfo' }],
      },
      {
        title: 'File',
        items: [{ label: 'Close' }],
      },
      {
        title: 'Window',
        items: [{ label: 'Minimize' }, { label: 'Zoom' }],
      },
    ],
  },
  github: {
    appId: 'github',
    displayName: 'GitHub',
    sections: [
      {
        title: 'GitHub',
        items: [{ label: 'Open Profile', appId: 'github' }],
      },
    ],
  },
  linkedin: {
    appId: 'linkedin',
    displayName: 'LinkedIn',
    sections: [
      {
        title: 'LinkedIn',
        items: [{ label: 'Visit Profile', appId: 'linkedin' }],
      },
    ],
  },
};
