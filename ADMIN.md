# What This Admin Project Does

This is a multi-tenant e-commerce and inventory management platform with:  
 ┌──────────────────────┬───────────────────────────────────────────────────────┐  
 │ Feature │ Description │  
 ├──────────────────────┼───────────────────────────────────────────────────────┤  
 │ Business Management │ Create/manage business entities │  
 ├──────────────────────┼───────────────────────────────────────────────────────┤  
 │ Shop Management │ Each business can have multiple shops │  
 ├──────────────────────┼───────────────────────────────────────────────────────┤  
 │ Warehouse Management │ Inventory storage locations │  
 ├──────────────────────┼───────────────────────────────────────────────────────┤  
 │ Product Catalog │ Products with variants, pricing, categories │  
 ├──────────────────────┼───────────────────────────────────────────────────────┤  
 │ Order Management │ Orders, payments, status tracking │  
 ├──────────────────────┼───────────────────────────────────────────────────────┤  
 │ Live Streaming │ Facebook integration for live commerce │  
 ├──────────────────────┼───────────────────────────────────────────────────────┤  
 │ User Management │ Role-based access (admin, business-owner, shop-admin) │  
 └──────────────────────┴───────────────────────────────────────────────────────┘  
 Tech Stack

- Next.js 16 (App Router)
- PostgreSQL + Sequelize ORM
- NextAuth v5 (JWT-based auth)
- Nodemailer (email)

---

📊 Recommended Architecture

Here's the complete flow:

┌─────────────────────────────────────────────────────────────────────────────┐  
 │ LANDING PAGE (Your new project) │  
 ├─────────────────────────────────────────────────────────────────────────────┤  
 │ │  
 │ Step 1: User Info Form │  
 │ └─> POST /api/registration/initiate │  
 │ └─> Creates PendingRegistration (step=1) │  
 │ └─> Sends OTP email │  
 │ └─> Updates step=2 │  
 │ │  
 │ Step 2: OTP Verification │  
 │ └─> POST /api/registration/verify-otp │  
 │ └─> Sets otpVerified=true, step=3 │  
 │ │  
 │ Step 3: Terms & Signature │  
 │ └─> POST /api/registration/complete │  
 │ └─> Creates: Business, Shop, Warehouse, User, BusinessAgreement │  
 │ └─> All with status=false (pending approval) │  
 │ │  
 └─────────────────────────────────────────────────────────────────────────────┘  
 │  
 ▼  
 ┌─────────────────────────────────────────────────────────────────────────────┐  
 │ SHARED DATABASE │  
 │ │  
 │ ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────────┐ │  
 │ │ pending_registrations│ │ businesses │ │ users │ │  
 │ │ (step, otpVerified) │ │ (status=false) │ │ (isActive=false)│ │  
 │ └──────────────────────┘ └──────────────────────┘ └─────────────────┘ │  
 │ │  
 │ ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────────┐ │  
 │ │business_agreements │ │ shops │ │ warehouses │ │  
 │ │(signature, terms) │ │ (status=false) │ │ (isActive=false)│ │  
 │ └──────────────────────┘ └──────────────────────┘ └─────────────────┘ │  
 │ │  
 └─────────────────────────────────────────────────────────────────────────────┘  
 │  
 ▼  
 ┌─────────────────────────────────────────────────────────────────────────────┐  
 │ ADMIN PANEL (This project) │  
 ├─────────────────────────────────────────────────────────────────────────────┤  
 │ │  
 │ /pending-registrations (NEW PAGE) │  
 │ └─> Lists all pending Business registrations where status=false │  
 │ └─> Shows: businessName, email, shopName, agreement signature │  
 │ └─> Actions: [Approve] [Reject] │  
 │ │  
 │ On Approve: │  
 │ └─> POST /api/admin/registrations/[id]/approve │  
 │ └─> Sets Business.status = true │  
 │ └─> Sets Shop.status = true │  
 │ └─> Sets Warehouse.isActive = true │  
 │ └─> Sets User.isActive = true │  
 │ └─> Generates temporary password (or keeps existing) │  
 │ └─> Sends WELCOME EMAIL with login credentials │  
 │ │  
 │ On Reject: │  
 │ └─> Soft-delete or mark as rejected │  
 │ └─> Send rejection email (optional) │  
 │ │  
 └─────────────────────────────────────────────────────────────────────────────┘

