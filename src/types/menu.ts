export interface MenuItem {
  label: string;
  action?: () => void;
  appId?: string;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface AppMenuConfig {
  appId: string;
  displayName: string;
  sections: MenuSection[];
}

export type MenuConfigMap = Record<string, AppMenuConfig>;
