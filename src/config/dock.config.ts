import {
  User,
  Code,
  Github,
  Linkedin,
  Mail,
  FolderIcon,
  FileText,
  Info,
  History,
  LucideIcon,
} from 'lucide-react';

export interface DockItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  type: 'app' | 'folder';
  action?: () => void;
}

export const DOCK_APPS: DockItemConfig[] = [
  { id: 'about', label: 'About', icon: User, type: 'app' },
  { id: 'experience', label: 'Experience', icon: History, type: 'app' },
  { id: 'projects', label: 'Projects', icon: Code, type: 'app' },
  { id: 'contact', label: 'Contact', icon: Mail, type: 'app' },
  { id: 'github', label: 'GitHub', icon: Github, type: 'app' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, type: 'app' },
];

export const DOCK_FOLDERS: DockItemConfig[] = [
  { id: 'documents', label: 'Documents', icon: FolderIcon, type: 'folder' },
  { id: 'resume', label: 'Resume', icon: FileText, type: 'folder' },
  { id: 'systemInfo', label: 'System Info', icon: Info, type: 'folder' },
];
