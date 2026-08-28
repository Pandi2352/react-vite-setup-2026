import { Skeleton } from '../skeleton';
import { TableColumn } from './types';

export interface DataTableLoadingProps<T> {
  columns: TableColumn<T>[];
  pageSize?: number;
  selectable?: boolean;
}

export function DataTableLoading<T>({
  columns,
  pageSize = 5,
  selectable = false,
}: DataTableLoadingProps<T>) {
  return (
    <>
      {Array.from({ length: pageSize }).map((_, idx) => (
        <tr key={idx} className="hover:bg-muted/30 transition-colors">
          {selectable && (
            <td className="p-4 text-center">
              <Skeleton className="h-4 w-4 rounded-sm mx-auto" />
            </td>
          )}
          {columns.map((col) => (
            <td key={col.key} className="p-4">
              <Skeleton className="h-4 w-28" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
