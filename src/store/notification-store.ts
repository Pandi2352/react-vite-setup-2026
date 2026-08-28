import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationState {
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New User Registered',
    message: 'Ananya Roy created a new user account',
    time: '5 minutes ago',
    read: false,
    type: 'info',
  },
  {
    id: 'notif-2',
    title: 'Security Alert',
    message: 'Successful login from new IP 192.168.1.45',
    time: '25 minutes ago',
    read: false,
    type: 'warning',
  },
  {
    id: 'notif-3',
    title: 'System Deployment Passed',
    message: 'ForgeUI Production v1.0 successfully deployed',
    time: '2 hours ago',
    read: true,
    type: 'success',
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: INITIAL_NOTIFICATIONS,

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  clearAll: () => set({ notifications: [] }),
}));
