import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { TableColumn } from './types';
import { DataTableLoading } from './data-table-loading';
import { DataTableEmpty } from './data-table-empty';
import { DataTableError } from './data-table-error';
import { GripVertical } from 'lucide-react';

export interface DataTableBodyProps<T> {
  columns: TableColumn<T>[];
  visibleColumns: Set<string>;
  columnWidths: Record<string, number>;
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

  // Row Reorder
  reorderableRows?: boolean;
  onRowReorder?: (fromIndex: number, toIndex: number) => void;
}

export function DataTableBody<T>({
  columns,
  visibleColumns,
  columnWidths,
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
  reorderableRows = false,
  onRowReorder,
}: DataTableBodyProps<T>) {
  const activeColumns = columns.filter((c) => visibleColumns.has(c.key));
  const colSpan = activeColumns.length + (selectable ? 1 : 0) + (reorderableRows ? 1 : 0);

  // Row Drag State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const handleRowDragStart = (e: React.DragEvent, index: number) => {
    if (!reorderableRows) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleRowDragOver = (e: React.DragEvent, index: number) => {
    if (!reorderableRows || draggedIndex === index) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dropIndex !== index) {
      setDropIndex(index);
    }
  };

  const handleRowDrop = (e: React.DragEvent, targetIndex: number) => {
    if (!reorderableRows || draggedIndex === null) return;
    e.preventDefault();
    if (draggedIndex !== targetIndex && onRowReorder) {
      onRowReorder(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
    setDropIndex(null);
  };

  const handleRowDragEnd = () => {
    setDraggedIndex(null);
    setDropIndex(null);
  };

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
        const isDragging = draggedIndex === idx;
        const isDropTarget = dropIndex === idx;

        return (
          <tr
            key={id}
            draggable={reorderableRows}
            onDragStart={(e) => handleRowDragStart(e, idx)}
            onDragOver={(e) => handleRowDragOver(e, idx)}
            onDrop={(e) => handleRowDrop(e, idx)}
            onDragEnd={handleRowDragEnd}
            className={cn(
              'transition-colors text-xs select-none',
              idx % 2 === 0 ? 'bg-card' : 'bg-muted/20',
              'hover:bg-primary/5',
              isSelected && 'bg-primary/10 font-semibold',
              isDragging && 'opacity-40 bg-muted/70',
              isDropTarget && 'bg-primary/15 border-t-2 border-t-primary'
            )}
          >
            {/* Row Drag Grip Cell */}
            {reorderableRows && (
              <td className="p-3 text-center border-r border-border/40 w-10">
                <div
                  className="flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary transition-colors"
                  title="Drag to reorder row"
                  aria-label={`Drag row ${idx + 1}`}
                >
                  <GripVertical className="h-4 w-4 opacity-60 hover:opacity-100" />
                </div>
              </td>
            )}

            {/* Checkbox Selection Cell */}
            {selectable && (
              <td className="p-3.5 text-center border-r border-border/40 w-12">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  checked={isSelected}
                  onChange={() => onSelectRow(row)}
                  aria-label={`Select row ${id}`}
                />
              </td>
            )}

            {/* Data Columns */}
            {activeColumns.map((col) => {
              const widthVal = columnWidths[col.key] || col.width;

              return (
                <td
                  key={col.key}
                  style={{ width: typeof widthVal === 'number' ? `${widthVal}px` : widthVal }}
                  className="p-3.5 text-foreground border-r border-border/30 last:border-r-0 truncate"
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
