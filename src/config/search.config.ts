export interface SearchResult {
  id: string;
  label: string;
  type: 'app' | 'link';
  url?: string;
}

export const SEARCH_CONFIG: SearchResult[] = [
  { id: 'about', label: 'About', type: 'app' },
  { id: 'experience', label: 'Experience', type: 'app' },
  { id: 'projects', label: 'Projects', type: 'app' },
  { id: 'contact', label: 'Contact', type: 'app' },
  { id: 'resume', label: 'Resume', type: 'app' },
  { id: 'documents', label: 'Documents', type: 'app' },
  { id: 'github', label: 'GitHub', type: 'link', url: 'https://github.com/deepak1-1' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    type: 'link',
    url: 'https://www.linkedin.com/in/deepak-tewatia-72273b1b5/',
  },
];
