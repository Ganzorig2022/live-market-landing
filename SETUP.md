# Setup

Live Market Landing - A landing page for a live-commerce e-commerce platform.

## Features

- Public landing page with hero, features, FAQ
- 3-step signup flow (Organization Info → OTP Verification → Agreement + Signature)
- Email OTP verification
- Sign-in page
- NextAuth v5 authentication
- Sequelize + PostgreSQL
- Tailwind CSS + shadcn/ui

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL (local)

## Quick Start

### 1) Clone & Install

```bash
cd /Users/ganzorig/Documents/GitHub/live-market-landing
pnpm install
```

### 2) Environment Variables

Copy the example file:

```bash
cp env.example .env.local
```

Key variables:

| Variable | Description |
|----------|-------------|
| `PGDB_NAME` | Database name (default: `market_landing`) |
| `PGDB_USERNAME` | Database user |
| `PGDB_PASSWORD` | Database password |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `JWT_SECRET` | Secret for API JWT tokens |
| `SMTP_*` | (Optional) Email config for OTP |

### 3) Create Database

```sql
CREATE DATABASE market_landing;
```

### 4) Initialize Tables

```bash
pnpm db:create-tables
```

This creates:
- `users`
- `businesses`
- `shops`
- `warehouses`
- `pending_registrations`

### 5) (Optional) Seed Admin User

```bash
pnpm db:seed
```

Creates:
- Email: `admin@example.com`
- Password: `admin123`

### 6) Run Development Server

```bash
pnpm dev
```

Open http://localhost:3000

## Project Structure

```
live-market-landing/
├── app/
│   ├── (landing)/              # Public landing pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (auth)/                 # Auth pages
│   │   ├── layout.tsx
│   │   ├── login/
│   │   └── signup/
│   │       ├── page.tsx        # Step 1
│   │       ├── verify/         # Step 2
│   │       └── agreement/      # Step 3
│   ├── registration-complete/
│   └── api/
│       ├── auth/
│       ├── signup/
│       └── health/
├── components/
│   ├── ui/                     # shadcn components
│   ├── landing/                # Header, Footer, Hero, etc.
│   └── auth/                   # SignupStepper, SignatureCanvas
├── services/                   # Business logic
├── models/                     # Sequelize models
├── lib/                        # Utilities
└── scripts/                    # DB scripts
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:create-tables` | Sync models to database |
| `pnpm db:seed` | Seed admin user |

## Signup Flow

1. **Step 1**: User fills org info → Creates pending registration → Sends OTP
2. **Step 2**: User enters OTP → Verifies email
3. **Step 3**: User signs agreement → Creates Business, Shop, Warehouse, User (all inactive)
4. **Complete**: Shows success message, waits for admin approval

## Email Configuration

OTP emails are logged to console by default. To send actual emails:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="Live Market <noreply@livemarket.com>"
```

## Notes

- New registrations have `isActive=false` (requires admin approval)
- Admin dashboard is a separate project
- See `PROJECT_STATUS.md` for detailed implementation status


```
# Project Architecture

- Frontend: Next.js App Router (app/), React 19, Tailwind, Radix UI, React Hook Form, TanStack Table.
- Backend: Next.js route.ts endpoints + some server actions (actions.ts files), talking to Postgres through Sequelize.

# Project flow raw scketch

- live market landing page + sign in/up features + hero section + header/footer + FAQ
- Sign in redirects to Login page
- Sign up is a 3 step process:
    1. Organization info
    2. Email OTP verification
    3. Agreement + Signature
- Business info, Store, and Warehouse are created during sign up (is_active = false initially)
- Hero section for website introduction (FAQ)
- Header and Footer components

# Frontend Structure

> Language and Frameworks
    - Next.js with App Router
    - React 19
    - TypeScript
    - Tailwind CSS
    - Shadcn UI (Radix UI + Tailwind)
    - React Hook Form

> UI Components

- app/
    - layout.tsx - Main layout file for the application
    - page.tsx - Landing page component
    - auth/ - Authentication related pages (sign in, sign up)
    - components/ - Reusable UI components
    - styles/ - Global styles and Tailwind configuration

> API routes
    - api/ - Backend API route handlers
    - Server Actions handle mutations and list queries.
    - Client components consume Server Actions + API routes as needed.

> Data layer
    - lib/sequelize.ts - Sequelize instance and configuration (singleton Sequelize connection from PGDB_* env vars)
    - models/*.ts - Sequelize models for database tables
    - scripts/*.ts - Database migration and seed scripts (pnpm db:create-tables, pnpm db:seed:*)
> Business logic
    - services/*.ts - Business logic and service layer functions

> Packages and third-part libraries
    - NextAuth.js for authentication
    - Tailwind CSS for styling
    - Shadcn UI (Radix UI + Tailwind) for UI components
    - React Hook Form for form handling
    - Zod for schema validation
    - bcryptjs for password hashing
    - Sequelize ORM for database interactions
    - pg for PostgreSQL client
    - dotenv for environment variable management
    - nodemailer for sending emails

# Project Setup

> Prerequisites:
    - Node.js
    - PostgreSQL database
    - pnpm package manager
    - Environment variables configured (see .env.example)
    - Sequelize CLI installed globally (optional)
> Installation:
    1. Clone the repository
    2. Install dependencies: `pnpm install`
    3. Set up the database and run migrations: `pnpm db:create-tables`
    4. Seed initial data (if needed): `pnpm db:seed:all`
    5. Start the development server: `pnpm dev`
> Environment Variables:
    - PGDB_HOST: Database host
    - PGDB_PORT: Database port
    - PGDB_USER: Database user
    - PGDB_PASSWORD: Database password
    - PGDB_NAME: Database name
    - NEXTAUTH_SECRET: Secret for NextAuth.js
    - NEXTAUTH_URL: URL for NextAuth.js




    "When you register, a request is sent to the admin. Once it's approved, the login information will be sent to your email, and then you can log in."
```