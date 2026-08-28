import React from 'react';
import { Search, Download, X } from 'lucide-react';
import { Input } from '../input';
import { Button } from '../button';
import { Tooltip } from '../tooltip';
import { TableColumn } from './types';
import { DataTableColumnVisibility } from './data-table-column-visibility';

export interface DataTableToolbarProps<T> {
  columns: TableColumn<T>[];
  visibleColumns: Set<string>;
  onToggleColumn: (key: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
  selectedRows: T[];
  onClearSelection: () => void;
  bulkActions?: (selectedRows: T[], clearSelection: () => void) => React.ReactNode;
  exportable?: boolean;
  onExportCSV?: () => void;
}

export function DataTableToolbar<T>({
  columns,
  visibleColumns,
  onToggleColumn,
  searchTerm,
  onSearchChange,
  searchPlaceholder = 'Search records...',
  selectedRows,
  onClearSelection,
  bulkActions,
  exportable = true,
  onExportCSV,
}: DataTableToolbarProps<T>) {
  const selectedCount = selectedRows.length;

  return (
    <div className="flex flex-col gap-3 p-1">
      {/* Primary Toolbar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          {exportable && onExportCSV && (
            <Tooltip content="Export CSV" position="top">
              <Button
                variant="outline"
                size="sm"
                onClick={onExportCSV}
                className="h-9 px-3 text-xs"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Export
              </Button>
            </Tooltip>
          )}

          <DataTableColumnVisibility
            columns={columns}
            visibleColumns={visibleColumns}
            onToggleColumn={onToggleColumn}
          />
        </div>
      </div>

      {/* Selected Rows Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between px-3 py-2 rounded-md border border-primary/30 bg-primary/5 text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">{selectedCount}</span>
            <span className="text-foreground">items selected</span>
            <button
              onClick={onClearSelection}
              className="ml-2 text-muted-foreground hover:text-foreground underline cursor-pointer"
            >
              Deselect all
            </button>
          </div>

          <div className="flex items-center gap-2">
            {bulkActions && bulkActions(selectedRows, onClearSelection)}
          </div>
        </div>
      )}
    </div>
  );
}
