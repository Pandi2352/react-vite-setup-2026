import React, { useState, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown, GripVertical } from 'lucide-react';
import { TableColumn } from './types';
import { cn } from '@/lib/utils';

export interface DataTableHeaderProps<T> {
  columns: TableColumn<T>[];
  visibleColumns: Set<string>;
  columnWidths: Record<string, number>;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
  selectable?: boolean;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onSelectAll: (checked: boolean) => void;

  // Reorder & Resize
  reorderableColumns?: boolean;
  resizableColumns?: boolean;
  reorderableRows?: boolean;
  onColumnReorder?: (draggedKey: string, targetKey: string) => void;
  onColumnResize?: (columnKey: string, width: number) => void;
}

export function DataTableHeader<T>({
  columns,
  visibleColumns,
  columnWidths,
  sortColumn,
  sortDirection,
  onSort,
  selectable = false,
  isAllSelected,
  isSomeSelected,
  onSelectAll,
  reorderableColumns = false,
  resizableColumns = false,
  reorderableRows = false,
  onColumnReorder,
  onColumnResize,
}: DataTableHeaderProps<T>) {
  const activeColumns = columns.filter((c) => visibleColumns.has(c.key));

  // Column drag state
  const [draggedColumnKey, setDraggedColumnKey] = useState<string | null>(null);
  const [dropTargetKey, setDropTargetKey] = useState<string | null>(null);

  // Column resize state
  const resizingRef = useRef<{
    columnKey: string;
    startX: number;
    startWidth: number;
    minWidth: number;
    maxWidth: number;
  } | null>(null);
  const [isResizingKey, setIsResizingKey] = useState<string | null>(null);

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, colKey: string) => {
    if (!reorderableColumns) return;
    setDraggedColumnKey(colKey);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', colKey);
  };

  const handleDragOver = (e: React.DragEvent, colKey: string) => {
    if (!reorderableColumns || draggedColumnKey === colKey) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dropTargetKey !== colKey) {
      setDropTargetKey(colKey);
    }
  };

  const handleDrop = (e: React.DragEvent, targetColKey: string) => {
    if (!reorderableColumns || !draggedColumnKey) return;
    e.preventDefault();
    if (draggedColumnKey !== targetColKey && onColumnReorder) {
      onColumnReorder(draggedColumnKey, targetColKey);
    }
    setDraggedColumnKey(null);
    setDropTargetKey(null);
  };

  const handleDragEnd = () => {
    setDraggedColumnKey(null);
    setDropTargetKey(null);
  };

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent, col: TableColumn<T>) => {
    e.preventDefault();
    e.stopPropagation();

    const currentWidth = columnWidths[col.key] || (typeof col.width === 'number' ? col.width : 160);
    resizingRef.current = {
      columnKey: col.key,
      startX: e.clientX,
      startWidth: currentWidth,
      minWidth: col.minWidth || 80,
      maxWidth: col.maxWidth || 800,
    };
    setIsResizingKey(col.key);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizingRef.current) return;
      const deltaX = moveEvent.clientX - resizingRef.current.startX;
      const newWidth = Math.max(
        resizingRef.current.minWidth,
        Math.min(resizingRef.current.maxWidth, resizingRef.current.startWidth + deltaX)
      );

      if (onColumnResize) {
        onColumnResize(resizingRef.current.columnKey, newWidth);
      }
    };

    const handleMouseUp = () => {
      resizingRef.current = null;
      setIsResizingKey(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <thead className="bg-slate-100 dark:bg-slate-800 text-foreground border-b border-border/80 font-bold sticky top-0 z-20 shadow-xs backdrop-blur-md select-none">
      <tr>
        {/* Row Reorder Grip Header Column */}
        {reorderableRows && (
          <th
            className="p-3 w-10 text-center border-r border-border/50 text-muted-foreground"
            aria-label="Row Drag Handle Header"
          >
            <GripVertical className="h-3.5 w-3.5 mx-auto opacity-50" />
          </th>
        )}

        {/* Row Selection Checkbox Column */}
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

        {/* Dynamic Column Headers */}
        {activeColumns.map((col) => {
          const isDragging = draggedColumnKey === col.key;
          const isDropTarget = dropTargetKey === col.key;
          const isResizing = isResizingKey === col.key;
          const widthVal = columnWidths[col.key] || col.width;

          return (
            <th
              key={col.key}
              style={{ width: typeof widthVal === 'number' ? `${widthVal}px` : widthVal }}
              draggable={reorderableColumns}
              onDragStart={(e) => handleDragStart(e, col.key)}
              onDragOver={(e) => handleDragOver(e, col.key)}
              onDrop={(e) => handleDrop(e, col.key)}
              onDragEnd={handleDragEnd}
              className={cn(
                'relative p-3.5 font-bold text-xs tracking-wider uppercase text-foreground/80 border-r border-border/40 last:border-r-0 transition-colors',
                reorderableColumns && 'cursor-grab active:cursor-grabbing hover:bg-muted/40',
                isDragging && 'opacity-40 bg-muted/60',
                isDropTarget && 'bg-primary/10 border-l-2 border-l-primary',
                isResizing && 'bg-primary/5'
              )}
            >
              <div className="flex items-center justify-between gap-1.5 min-w-0 pr-1">
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => onSort(col.key)}
                    className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer select-none truncate"
                  >
                    <span className="truncate">{col.header}</span>
                    {sortColumn === col.key ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="h-3.5 w-3.5 text-primary shrink-0" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5 text-primary shrink-0" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3.5 w-3.5 opacity-40 shrink-0" />
                    )}
                  </button>
                ) : (
                  <span className="truncate">{col.header}</span>
                )}
              </div>

              {/* Column Resize Handle */}
              {resizableColumns && (
                <div
                  onMouseDown={(e) => handleResizeStart(e, col)}
                  className={cn(
                    'absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-primary/50 transition-colors z-10 flex items-center justify-center group',
                    isResizing && 'bg-primary w-2.5'
                  )}
                  title="Drag to resize column"
                >
                  <div className="h-4 w-[1px] bg-border group-hover:bg-primary" />
                </div>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