---

📝 What You Need to Add to Admin Project

1. New Models

PendingRegistration - For tracking signup steps:  
 // models/PendingRegistration.ts  
 interface PendingRegistrationAttributes {  
 id: string;  
 email: string;  
 password: string; // hashed  
 firstName: string;  
 lastName: string;  
 phone: string;  
 businessName: string;  
 shopName: string;  
 numberOfEmployees: number | null;  
 hasMultipleShops: boolean;  
 hasMultipleWarehouses: boolean;  
 step: number; // 1=info, 2=otp, 3=complete  
 otpVerified: boolean;  
 otpCode?: string;  
 otpExpiresAt?: Date;  
 createdAt: Date;  
 updatedAt: Date;  
 }

BusinessAgreement - For storing signatures:  
 // models/BusinessAgreement.ts  
 interface BusinessAgreementAttributes {  
 id: string;  
 businessId: string;  
 userId: string;  
 agreedToTerms: boolean;  
 signatureData: string; // base64 signature image  
 agreedAt: Date;  
 createdAt: Date;  
 updatedAt: Date;  
 }

2. Update Business Model

Add these fields to models/Business.ts:  
 numberOfEmployees: number | null;  
 hasMultipleShops: boolean;  
 hasMultipleWarehouses: boolean;  
 approvedAt: Date | null;  
 approvedBy: string | null; // admin user ID

3. New API Endpoints  
   ┌───────────────────────────────────────────────┬────────┬─────────────────────────────┐  
   │ Endpoint │ Method │ Purpose │  
   ├───────────────────────────────────────────────┼────────┼─────────────────────────────┤  
   │ /api/public/registration/initiate │ POST │ Create pending registration │  
   ├───────────────────────────────────────────────┼────────┼─────────────────────────────┤  
   │ /api/public/registration/verify-otp │ POST │ Verify OTP code │  
   ├───────────────────────────────────────────────┼────────┼─────────────────────────────┤  
   │ /api/public/registration/complete │ POST │ Create all entities │  
   ├───────────────────────────────────────────────┼────────┼─────────────────────────────┤  
   │ /api/admin/pending-registrations │ GET │ List pending approvals │  
   ├───────────────────────────────────────────────┼────────┼─────────────────────────────┤  
   │ /api/admin/pending-registrations/[id]/approve │ POST │ Approve registration │  
   ├───────────────────────────────────────────────┼────────┼─────────────────────────────┤  
   │ /api/admin/pending-registrations/[id]/reject │ POST │ Reject registration │  
   └───────────────────────────────────────────────┴────────┴─────────────────────────────┘
4. New Admin Page

Create /app/(manage)/pending-registrations/ with:

- List view of pending businesses (where status=false)
- Detail modal showing all info + signature preview
- Approve/Reject buttons

5. Welcome Email Template

Add to lib/email.ts:  
 export async function sendWelcomeEmail({  
 to,  
 firstName,  
 lastName,  
 loginUrl,  
 email, // login username  
 password, // temporary or original password  
 }: WelcomeEmailParams)

---

🎯 Strategy Options

You have two main approaches:

Option A: Shared Database (Recommended)

Both Landing and Admin connect to the same PostgreSQL database.

Pros:

- Simple architecture
- Real-time data sync
- Single source of truth

Cons:

- Need to coordinate model changes
- Both apps need same Sequelize models

Option B: API-Based Communication

Landing calls Admin API endpoints to sync data.

Pros:

- Decoupled systems
- Admin controls data schema

Cons:

- More complex
- Need to handle API errors
- Potential sync delays

---

🚀 Recommended Next Steps

1. Add missing models to Admin (PendingRegistration, BusinessAgreement)
2. Update Business model with new fields
3. Create public API endpoints for Landing to call
4. Create admin approval page at /pending-registrations
5. Create welcome email template
6. Share database connection between Landing and Admin
