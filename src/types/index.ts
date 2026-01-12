export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
}

export type OSTheme = 'light' | 'dark' | 'auto';
