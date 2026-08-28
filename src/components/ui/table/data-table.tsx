import { useState, useMemo } from 'react';
import { DataTableProps } from './types';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body';
import { DataTablePagination } from './data-table-pagination';

export function DataTable<T>({
  columns,
  data,
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
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Column Visibility State
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    () => new Set(columns.filter((c) => c.visible !== false).map((c) => c.key))
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

  // Search Filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      Object.values(row as Record<string, any>).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

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
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);

    setSelectedIds(newSelected);
    if (onSelectionChange) {
      onSelectionChange(data.filter((r) => newSelected.has(getRowId(r))));
    }
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
    if (onSelectionChange) onSelectionChange([]);
  };

  // CSV Export Utility
  const handleExportCSV = () => {
    const exportData = selectedIds.size > 0
      ? data.filter((r) => selectedIds.has(getRowId(r)))
      : sortedData;

    const visibleCols = columns.filter((c) => visibleColumns.has(c.key));
    const headers = visibleCols.map((c) => c.header).join(',');
    const rows = exportData.map((row) =>
      visibleCols.map((c) => `"${String((row as any)[c.key] ?? '').replace(/"/g, '""')}"`).join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${exportFileName}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedRows = useMemo(
    () => data.filter((r) => selectedIds.has(getRowId(r))),
    [data, selectedIds, getRowId]
  );

  const isAllSelected = paginatedData.length > 0 && paginatedData.every((r) => selectedIds.has(getRowId(r)));
  const isSomeSelected = paginatedData.some((r) => selectedIds.has(getRowId(r)));

  return (
    <div className="w-full space-y-3">
      {/* Toolbar */}
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
        onExportCSV={handleExportCSV}
      />

      {/* Main Table Wrapper */}
      <div className="rounded-md border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto relative">
          <table className="w-full min-w-[1800px] text-left text-sm border-collapse whitespace-nowrap">
            <DataTableHeader
              columns={columns}
              visibleColumns={visibleColumns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              selectable={selectable}
              isAllSelected={isAllSelected}
              isSomeSelected={isSomeSelected}
              onSelectAll={handleSelectAll}
            />
            <DataTableBody
              columns={columns}
              visibleColumns={visibleColumns}
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
            />
          </table>
        </div>

        {/* Footer Pagination */}
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalRecords={sortedData.length}
          pageSizeOptions={pageSizeOptions}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
