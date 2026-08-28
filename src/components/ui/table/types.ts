import React from 'react';

export interface TableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  visible?: boolean;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  searchPlaceholder?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  getRowId?: (row: T) => string;
  bulkActions?: (selectedRows: T[], clearSelection: () => void) => React.ReactNode;
  exportable?: boolean;
  exportFileName?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}
