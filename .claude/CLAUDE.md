# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application implementing **Feature Sliced Design (FSD)** architecture with Supabase authentication. It's designed as a boilerplate/learning project that demonstrates modern React patterns with authentication flows.

**Key Technologies:**
- Next.js 15 (App Router)
- React 19
- TypeScript 5.3.3
- Supabase (Authentication & Database)
- Tailwind CSS
- shadcn/ui components

**Package Manager:** pnpm

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Add new shadcn/ui component (configured for this project)
pnpm add-component [component-name]
```

## Core Architecture: Feature Sliced Design (FSD)

The project follows FSD methodology with these layers (from lowest to highest):

### **shared/** - Reusable Infrastructure
- UI components (following shadcn/ui patterns)
- Supabase client configurations
- Utility functions and constants
- TypeScript path: `@/shared/*`

### **entities/** - Business Entities
- Core business models (user, tool, category, review, subscription)
- Read-only domain logic
- UI components that represent entities
- TypeScript path: `@/entities/*`

### **features/** - Product Features
- Business functionality implementation (auth, login, sign-up, profile, review, compare, search, onboarding, subscription)
- CRUD operations and server actions
- State management logic
- TypeScript path: `@/features/*`

### **widgets/** - UI Composition Blocks
- Complex UI blocks composed from features, entities, and shared components
- Layout and presentation logic
- TypeScript path: `@/widgets/*`

### **app/** - Application Layer
- Next.js App Router pages and routing
- Global layouts and middleware configuration
- Combines FSD traditional "app" layer with "pages" layer
- TypeScript path: `@/app/*`

## Key Dependency Rules

1. **Unidirectional imports:** Higher layers can import from lower layers only
2. **Layer isolation:** Same-layer slices cannot depend on each other
3. **Public API:** Each slice exposes functionality through `index.ts`

## Authentication Architecture

### Supabase Integration
- **Client-side:** `@/shared/utils/supabase/client.ts`
- **Server-side:** `@/shared/utils/supabase/server.ts`
- **Middleware:** `@/shared/utils/supabase/middleware.ts`

### Auth Flow Patterns
- Server Actions are used for auth operations (look for `"use server"` directive)
- Session management through Next.js middleware
- Route protection via Supabase middleware integration

### Key Auth Components
- `@/features/auth/ui/AuthButton.tsx` - Authentication state display
- `@/features/login/ui/LoginForm.tsx` - Login form implementation
- `@/features/sign-up/ui/SignUpForm.tsx` - Registration form
- `@/features/auth/ui/ResetPasswordButton.tsx` - Password reset

## File Organization Patterns

Each FSD slice follows consistent structure:
```
slice-name/
├── ui/           # React components
├── model/        # Business logic, hooks, types
├── api/          # External API calls and server actions
├── action/       # Server actions (alternative to api/)
└── index.ts      # Public exports
```

## Component Development Patterns

### Adding UI Components
1. **shadcn/ui components:** Use `pnpm add-component [name]` - automatically configured to use `@/shared/ui`
2. **Custom components:** Place in appropriate FSD layer (`shared/ui`, `entities/*/ui`, `features/*/ui`, `widgets/*/ui`)

### Styling Conventions
- **Primary:** Tailwind CSS utility classes
- **Configuration:** Uses "new-york" shadcn/ui style with zinc base color
- **CSS Variables:** Enabled for theming
- **Global styles:** Located in `src/app/globals.css`

### TypeScript Patterns
- **Strict mode** enabled
- **Path mapping** configured for all FSD layers
- **Naming conventions:**
  - Components: PascalCase
  - Hooks: camelCase starting with 'use'
  - Types/Interfaces: PascalCase with `.interface.ts` or `.types.ts` suffix
  - Utilities: kebab-case

## Server Actions & Data Fetching

### Server Actions Pattern
Server actions are located in ``action/` folders within appropriate FSD slices:
- Authentication: `@/features/login/action/login.ts`, `@/features/sign-up/action/create-user.ts`
- Profile management: `@/features/profile/action/updateUser.ts`
- Reviews: `@/features/review/action/` (CRUD operations)

### Data Flow
- **Server Components:** Fetch data directly using Supabase server client
- **Client State:** React hooks for local state management
- **Server State:** Server actions for mutations, direct fetching in server components
- **No external state management:** Project avoids Redux, Zustand, etc.

## Code Quality Guidelines

### Core Principles (from .cursor/rules)
- **Simplicity:** Prioritize simple solutions over complex ones
- **DRY Principle:** Prevent code duplication, reuse existing functionality
- **No Mock Data:** Avoid mock data in development/production (tests only)
- **Token Efficiency:** Optimize output to minimize unnecessary verbosity

### Tech Stack Constraints
- **Package Manager:** Always use pnpm
- **No CSS-in-JS:** Use only Tailwind CSS (no styled-components, emotion, etc.)
- **No additional backend frameworks:** Stick to Next.js App Router + Supabase
- **Authentication:** Only Supabase Auth (no Firebase, Auth0, etc.)

## Environment Setup

Required environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Route Structure

The project uses Next.js App Router with route groups:
- `(auth)/` - Authentication pages (login, sign-up, reset-password)
- `(main)/` - Main application pages with shared layout
- Parallel routes: `@review-drawer/` for modal overlays
- Dynamic routes: `[slug]/` for tool pages

## Middleware Configuration

Authentication middleware runs on all routes except:
- Static files (`_next/static`, `_next/image`)
- Image files (svg, png, jpg, jpeg, gif, webp)
- favicon.ico

This ensures proper session management across the application.

