import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../button';
import { Tooltip } from '../tooltip';
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
      <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
        <Tooltip content="First Page" position="top">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || isLoading}
            onClick={() => onPageChange(1)}
            className="h-8 w-8 p-0 shrink-0"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Previous Page" position="top">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || isLoading}
            onClick={() => onPageChange(currentPage - 1)}
            className="h-8 w-8 p-0 shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Tooltip>

        <span className="px-2 font-medium whitespace-nowrap shrink-0 text-muted-foreground">
          Page <strong className="text-foreground">{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <Tooltip content="Next Page" position="top">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages || isLoading}
            onClick={() => onPageChange(currentPage + 1)}
            className="h-8 w-8 p-0 shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Last Page" position="top">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages || isLoading}
            onClick={() => onPageChange(totalPages)}
            className="h-8 w-8 p-0 shrink-0"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
