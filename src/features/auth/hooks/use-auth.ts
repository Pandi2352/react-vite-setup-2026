import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '../api/auth-api';
import { LoginInput } from '../schemas/auth.schema';
import { useAuthStore } from '@/store/auth-store';
import { useToast } from '@/components/ui/toast';

export function useLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const toast = useToast();

  return useMutation({
    mutationFn: (credentials: LoginInput) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens.accessToken);
      toast.success(`Welcome back, ${data.user.name}!`);
      const redirect = searchParams.get('redirect') || '/dashboard';
      navigate(redirect, { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    },
  });
}
