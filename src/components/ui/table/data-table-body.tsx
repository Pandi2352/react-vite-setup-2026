import { cn } from '@/lib/utils';
import { TableColumn } from './types';
import { DataTableLoading } from './data-table-loading';
import { DataTableEmpty } from './data-table-empty';
import { DataTableError } from './data-table-error';

export interface DataTableBodyProps<T> {
  columns: TableColumn<T>[];
  visibleColumns: Set<string>;
  data: T[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  pageSize?: number;
  selectable?: boolean;
  selectedIds: Set<string>;
  onSelectRow: (row: T) => void;
  getRowId: (row: T) => string;
  onClearFilters?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTableBody<T>({
  columns,
  visibleColumns,
  data,
  isLoading = false,
  isError = false,
  onRetry,
  pageSize = 5,
  selectable = false,
  selectedIds,
  onSelectRow,
  getRowId,
  onClearFilters,
  emptyTitle,
  emptyDescription,
}: DataTableBodyProps<T>) {
  const activeColumns = columns.filter((c) => visibleColumns.has(c.key));
  const colSpan = activeColumns.length + (selectable ? 1 : 0);

  if (isError) {
    return (
      <tbody className="divide-y divide-border">
        <tr>
          <td colSpan={colSpan}>
            <DataTableError onRetry={onRetry} />
          </td>
        </tr>
      </tbody>
    );
  }

  if (isLoading) {
    return (
      <tbody className="divide-y divide-border">
        <DataTableLoading columns={activeColumns} pageSize={pageSize} selectable={selectable} />
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody className="divide-y divide-border">
        <tr>
          <td colSpan={colSpan}>
            <DataTableEmpty
              title={emptyTitle}
              description={emptyDescription}
              onClearFilters={onClearFilters}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-border/60">
      {data.map((row, idx) => {
        const id = getRowId(row);
        const isSelected = selectedIds.has(id);

        return (
          <tr
            key={id}
            className={cn(
              'transition-colors text-xs',
              idx % 2 === 0 ? 'bg-card' : 'bg-muted/20',
              'hover:bg-primary/5',
              isSelected && 'bg-primary/10 font-semibold'
            )}
          >
            {selectable && (
              <td className="p-3.5 text-center border-r border-border/40">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  checked={isSelected}
                  onChange={() => onSelectRow(row)}
                  aria-label={`Select row ${id}`}
                />
              </td>
            )}
            {activeColumns.map((col) => (
              <td key={col.key} className="p-3.5 text-foreground border-r border-border/30 last:border-r-0">
                {col.render ? col.render(row) : (row as any)[col.key]}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
