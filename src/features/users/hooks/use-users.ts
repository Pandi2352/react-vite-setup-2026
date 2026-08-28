import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users-api';
import { CreateUserInput } from '../types/user.types';
import { useToast } from '@/components/ui/toast';

export const USERS_QUERY_KEY = ['users'];

export function useUsers() {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: () => usersApi.getUsers(),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (newUserData: CreateUserInput) => usersApi.createUser(newUserData),
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      toast.success(`User "${newUser.name}" created successfully.`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create user.');
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      toast.success('User deleted successfully.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete user.');
    },
  });
}
