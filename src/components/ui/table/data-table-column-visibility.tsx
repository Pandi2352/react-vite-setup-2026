import { useRef, useState, useEffect } from 'react';
import { Columns3, Check } from 'lucide-react';
import { Button } from '../button';
import { TableColumn } from './types';
import { Tooltip } from '../tooltip';

export interface DataTableColumnVisibilityProps<T> {
  columns: TableColumn<T>[];
  visibleColumns: Set<string>;
  onToggleColumn: (key: string) => void;
}

export function DataTableColumnVisibility<T>({
  columns,
  visibleColumns,
  onToggleColumn,
}: DataTableColumnVisibilityProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <Tooltip content="Toggle Columns" position="top">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="h-9 px-3 text-xs"
          leftIcon={<Columns3 className="h-4 w-4" />}
        >
          Columns
        </Button>
      </Tooltip>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md border border-border bg-card p-2 shadow-xl animate-in zoom-in-95 z-50">
          <p className="px-2 py-1 text-[11px] font-bold text-muted-foreground uppercase border-b border-border mb-1">
            Toggle Columns
          </p>
          <div className="space-y-0.5 max-h-48 overflow-y-auto">
            {columns.map((col) => {
              const isVisible = visibleColumns.has(col.key);
              return (
                <button
                  key={col.key}
                  onClick={() => onToggleColumn(col.key)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs hover:bg-accent text-foreground transition-colors cursor-pointer"
                >
                  <span className="truncate">{col.header}</span>
                  {isVisible && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
