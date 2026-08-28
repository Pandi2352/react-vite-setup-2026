import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '../schemas/user.schema';
import { useCreateUser } from '../hooks/use-users';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CustomSelect } from '@/components/ui/select';
import { ROLES } from '@/utils/constants';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  const { mutate: createUser, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: ROLES.USER,
      status: 'ACTIVE',
    },
  });

  const selectedRole = watch('role');
  const selectedStatus = watch('status');

  const onSubmit = (data: UserFormData) => {
    createUser(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const roleOptions = [
    { label: 'User', value: ROLES.USER },
    { label: 'Manager', value: ROLES.MANAGER },
    { label: 'Admin', value: ROLES.ADMIN },
    { label: 'Super Admin', value: ROLES.SUPER_ADMIN },
  ];

  const statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New User"
      description="Add a new member to your organization"
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="create-user-form" isLoading={isPending}>
            Create User
          </Button>
        </>
      }
    >
      <form id="create-user-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. John Doe"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. john@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Role</label>
          <CustomSelect
            value={selectedRole}
            onChange={(val) => setValue('role', val as any)}
            options={roleOptions}
            className="w-full"
          />
          {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Status</label>
          <CustomSelect
            value={selectedStatus}
            onChange={(val) => setValue('status', val as any)}
            options={statusOptions}
            className="w-full"
          />
          {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
        </div>
      </form>
    </Dialog>
  );
};
