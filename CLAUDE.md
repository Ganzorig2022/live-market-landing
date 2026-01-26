# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Live Market Landing is a landing page for a live-commerce e-commerce platform with a 3-step signup flow. Built with Next.js 15 App Router, NextAuth v5, Sequelize ORM, and PostgreSQL.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (runs on port 3005)
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Lint code
pnpm lint

# Database operations
pnpm db:create-tables    # Sync Sequelize models to database
pnpm db:seed             # Create admin user (admin@example.com / admin123)
```

## Architecture Overview

### Authentication Flow
- **NextAuth v5** with JWT strategy configured in `auth.ts`
- Credentials provider calls `/api/auth/login` endpoint
- Login validates against User model with bcrypt password comparison
- Session includes user details + `accessToken` for API calls
- All new user registrations start with `isActive=false` (requires admin approval)

### 3-Step Signup Flow
1. **Step 1** (`/signup`): Organization info form → Creates `PendingRegistration` → Sends OTP email
2. **Step 2** (`/signup/verify`): OTP verification → Sets `otpVerified=true` on PendingRegistration
3. **Step 3** (`/signup/agreement`): Terms acceptance + signature → Creates Business, Shop, Warehouse, User (all inactive) → Deletes PendingRegistration

### Database Architecture
**Models** (`models/`) - Sequelize ORM with PostgreSQL:
- `User` - belongs to Business, stores signature, role, isActive flag
- `Business` - has many Shops, Warehouses, Users
- `Shop` - belongs to Business
- `Warehouse` - belongs to Business
- `PendingRegistration` - temporary signup data, includes OTP + expiry

**Key Associations** (defined in `models/index.ts`):
```
Business → hasMany → [Shop, Warehouse, User]
Shop/Warehouse/User → belongsTo → Business
```

**Database Connection** (`lib/sequelize.ts`):
- Singleton Sequelize instance from `PGDB_*` env vars
- Logging enabled in development mode only
- Custom timestamp parser to handle UTC timestamps

### Service Layer Pattern
Business logic is isolated in `services/`:
- `auth.service.ts` - Login validation, password comparison
- `otp.service.ts` - OTP generation (6 digits), verification, email sending
- `registration.service.ts` - Multi-step signup orchestration

### API Structure
- `/api/auth/login` - POST credentials, returns JWT token + user data
- `/api/signup/initiate` - Step 1: Create pending registration + send OTP
- `/api/signup/verify-otp` - Step 2: Verify OTP code
- `/api/signup/complete` - Step 3: Finalize registration (create all entities)
- `/api/signup/send-otp` - Resend OTP (60s cooldown)
- `/api/signup/status` - Get registration status by email
- `/api/health` - Health check endpoint

### Email System
- Configured in `lib/email.ts` using nodemailer
- If SMTP not configured → logs emails to console (dev mode)
- OTP emails use HTML template with 6-digit code
- OTPs expire after 10 minutes

### Route Organization
```
app/
├── (landing)/           # Public pages with Header/Footer layout
│   └── page.tsx         # Landing page (Hero, Features, FAQ)
├── (auth)/              # Auth pages with minimal layout
│   ├── login/
│   └── signup/
│       ├── page.tsx     # Step 1
│       ├── verify/      # Step 2
│       └── agreement/   # Step 3
├── registration-complete/
└── api/                 # API routes
```

## Environment Setup

1. Copy `env.example` to `.env.local`
2. Set database credentials (`PGDB_*`)
3. Generate `NEXTAUTH_SECRET`: `openssl rand -base64 32`
4. Generate `JWT_SECRET`: `openssl rand -base64 32`
5. (Optional) Configure SMTP for real email sending

## Key Implementation Details

### Signature Handling
- Uses `signature_pad` library in `SignatureCanvas` component
- Stored as base64 data URL in `User.signature` field
- Required for signup Step 3 completion

### OTP System
- 6-digit numeric codes
- 10-minute expiration
- 60-second cooldown between resend requests
- Stored in `PendingRegistration.otpCode` (plaintext)
- Expiry tracked in `PendingRegistration.otpExpiresAt`

### Path Aliases
- `@/*` maps to project root (configured in `tsconfig.json`)

### Port Configuration
- Dev server runs on port **3005** (not default 3000)
- Update `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_API_URL` if changing ports

## Database Schema Notes

All entities created during signup have `isActive=false`:
- Business.isActive
- Shop.isActive
- Warehouse.isActive
- User.isActive

These flags are intended to be updated by admin approval flow (not implemented in this project).

## Common Workflows

### Adding a New API Route
1. Create `app/api/[route]/route.ts`
2. Extract business logic to `services/[name].service.ts`
3. Use Sequelize models from `models/index.ts`
4. Return JSON responses with proper status codes

### Adding a New Sequelize Model
1. Create model file in `models/[ModelName].ts`
2. Define associations in `models/index.ts`
3. Export from `models/index.ts`
4. Run `pnpm db:create-tables` to sync to database

### Working with Forms
- Forms use React Hook Form + Zod validation
- shadcn/ui form components in `components/ui/`
- Form submission typically calls API routes (not server actions)