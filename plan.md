Plan: Add Toast Notifications for Incomplete Signup Steps │  
 │ │  
 │ Summary │  
 │ │  
 │ Add toast notifications in Mongolian to warn users when their signup steps are incomplete. If users don't complete all steps, their data will be ignored and deleted. │  
 │ │  
 │ Context │  
 │ │  
 │ - Previous fixes (PendingRegistration deletion, UUID validation) are already implemented │  
 │ - Admin side only sees completed signups awaiting approval (Business/User with isActive=false) │  
 │ - Incomplete PendingRegistration records should be cleaned up │  
 │ │  
 │ Current State │  
 │ │  
 │ - No toast library installed - uses inline error messages only │  
 │ - All UI text is already in Mongolian (hardcoded) │  
 │ - Signup flow: Step 1 → Step 2 (OTP) → Step 3 (Agreement) │  
 │ │  
 │ --- │  
 │ Implementation Plan │  
 │ │  
 │ 1. Install Toast Library (sonner) │  
 │ │  
 │ pnpm add sonner │  
 │ │  
 │ Why sonner: Lightweight, Next.js 15 compatible, easy to use, good default styling. │  
 │ │  
 │ --- │  
 │ 2. Add Toaster Provider │  
 │ │  
 │ File: app/(auth)/layout.tsx │  
 │ │  
 │ Add <Toaster /> component to the auth layout: │  
 │ import { Toaster } from "sonner"; │  
 │ │  
 │ export default function AuthLayout({ children }) { │  
 │ return ( │  
 │ <> │  
 │ {children} │  
 │ <Toaster position="top-center" richColors /> │  
 │ </> │  
 │ ); │  
 │ } │  
 │ │  
 │ --- │  
 │ 3. Add Toast Warnings for Incomplete Steps │  
 │ │  
 │ Step 1 (/signup/page.tsx) │  
 │ │  
 │ - On page load, show info toast if returning with incomplete data │  
 │ - Mongolian text: "Бүртгэлийн алхмуудыг бүрэн гүйцэтгэнэ үү. Дуусгаагүй бол таны мэдээлэл устгагдах болно." │  
 │ │  
 │ Step 2 (/signup/verify/page.tsx) │  
 │ │  
 │ - On page load, check if registrationId exists │  
 │ - If not, redirect to Step 1 with warning toast │  
 │ - If OTP not verified within timeout, show warning │  
 │ │  
 │ Step 3 (/signup/agreement/page.tsx) │  
 │ │  
 │ - On page load, verify OTP was completed │  
 │ - If not, redirect back with warning toast │  
 │ │  
 │ --- │  
 │ 4. Mongolian Toast Messages │  
 │ ┌──────────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────┐ │  
 │ │ Scenario │ Message │ │  
 │ ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┤ │  
 │ │ Incomplete steps warning │ "Бүртгэлийн алхмуудыг бүрэн гүйцэтгэнэ үү. Дуусгаагүй бол таны мэдээлэл устгагдах болно." │ │  
 │ ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┤ │  
 │ │ Missing registration │ "Бүртгэлийн мэдээлэл олдсонгүй. Дахин эхлүүлнэ үү." │ │  
 │ ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┤ │  
 │ │ OTP not verified │ "Баталгаажуулах код шалгагдаагүй байна." │ │  
 │ ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┤ │  
 │ │ Session expired │ "Таны бүртгэлийн хугацаа дууссан. Дахин эхлүүлнэ үү." │ │  
 │ └──────────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────┘ │  
 │ Translation of main warning: │  
 │ "Please complete all registration steps. If not completed, your information will be deleted." │  
 │ │  
 │ --- │  
 │ Files to Modify │  
 │ ┌──────────────────────────────────────┬────────────────────────────────┐ │  
 │ │ File │ Change │ │  
 │ ├──────────────────────────────────────┼────────────────────────────────┤ │  
 │ │ package.json │ Add sonner dependency │ │  
 │ ├──────────────────────────────────────┼────────────────────────────────┤ │  
 │ │ app/(auth)/layout.tsx │ Add Toaster provider │ │  
 │ ├──────────────────────────────────────┼────────────────────────────────┤ │  
 │ │ app/(auth)/signup/page.tsx │ Add toast imports + warnings │ │  
 │ ├──────────────────────────────────────┼────────────────────────────────┤ │  
 │ │ app/(auth)/signup/verify/page.tsx │ Add toast for incomplete state │ │  
 │ ├──────────────────────────────────────┼────────────────────────────────┤ │  
 │ │ app/(auth)/signup/agreement/page.tsx │ Add toast for incomplete state │ │  
 │ └──────────────────────────────────────┴────────────────────────────────┘ │  
 │ --- │  
 │ Verification Steps │  
 │ │  
 │ 1. Start signup, abandon at Step 1 → No immediate toast (data not saved yet) │  
 │ 2. Complete Step 1, abandon at Step 2 → Return to Step 2, see warning toast │  
 │ 3. Try to access Step 3 without OTP verification → Redirect + toast warning │  
 │ 4. Complete all steps → PendingRegistration deleted, no warning needed
