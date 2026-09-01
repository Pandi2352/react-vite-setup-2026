export type DocCategory =
  | 'all'
  | 'layout'
  | 'drawers'
  | 'navbar'
  | 'datagrid'
  | 'architecture'
  | 'shortcuts';

export interface DocFeature {
  id: string;
  title: string;
  category: DocCategory;
  badge: string;
  badgeVariant?: 'default' | 'secondary' | 'success' | 'warning' | 'info' | 'outline';
  iconName: string;
  iconColor: string;
  iconBg: string;
  summary: string;
  highlights: string[];
  techStack?: string[];
  filePath?: string;
}

export interface ShortcutItem {
  keys: string[];
  description: string;
  category: string;
}
