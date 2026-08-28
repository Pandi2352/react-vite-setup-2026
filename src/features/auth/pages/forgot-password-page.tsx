import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { forgotPasswordSchema, ForgotPasswordInput } from '../schemas/auth.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ForgotPasswordPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Reset Password</h2>
        <p className="text-xs text-muted-foreground">Enter your email to receive password reset instructions</p>
      </div>

      {isSubmitted ? (
        <div className="space-y-4 text-center py-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm text-foreground">A reset link has been sent to your email address if an account exists.</p>
          <Link to="/login" className="inline-flex items-center text-xs text-primary font-medium hover:underline">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Return to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@forgeui.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
            Send Reset Instructions
          </Button>

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
