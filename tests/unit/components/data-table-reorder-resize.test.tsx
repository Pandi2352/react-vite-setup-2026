import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable, TableColumn } from '@/components/ui/table';

interface SampleItem {
  id: string;
  name: string;
  role: string;
  status: string;
}

const mockData: SampleItem[] = [
  { id: '1', name: 'Alice Smith', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Jones', role: 'Developer', status: 'Pending' },
  { id: '3', name: 'Charlie Brown', role: 'Viewer', status: 'Inactive' },
];

const mockColumns: TableColumn<SampleItem>[] = [
  { key: 'name', header: 'Full Name', sortable: true, width: 200 },
  { key: 'role', header: 'Access Role', sortable: true, width: 150 },
  { key: 'status', header: 'Status', sortable: true, width: 120 },
];

describe('DataTable Drag, Drop, Reorder & Resize', () => {
  it('renders table headers with drag-drop and resize handles when enabled', () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        reorderableColumns={true}
        resizableColumns={true}
        reorderableRows={true}
      />
    );

    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Access Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check for row drag grip handles
    const rowGrips = screen.getAllByLabelText(/drag row/i);
    expect(rowGrips).toHaveLength(3);
  });

  it('triggers onColumnReorder callback on header drop', () => {
    const handleColumnReorder = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        reorderableColumns={true}
        onColumnReorder={handleColumnReorder}
      />
    );

    const nameHeader = screen.getByText('Full Name').closest('th');
    const roleHeader = screen.getByText('Access Role').closest('th');

    expect(nameHeader).toBeTruthy();
    expect(roleHeader).toBeTruthy();

    if (nameHeader && roleHeader) {
      fireEvent.dragStart(nameHeader, {
        dataTransfer: { setData: vi.fn(), effectAllowed: 'move' },
      });
      fireEvent.dragOver(roleHeader, {
        preventDefault: vi.fn(),
        dataTransfer: { dropEffect: 'move' },
      });
      fireEvent.drop(roleHeader, {
        preventDefault: vi.fn(),
      });
    }

    expect(handleColumnReorder).toHaveBeenCalledTimes(1);
  });

  it('triggers onRowReorder callback on row drop', () => {
    const handleRowReorder = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        reorderableRows={true}
        onRowReorder={handleRowReorder}
      />
    );

    const rows = screen.getAllByRole('row');
    // rows[0] is the header row, rows[1] is row index 0, rows[2] is row index 1
    const row1 = rows[1];
    const row2 = rows[2];

    fireEvent.dragStart(row1, {
      dataTransfer: { setData: vi.fn(), effectAllowed: 'move' },
    });
    fireEvent.dragOver(row2, {
      preventDefault: vi.fn(),
      dataTransfer: { dropEffect: 'move' },
    });
    fireEvent.drop(row2, {
      preventDefault: vi.fn(),
    });

    expect(handleRowReorder).toHaveBeenCalledTimes(1);
    expect(handleRowReorder).toHaveBeenCalledWith(expect.any(Array), 0, 1);
  });
});
