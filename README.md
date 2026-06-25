# Barna Frontend

Next.js 14 TypeScript frontend for Barna Mezon Iran.

## Stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS (custom gold/wine theme)
- Material UI (dashboard)
- TanStack Query v5
- react-hook-form + zod

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. `npm run dev`

## Structure
- `src/app/(site)/` — public website
- `src/app/(dashboard)/` — admin dashboard
- `src/app/(auth)/` — login/register
- `src/components/site/` — site components (Tailwind)
- `src/components/dashboard/` — dashboard components (MUI)
- `src/lib/api/` — API layer (axios + TanStack Query)
- `src/types/` — TypeScript types
- `src/i18n/` — Persian/English translations
