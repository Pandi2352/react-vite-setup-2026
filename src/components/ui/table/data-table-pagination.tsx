import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { IconButton } from '../icon-button';
import { CustomSelect } from '../select';

export interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isLoading?: boolean;
}

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  isLoading = false,
}) => {
  const startRecord = totalRecords > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  const selectOptions = pageSizeOptions.map((opt) => ({
    label: String(opt),
    value: opt,
  }));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 border-t border-border bg-slate-50 dark:bg-slate-900/80 text-xs text-muted-foreground">
      {/* Left: Total Records Info */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="whitespace-nowrap">
          Showing <span className="font-semibold text-foreground">{startRecord}</span> to{' '}
          <span className="font-semibold text-foreground">{endRecord}</span> of{' '}
          <span className="font-semibold text-foreground">{totalRecords}</span> entries
        </div>

        {/* Custom Page Size Dropdown */}
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span>Rows per page:</span>
          <CustomSelect
            value={pageSize}
            onChange={(val) => onPageSizeChange(val as number)}
            options={selectOptions}
            size="sm"
            className="w-20"
          />
        </div>
      </div>

      {/* Right: Navigation Controls */}
      <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
        <IconButton
          icon={<ChevronsLeft className="h-4 w-4" />}
          aria-label="First page"
          tooltip="First Page"
          variant="outline"
          size="sm"
          disabled={currentPage === 1 || isLoading}
          onClick={() => onPageChange(1)}
        />

        <IconButton
          icon={<ChevronLeft className="h-4 w-4" />}
          aria-label="Previous page"
          tooltip="Previous Page"
          variant="outline"
          size="sm"
          disabled={currentPage === 1 || isLoading}
          onClick={() => onPageChange(currentPage - 1)}
        />

        <span className="px-2 font-medium whitespace-nowrap shrink-0 text-muted-foreground">
          Page <strong className="text-foreground">{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <IconButton
          icon={<ChevronRight className="h-4 w-4" />}
          aria-label="Next page"
          tooltip="Next Page"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages || isLoading}
          onClick={() => onPageChange(currentPage + 1)}
        />

        <IconButton
          icon={<ChevronsRight className="h-4 w-4" />}
          aria-label="Last page"
          tooltip="Last Page"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages || isLoading}
          onClick={() => onPageChange(totalPages)}
        />
      </div>
    </div>
  );
};
