# Architecture & System Design 🏛️

This document outlines the architectural patterns, directory structure, state management strategy, and design decisions powering ForgeUI.

---

## 📂 Directory Layout

```
src/
├── app/                  # Application initialization, router, and global providers
│   ├── providers.tsx     # Combined QueryClient, ThemeProvider, ToastProvider wrappers
│   └── router.tsx        # React Router v7 lazy-loaded route definitions
│
├── components/           # Reusable UI & Layout Components
│   ├── common/           # ErrorBoundary, LoadingScreen, PermissionGuard, SEOHead
│   ├── layout/           # AppLayout, Navbar, Sidebar, Breadcrumbs, CommandPalette
│   ├── theme/            # ThemeProvider, ThemeToggle, ThemeSelector, ThemeCustomizerDrawer
│   └── ui/               # Base design system primitives (Button, Card, Input, Select, Table, Chart)
│
├── config/               # Navigation menus, static options, and app constants
├── features/             # Domain-driven feature modules
│   ├── auth/             # Login, Forgot/Reset Password pages & schemas
│   ├── dashboard/        # Analytics dashboard pages, charts, audit logs, reports
│   ├── errors/           # 403, 404, 500 standalone error pages
│   ├── forms/            # Wizard steps (step-organization, step-license-access, step-review)
│   ├── settings/         # SettingsPage & ThemeSelector integrations
│   └── users/            # Users management data table, modals, hooks, API
│
├── hooks/                # Custom React hooks (useTheme, useDebounce, useFormUnsavedChanges)
├── lib/                  # Utilities (axios, theme, fonts, query-client, storage)
├── routes/               # PublicRoutes and ProtectedRoutes guards
├── store/                # Zustand global state slices (auth-store, ui-store)
├── styles/               # globals.css with Tailwind CSS v4 design tokens
├── types/                # Common TypeScript type definitions
└── utils/                # Constants and formatting helpers
```

---

## 📐 Core Architectural Principles

1. **Domain-Driven Modularization**:
   - Feature code (`auth`, `users`, `forms`, `dashboard`) is co-located inside `src/features/`.
   - Large pages are decomposed into sub-components under 150 lines each.

2. **Zero-Flash Theme Engine**:
   - Zero white-flash execution via inline `<script>` inside `index.html` `<head>`.
   - 0ms repaint transition suppressor in `applyThemeToDocument` preventing color fading lag during theme switches.

3. **Single Source of Truth State**:
   - **Server State**: Managed via `@tanstack/react-query` for automatic caching and invalidation.
   - **UI State**: Managed via lightweight `zustand` stores (`useUIStore`, `useAuthStore`).
   - **Theme State**: Managed via `ThemeProvider` React Context with cross-tab `localStorage` synchronization.

4. **Modular Barrel Exports**:
   - Clean barrel `index.ts` files in `src/components/ui/index.ts`, `src/components/common/index.ts`, and `src/components/theme/index.ts`.
