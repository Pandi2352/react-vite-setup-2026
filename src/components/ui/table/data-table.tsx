import { useState, useMemo, useEffect } from 'react';
import { DataTableProps, TableColumn } from './types';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body';
import { DataTablePagination } from './data-table-pagination';

export function DataTable<T>({
  columns: initialColumns,
  data: initialData,
  isLoading = false,
  isError = false,
  onRetry,
  searchPlaceholder = 'Search records...',
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  selectable = false,
  onSelectionChange,
  getRowId = (row: any) => row.id || String(Math.random()),
  bulkActions,
  exportable = true,
  exportFileName = 'table-export',
  emptyTitle,
  emptyDescription,

  // Reorder & Resize props
  reorderableColumns = false,
  resizableColumns = false,
  reorderableRows = false,
  onColumnReorder,
  onColumnResize,
  onRowReorder,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Columns & Order State
  const [columns, setColumns] = useState<TableColumn<T>[]>(initialColumns);
  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  // Column Widths Mapping State
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    initialColumns.forEach((c) => {
      if (typeof c.width === 'number') initial[c.key] = c.width;
      else if (typeof c.width === 'string' && c.width.endsWith('px')) {
        initial[c.key] = parseInt(c.width, 10);
      }
    });
    return initial;
  });

  // Reorderable Data State
  const [currentData, setCurrentData] = useState<T[]>(initialData);
  useEffect(() => {
    setCurrentData(initialData);
  }, [initialData]);

  // Track if layout was modified
  const hasCustomLayout = useMemo(() => {
    if (Object.keys(columnWidths).length > 0) return true;
    if (columns.some((c, idx) => c.key !== initialColumns[idx]?.key)) return true;
    return false;
  }, [columnWidths, columns, initialColumns]);

  const handleResetLayout = () => {
    setColumns(initialColumns);
    setColumnWidths({});
  };

  // Column Visibility State
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    () => new Set(initialColumns.filter((c) => c.visible !== false).map((c) => c.key))
  );

  const toggleColumnVisibility = (key: string) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Column Reorder Handler
  const handleColumnReorder = (draggedKey: string, targetKey: string) => {
    const fromIdx = columns.findIndex((c) => c.key === draggedKey);
    const toIdx = columns.findIndex((c) => c.key === targetKey);
    if (fromIdx === -1 || toIdx === -1) return;

    const newColumns = [...columns];
    const [dragged] = newColumns.splice(fromIdx, 1);
    newColumns.splice(toIdx, 0, dragged);

    setColumns(newColumns);
    if (onColumnReorder) onColumnReorder(newColumns);
  };

  // Column Resize Handler
  const handleColumnResize = (columnKey: string, width: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnKey]: width,
    }));
    if (onColumnResize) onColumnResize(columnKey, width);
  };

  // Row Reorder Handler
  const handleRowReorder = (fromIndex: number, toIndex: number) => {
    const newData = [...currentData];
    const [dragged] = newData.splice(fromIndex, 1);
    newData.splice(toIndex, 0, dragged);

    setCurrentData(newData);
    if (onRowReorder) onRowReorder(newData, fromIndex, toIndex);
  };

  // Search Filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return currentData;
    return currentData.filter((row) =>
      Object.values(row as Record<string, any>).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [currentData, searchTerm]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = (a as any)[sortColumn];
      const bVal = (b as any)[sortColumn];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedData.map(getRowId));
      setSelectedIds(allIds);
      if (onSelectionChange) onSelectionChange(paginatedData);
    } else {
      setSelectedIds(new Set());
      if (onSelectionChange) onSelectionChange([]);
    }
  };

  const handleSelectRow = (row: T) => {
    const id = getRowId(row);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);

      if (onSelectionChange) {
        const selected = currentData.filter((r) => next.has(getRowId(r)));
        onSelectionChange(selected);
      }
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
    if (onSelectionChange) onSelectionChange([]);
  };

  const selectedRows = useMemo(
    () => currentData.filter((r) => selectedIds.has(getRowId(r))),
    [currentData, selectedIds, getRowId]
  );

  const isAllSelected =
    paginatedData.length > 0 && paginatedData.every((r) => selectedIds.has(getRowId(r)));
  const isSomeSelected =
    paginatedData.some((r) => selectedIds.has(getRowId(r))) && !isAllSelected;

  const exportCSV = () => {
    const activeCols = columns.filter((c) => visibleColumns.has(c.key));
    const headerRow = activeCols.map((c) => `"${c.header}"`).join(',');
    const rows = sortedData.map((row) =>
      activeCols.map((col) => `"${String((row as any)[col.key] || '')}"`).join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headerRow, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${exportFileName}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search & Actions Toolbar */}
      <DataTableToolbar
        columns={columns}
        visibleColumns={visibleColumns}
        onToggleColumn={toggleColumnVisibility}
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        searchPlaceholder={searchPlaceholder}
        selectedRows={selectedRows}
        onClearSelection={clearSelection}
        bulkActions={bulkActions}
        exportable={exportable}
        onExportCSV={exportCSV}
        onResetLayout={handleResetLayout}
        hasCustomLayout={hasCustomLayout}
      />

      {/* Main Grid Wrapper */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto relative min-h-[300px] custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <DataTableHeader
              columns={columns}
              visibleColumns={visibleColumns}
              columnWidths={columnWidths}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              selectable={selectable}
              isAllSelected={isAllSelected}
              isSomeSelected={isSomeSelected}
              onSelectAll={handleSelectAll}
              reorderableColumns={reorderableColumns}
              resizableColumns={resizableColumns}
              reorderableRows={reorderableRows}
              onColumnReorder={handleColumnReorder}
              onColumnResize={handleColumnResize}
            />

            <DataTableBody
              columns={columns}
              visibleColumns={visibleColumns}
              columnWidths={columnWidths}
              data={paginatedData}
              isLoading={isLoading}
              isError={isError}
              onRetry={onRetry}
              pageSize={pageSize}
              selectable={selectable}
              selectedIds={selectedIds}
              onSelectRow={handleSelectRow}
              getRowId={getRowId}
              onClearFilters={() => setSearchTerm('')}
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
              reorderableRows={reorderableRows}
              onRowReorder={handleRowReorder}
            />
          </table>
        </div>

        {/* Pagination Controls */}
        {!isLoading && !isError && sortedData.length > 0 && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            totalRecords={sortedData.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
}
