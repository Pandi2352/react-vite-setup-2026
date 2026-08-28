import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { AuthLayout } from '@/components/layout/auth-layout';
import { ProtectedRoutes } from '@/routes/protected-routes';
import { PublicRoutes } from '@/routes/public-routes';
import { LoadingScreen } from '@/components/common/loading-screen';

// Lazy Loaded Pages
const LoginPage = lazy(() =>
  import('@/features/auth/pages/login-page').then((m) => ({ default: m.LoginPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('@/features/auth/pages/forgot-password-page').then((m) => ({
    default: m.ForgotPasswordPage,
  }))
);
const ResetPasswordPage = lazy(() =>
  import('@/features/auth/pages/reset-password-page').then((m) => ({
    default: m.ResetPasswordPage,
  }))
);
const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/dashboard-page').then((m) => ({
    default: m.DashboardPage,
  }))
);
const UsersPage = lazy(() =>
  import('@/features/users/pages/users-page').then((m) => ({ default: m.UsersPage }))
);
const SettingsPage = lazy(() =>
  import('@/features/settings/pages/settings-page').then((m) => ({
    default: m.SettingsPage,
  }))
);
const AuditLogsPage = lazy(() =>
  import('@/features/dashboard/pages/audit-logs-page').then((m) => ({
    default: m.AuditLogsPage,
  }))
);
const ReportsPage = lazy(() =>
  import('@/features/dashboard/pages/reports-page').then((m) => ({
    default: m.ReportsPage,
  }))
);
const MultiStepFormPage = lazy(() =>
  import('@/features/forms/pages/multi-step-form-page').then((m) => ({
    default: m.MultiStepFormPage,
  }))
);
const DesignSystemPage = lazy(() =>
  import('@/features/dashboard/pages/design-system-page').then((m) => ({
    default: m.DesignSystemPage,
  }))
);

const ForbiddenPage = lazy(() =>
  import('@/features/errors/pages/403-page').then((m) => ({ default: m.ForbiddenPage }))
);
const NotFoundPage = lazy(() =>
  import('@/features/errors/pages/404-page').then((m) => ({ default: m.NotFoundPage }))
);
const ServerErrorPage = lazy(() =>
  import('@/features/errors/pages/500-page').then((m) => ({ default: m.ServerErrorPage }))
);

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  // Public Unauthenticated Routes
  {
    element: <PublicRoutes />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: withSuspense(LoginPage) },
          { path: '/forgot-password', element: withSuspense(ForgotPasswordPage) },
          { path: '/reset-password', element: withSuspense(ResetPasswordPage) },
        ],
      },
    ],
  },

  // Protected Authenticated Routes
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: withSuspense(DashboardPage) },
          { path: '/users', element: withSuspense(UsersPage) },
          { path: '/users/roles', element: withSuspense(UsersPage) },
          { path: '/reports', element: withSuspense(ReportsPage) },
          { path: '/audit-logs', element: withSuspense(AuditLogsPage) },
          { path: '/forms/wizard', element: withSuspense(MultiStepFormPage) },
          { path: '/design-system', element: withSuspense(DesignSystemPage) },
          { path: '/settings', element: withSuspense(SettingsPage) },
        ],
      },
    ],
  },

  // Standalone Error Pages
  { path: '/403', element: withSuspense(ForbiddenPage) },
  { path: '/500', element: withSuspense(ServerErrorPage) },
  { path: '*', element: withSuspense(NotFoundPage) },
]);
