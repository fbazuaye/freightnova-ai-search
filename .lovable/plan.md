

## Plan: Add Login/Signup with Authentication and Premium Gating

### Overview
Add a complete authentication system using Lovable Cloud (Supabase) with email/password and Google sign-in, user profiles, and route protection so premium features can be gated behind authentication.

### Step 1: Enable Lovable Cloud Backend
- Connect the project to Lovable Cloud to get Supabase authentication and database capabilities

### Step 2: Design Security Architecture
- Use the security architecture tool to design proper RLS policies for the profiles table
- Create a `profiles` table linked to `auth.users` with fields: `id`, `full_name`, `company_name`, `avatar_url`, `subscription_tier` (free/pro/enterprise), `created_at`, `updated_at`
- Set up a database trigger to auto-create a profile row when a user signs up
- Enable RLS so users can only read/update their own profile

### Step 3: Create Authentication Pages
- **`/auth` page** -- Login/Signup form with:
  - Email and password fields with validation (using zod)
  - Toggle between "Sign In" and "Sign Up" modes
  - "Sign in with Google" button
  - "Forgot Password" link
  - FreightNova branding consistent with the existing design system (Google Blue primary, clean card layout)
- **`/reset-password` page** -- Password reset form that handles the recovery token from email link

### Step 4: Create Auth Context and Hooks
- **`src/contexts/AuthContext.tsx`** -- React context providing:
  - Current user session state
  - `signIn`, `signUp`, `signOut`, `signInWithGoogle` functions
  - `onAuthStateChange` listener (set up before `getSession`)
  - Loading state for initial session check
- **`src/hooks/useAuth.ts`** -- Convenience hook to access auth context

### Step 5: Create Route Protection
- **`src/components/ProtectedRoute.tsx`** -- Wrapper component that:
  - Redirects unauthenticated users to `/auth`
  - Shows a loading spinner while checking session
  - Renders children if authenticated

### Step 6: Update App Routing
- Wrap Dashboard route with `ProtectedRoute`
- Add `/auth` and `/reset-password` as public routes
- Add a user avatar/menu in the Dashboard header showing logged-in user info and a "Sign Out" button

### Step 7: Add Premium Feature Gating (Foundation)
- Add a helper function `isPremiumUser(profile)` that checks the `subscription_tier` field
- The Excel export buttons and preview panel can later be gated behind this check
- For now, all authenticated users get full access (premium gating logic is ready to activate when payment is added)

### File Changes Summary
1. **New**: `src/pages/Auth.tsx` -- Login/signup page
2. **New**: `src/pages/ResetPassword.tsx` -- Password reset page
3. **New**: `src/contexts/AuthContext.tsx` -- Auth state management
4. **New**: `src/hooks/useAuth.ts` -- Auth convenience hook
5. **New**: `src/components/ProtectedRoute.tsx` -- Route guard
6. **Modified**: `src/App.tsx` -- Add auth provider, new routes, protect dashboard
7. **Modified**: `src/pages/Dashboard.tsx` -- Add user menu in header with sign-out
8. **Database migration**: Create `profiles` table with RLS policies and auto-creation trigger

