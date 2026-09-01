import React, { useState } from 'react';
import { Plus, Trash2, UserCheck, UserX, Clock, ShieldCheck, ShieldAlert, MapPin, Building2, HardDrive, Crown, CreditCard, Activity, Globe } from 'lucide-react';
import { useUsers, useDeleteUser } from '../hooks/use-users';
import { UserItem } from '../types/user.types';
import { UserModal } from '../components/user-modal';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { PermissionGuard } from '@/components/common/permission-guard';
import { ErrorState } from '@/components/feedback/error-state';
import { formatDate } from '@/utils/formatters';
import { PERMISSIONS } from '@/utils/constants';

export const UsersPage: React.FC = () => {
  const { data: users = [], isLoading, isError, refetch } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: TableColumn<UserItem>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '100px',
      render: (row) => <span className="font-mono text-xs text-muted-foreground">{row.id}</span>,
    },
    {
      key: 'name',
      header: 'User & Email',
      sortable: true,
      width: '240px',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-foreground truncate">{row.name}</span>
            <span className="text-xs text-muted-foreground truncate">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      width: '130px',
      render: (row) => <Badge variant="outline">{row.role}</Badge>,
    },
    {
      key: 'tier',
      header: 'Plan Tier',
      sortable: true,
      width: '140px',
      render: (row) => (
        <div className="flex items-center gap-1.5 font-medium text-xs">
          <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span>{row.tier}</span>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      width: '160px',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-foreground">
          <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>{row.department}</span>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      width: '150px',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{row.location}</span>
        </div>
      ),
    },
    {
      key: 'twoFactorEnabled',
      header: '2FA Auth',
      sortable: true,
      width: '130px',
      render: (row) =>
        row.twoFactorEnabled ? (
          <Badge variant="success">
            <ShieldCheck className="h-3 w-3 mr-1" /> Enabled
          </Badge>
        ) : (
          <Badge variant="warning">
            <ShieldAlert className="h-3 w-3 mr-1" /> Disabled
          </Badge>
        ),
    },
    {
      key: 'lastLogin',
      header: 'Last Active',
      sortable: true,
      width: '140px',
      render: (row) => <span className="text-xs text-muted-foreground">{row.lastLogin}</span>,
    },
    {
      key: 'ipAddress',
      header: 'Session IP',
      sortable: true,
      width: '140px',
      render: (row) => (
        <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
          <Globe className="h-3 w-3 text-muted-foreground/60 shrink-0" />
          <span>{row.ipAddress}</span>
        </div>
      ),
    },
    {
      key: 'usageQuota',
      header: 'Storage Quota',
      sortable: true,
      width: '160px',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <HardDrive className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>{row.usageQuota}</span>
        </div>
      ),
    },
    {
      key: 'billingPlan',
      header: 'Billing',
      sortable: true,
      width: '130px',
      render: (row) => (
        <div className="flex items-center gap-1 text-xs text-foreground">
          <CreditCard className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>{row.billingPlan}</span>
        </div>
      ),
    },
    {
      key: 'riskScore',
      header: 'Risk Index',
      sortable: true,
      width: '120px',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <Badge variant={row.riskScore > 50 ? 'danger' : row.riskScore > 10 ? 'warning' : 'success'}>
            {row.riskScore} / 100
          </Badge>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '130px',
      render: (row) => {
        if (row.status === 'ACTIVE') {
          return (
            <Badge variant="success">
              <UserCheck className="h-3 w-3 mr-1" /> Active
            </Badge>
          );
        }
        if (row.status === 'PENDING') {
          return (
            <Badge variant="warning">
              <Clock className="h-3 w-3 mr-1" /> Pending
            </Badge>
          );
        }
        return (
          <Badge variant="danger">
            <UserX className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        );
      },
    },
    {
      key: 'createdAt',
      header: 'Joined Date',
      sortable: true,
      width: '140px',
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '90px',
      render: (row) => (
        <PermissionGuard permission={PERMISSIONS.USERS_DELETE}>
          <Tooltip content="Delete User" position="left">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteUser(row.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </Tooltip>
        </PermissionGuard>
      ),
    },
  ];

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground">Manage organization users, access levels, roles, and security quotas</p>
        </div>

        <PermissionGuard permission={PERMISSIONS.USERS_CREATE}>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add New User
          </Button>
        </PermissionGuard>
      </div>

      {/* Enterprise Data Table with Drag-Drop Reordering & Column Resizing */}
      <DataTable<UserItem>
        columns={columns}
        data={users}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        selectable={true}
        exportable={true}
        reorderableColumns={true}
        resizableColumns={true}
        reorderableRows={true}
        exportFileName="users-full-export"
        searchPlaceholder="Search users by name, email, department, location, or IP..."
        getRowId={(user) => user.id}
        bulkActions={(selectedRows, clearSelection) => (
          <PermissionGuard permission={PERMISSIONS.USERS_DELETE}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                selectedRows.forEach((r) => deleteUser(r.id));
                clearSelection();
              }}
              className="h-7 text-xs"
              leftIcon={<Trash2 className="h-3.5 w-3.5" />}
            >
              Delete Selected ({selectedRows.length})
            </Button>
          </PermissionGuard>
        )}
      />

      {/* Create User Dialog Modal */}
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
