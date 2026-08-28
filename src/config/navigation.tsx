import React from 'react';
import {
  LayoutDashboard,
  Users,
  Settings,
  ShieldCheck,
  FileText,
  Activity,
  SlidersHorizontal,
  ExternalLink,
  Code2,
  CreditCard,
  Lock,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { PERMISSIONS } from '@/utils/constants';

export interface NavItemConfig {
  id: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  permission?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'info' | 'danger';
  };
  external?: boolean;
  children?: NavItemConfig[];
}

export interface NavSectionConfig {
  id: string;
  title: string;
  items: NavItemConfig[];
}

export const navigationConfig: NavSectionConfig[] = [
  {
    id: 'main',
    title: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard className="h-4 w-4 text-indigo-500" />,
      },
      {
        id: 'users-group',
        label: 'User Management',
        icon: <Users className="h-4 w-4 text-emerald-500" />,
        permission: PERMISSIONS.USERS_READ,
        children: [
          {
            id: 'users-list',
            label: 'All Users',
            path: '/users',
            icon: <Users className="h-4 w-4 text-emerald-500" />,
            permission: PERMISSIONS.USERS_READ,
          },
          {
            id: 'roles-permissions',
            label: 'Roles & Access',
            path: '/users/roles',
            icon: <ShieldCheck className="h-4 w-4 text-amber-500" />,
            permission: PERMISSIONS.USERS_CREATE,
            badge: { text: 'BETA', variant: 'info' },
          },
        ],
      },
    ],
  },
  {
    id: 'management',
    title: 'Apps & Forms',
    items: [
      {
        id: 'form-wizard',
        label: 'Form Controls & Wizard',
        path: '/forms/wizard',
        icon: <SlidersHorizontal className="h-4 w-4 text-violet-500" />,
        badge: { text: 'NEW', variant: 'info' },
      },
      {
        id: 'reports',
        label: 'Reports & Analytics',
        path: '/reports',
        icon: <FileText className="h-4 w-4 text-cyan-500" />,
        permission: PERMISSIONS.REPORTS_READ,
        badge: { text: '12', variant: 'success' },
      },
      {
        id: 'system-logs',
        label: 'System Audit Logs',
        path: '/audit-logs',
        icon: <Activity className="h-4 w-4 text-rose-500" />,
        permission: PERMISSIONS.USERS_READ,
      },
      {
        id: 'api-integrations',
        label: 'API & Webhooks',
        path: '/audit-logs',
        icon: <Code2 className="h-4 w-4 text-blue-500" />,
      },
    ],
  },
  {
    id: 'billing-security',
    title: 'Security & Billing',
    items: [
      {
        id: 'billing',
        label: 'Billing & Quotas',
        path: '/forms/wizard',
        icon: <CreditCard className="h-4 w-4 text-pink-500" />,
      },
      {
        id: 'security-center',
        label: 'Security Center',
        path: '/audit-logs',
        icon: <Lock className="h-4 w-4 text-red-500" />,
      },
    ],
  },
  {
    id: 'system',
    title: 'System Settings',
    items: [
      {
        id: 'design-system',
        label: 'Design System',
        path: '/design-system',
        icon: <Layers className="h-4 w-4 text-purple-500" />,
        badge: { text: 'PLAYGROUND', variant: 'info' },
      },
      {
        id: 'settings',
        label: 'Settings & Config',
        path: '/settings',
        icon: <Settings className="h-4 w-4 text-sky-500" />,
      },
      {
        id: 'help-support',
        label: 'Help & Documentation',
        path: 'https://vite.dev',
        icon: <HelpCircle className="h-4 w-4 text-teal-500" />,
        external: true,
      },
      {
        id: 'documentation',
        label: 'Vite Docs',
        path: 'https://vite.dev',
        icon: <ExternalLink className="h-4 w-4 text-orange-500" />,
        external: true,
      },
    ],
  },
];
