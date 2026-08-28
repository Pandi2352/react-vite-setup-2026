import React from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface TableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}
