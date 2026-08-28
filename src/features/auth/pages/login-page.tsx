import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { loginSchema, LoginInput } from '../schemas/auth.schema';
import { useLogin } from '../hooks/use-auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const LoginPage: React.FC = () => {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@forgeui.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Sign In</h2>
        <p className="text-xs text-muted-foreground">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="admin@forgeui.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-muted-foreground select-none">
            <input
              type="checkbox"
              className="rounded border-border text-primary focus:ring-primary h-4 w-4"
              {...register('rememberMe')}
            />
            <span>Remember me</span>
          </label>

          <Link to="/forgot-password" className="text-primary hover:underline font-medium">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          isLoading={isPending}
          leftIcon={<LogIn className="h-4 w-4" />}
        >
          Sign In to Dashboard
        </Button>
      </form>
    </div>
  );
};
