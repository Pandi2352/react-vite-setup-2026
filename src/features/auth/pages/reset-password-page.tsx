import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { resetPasswordSchema, ResetPasswordInput } from '../schemas/auth.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ResetPasswordPage: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSuccess(true);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Set New Password</h2>
        <p className="text-xs text-muted-foreground">Type in your new secure account password below</p>
      </div>

      {isSuccess ? (
        <div className="space-y-4 text-center py-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm text-foreground">Your password has been successfully updated!</p>
          <Link to="/login" className="inline-flex items-center text-xs text-primary font-medium hover:underline">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Sign in with new password
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
            Update Password
          </Button>

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
