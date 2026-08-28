import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { TableColumn } from './types';

export interface DataTableHeaderProps<T> {
  columns: TableColumn<T>[];
  visibleColumns: Set<string>;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
  selectable?: boolean;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

export function DataTableHeader<T>({
  columns,
  visibleColumns,
  sortColumn,
  sortDirection,
  onSort,
  selectable = false,
  isAllSelected,
  isSomeSelected,
  onSelectAll,
}: DataTableHeaderProps<T>) {
  const activeColumns = columns.filter((c) => visibleColumns.has(c.key));

  return (
    <thead className="bg-slate-100 dark:bg-slate-800 text-foreground border-b border-border/80 font-bold sticky top-0 z-20 shadow-xs backdrop-blur-md">
      <tr>
        {selectable && (
          <th className="p-3.5 w-12 text-center border-r border-border/50">
            <input
              type="checkbox"
              className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
              checked={isAllSelected}
              ref={(el) => {
                if (el) el.indeterminate = isSomeSelected && !isAllSelected;
              }}
              onChange={(e) => onSelectAll(e.target.checked)}
              aria-label="Select all rows"
            />
          </th>
        )}
        {activeColumns.map((col) => (
          <th
            key={col.key}
            style={{ width: col.width }}
            className="p-3.5 font-bold text-xs tracking-wider uppercase text-foreground/80 border-r border-border/40 last:border-r-0"
          >
            {col.sortable ? (
              <button
                onClick={() => onSort(col.key)}
                className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer select-none"
              >
                <span>{col.header}</span>
                {sortColumn === col.key ? (
                  sortDirection === 'asc' ? (
                    <ArrowUp className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <ArrowDown className="h-3.5 w-3.5 text-primary" />
                  )
                ) : (
                  <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                )}
              </button>
            ) : (
              col.header
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
