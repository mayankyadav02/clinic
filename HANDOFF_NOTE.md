# Handoff Note: Shri Krishna Physiotherapy Clinic Website

**To**: Antigravity Design Team
**From**: Devin (Technical Foundation)
**Date**: October 21, 2026
**Project**: Shri Krishna Physiotherapy Clinic Website

---

## Overview

The technical foundation for the Shri Krishna Physiotherapy Clinic website is complete. This document provides the information you need to take over and implement the UI/UX design phase.

## Architecture

### Framework & Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (already configured)
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Icons**: Lucide React (already installed)
- **Validation**: Zod (already installed)

### Key Architectural Decisions

1. **Server Components by Default**: All pages use Server Components except where interactivity is required (admin login, footer).

2. **Centralized Configuration**: Clinic information is centralized in `src/lib/config/clinic.ts`. This ensures consistency and makes updates easier.

3. **Row Level Security (RLS)**: All database tables have RLS policies. Public users can only access published content. Admin operations require authentication.

4. **Timezone Handling**: All schedule logic uses Asia/Kolkata timezone. The schedule functions in `src/lib/schedule.ts` handle complex scheduling requirements.

5. **Demo Content Marking**: All placeholder data is marked with `is_demo = true` in the database. This makes it easy to identify and replace before production.

## Routes

### Public Routes

| Route | Page | Status | Notes |
|-------|------|--------|-------|
| `/` | Home | ✅ Complete | Hero, quick info, services preview |
| `/about` | About | ✅ Complete | Clinic and doctor information |
| `/services` | Services | ✅ Complete | Service listing |
| `/services/[slug]` | Service Detail | 🟡 Placeholder | Needs dynamic content loading |
| `/equipment` | Equipment | ✅ Complete | Equipment listing |
| `/contact` | Contact | ✅ Complete | Phone, WhatsApp, maps |
| `/privacy-policy` | Privacy Policy | ✅ Complete | Demo content, needs approval |
| `/disclaimer` | Disclaimer | ✅ Complete | Demo content, needs approval |

### Admin Routes

| Route | Page | Status | Notes |
|-------|------|--------|-------|
| `/admin/login` | Admin Login | ✅ Complete | Authentication implemented |
| `/admin` | Admin Dashboard | 🟡 Foundation | Auth complete, forms pending |
| `/auth/signout` | Sign Out | ✅ Complete | POST route for logout |

## Design Integration Points

### 1. Header Component
**Location**: `src/components/layout/Header.tsx`

Current state: Functional but basic. Needs visual design improvements.

Design considerations:
- Responsive navigation (mobile menu needed)
- Logo placement
- Contact info display
- Navigation styling

### 2. Footer Component
**Location**: `src/components/layout/Footer.tsx`

Current state: Functional with client-side year rendering.

Design considerations:
- Multi-column layout
- Social media links (when available)
- Newsletter signup (optional)
- Copyright notice styling

### 3. Home Page
**Location**: `src/app/page.tsx`

Current state: Clean sections with placeholder content.

Design considerations:
- Hero section with call-to-action
- Services preview cards
- About section preview
- Testimonials section (can be added)
- Trust indicators

### 4. Services Pages
**Location**: `src/app/services/page.tsx` and `src/app/services/[slug]/page.tsx`

Current state: Listing is complete, detail page is placeholder.

Design considerations:
- Service cards with icons
- Service detail page layout
- Pricing display
- Duration information
- Related services

### 5. Contact Page
**Location**: `src/app/contact/page.tsx`

Current state: Functional contact information display.

Design considerations:
- Contact information cards
- Map integration
- WhatsApp button styling
- Operating hours display
- Form for inquiries (optional)

### 6. Admin Dashboard
**Location**: `src/app/admin/page.tsx`

Current state: Foundation with placeholder cards.

Design considerations:
- Dashboard navigation/sidebar
- Management forms for each content type
- Image upload interface
- Table views for listings
- Edit/create modals or pages
- Save/cancel actions

## Database Schema

The database schema is in `supabase/migrations/001_initial_schema.sql`. Key tables:

- **clinic_settings**: Single row with clinic information
- **doctor_profiles**: Doctor information and credentials
- **services**: Physiotherapy services with publication status
- **equipment**: Equipment with publication status
- **weekly_schedule**: Operating hours by day
- **holiday_overrides**: Temporary closures
- **faqs**: Frequently asked questions
- **testimonials**: Patient reviews
- **admin_users**: Authorized administrators

All tables have:
- `created_at` and `updated_at` timestamps
- `is_demo` flag (where applicable)
- `is_published` flag (for public content)
- `order_index` for sorting

## Supabase Setup

**Required**: Before you can test or deploy, Supabase must be set up.

Follow the detailed guide in `SUPABASE_SETUP.md`:

1. Create a Supabase project
2. Get credentials (URL and anon key)
3. Run migrations (001_initial_schema.sql, 002_demo_data.sql)
4. Create `.env.local` with credentials
5. Create initial admin user

**Do not skip this step** - the site will not function without Supabase.

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Reference: `.env.example` (contains only variable names, never real values)

## Development Commands

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

**Important**: Always run `npm run build` before committing to ensure the build passes.

## Content That Needs Verification

The following is demo content and must be replaced with verified information:

### High Priority
- Doctor qualifications and registration number
- Operating hours (currently showing demo schedule)
- Complete address (street, city, state, PIN code)
- WhatsApp number (international format)
- Email address
- Service descriptions and pricing
- Equipment details and photos

### Medium Priority
- Privacy policy wording (needs legal review)
- Disclaimer wording (needs legal review)
- Testimonials (need real patient reviews)
- FAQ content

### Low Priority
- Social media links (when available)
- Additional photos of clinic and doctor

## Admin Dashboard Implementation

The admin dashboard foundation is complete with authentication. You need to implement:

### Required Forms
1. **Clinic Settings Form**
   - Edit clinic name, doctor name
   - Update contact information
   - Update location details
   - SEO metadata

2. **Doctor Profile Form**
   - Edit qualifications array
   - Update registration number
   - Manage specializations
   - Upload photo
   - Edit biography

3. **Services Management**
   - List all services (with publish/unpublish toggle)
   - Create/edit service
   - Upload icon/image
   - Set price range and duration
   - Reorder services

4. **Equipment Management**
   - List all equipment (with publish/unpublish toggle)
   - Create/edit equipment
   - Upload photos
   - Reorder equipment

5. **Schedule Management**
   - Weekly schedule editor (7 days)
   - Morning/evening session times
   - Break periods
   - Holiday overrides

6. **FAQ Management**
   - List all FAQs (with publish/unpublish toggle)
   - Create/edit FAQ
   - Reorder FAQs

7. **Testimonials Management**
   - List all testimonials (with publish/unpublish toggle)
   - Create/edit testimonial
   - Rating selector

### Form Requirements
- Validation (use Zod schemas where appropriate)
- Error handling with user-friendly messages
- Loading states during save operations
- Success/error notifications
- Confirmation dialogs for destructive actions

### Data Fetching Patterns

Use the Supabase clients in `src/lib/supabase/`:

```typescript
// Server-side (in Server Components or Route Handlers)
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();

// Client-side (in Client Components)
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
```

## Testing

Before marking any work complete:

1. **Development Testing**
   - Run `npm run dev`
   - Test all public routes
   - Test admin login flow
   - Verify database operations

2. **Build Testing**
   - Run `npm run build`
   - Fix any build errors
   - Test production build locally with `npm start`

3. **Linting**
   - Run `npm run lint`
   - Fix all linting errors

## Security Notes

1. **Never expose service role key** in client-side code
2. **All admin operations** must check the admin_users table
3. **RLS policies** are already configured - don't disable them
4. **Image uploads** should validate file types and sizes
5. **Form inputs** should be sanitized and validated

## Known Issues

1. **Middleware Deprecation Warning**: Next.js 16 shows a deprecation warning for middleware. This is a known issue and doesn't affect functionality. Can be migrated to the new proxy convention later.

2. **Build Without Env Vars**: The build succeeds without environment variables (using placeholders). This is intentional for CI/CD. The site will not function correctly without real credentials in `.env.local`.

## Files You Should Review

1. `README.md` - Project overview and setup
2. `SUPABASE_SETUP.md` - Database setup guide
3. `PROJECT_STATUS.md` - Detailed project status
4. `src/lib/config/clinic.ts` - Centralized configuration
5. `src/lib/schedule.ts` - Schedule logic
6. `supabase/migrations/001_initial_schema.sql` - Database schema
7. `supabase/migrations/002_demo_data.sql` - Demo data

## Support

If you encounter technical issues:

1. Check the README.md and SUPABASE_SETUP.md
2. Review the Supabase documentation: https://supabase.com/docs
3. Review Next.js documentation: https://nextjs.org/docs

## Next Steps

1. **Immediate**: Set up Supabase following SUPABASE_SETUP.md
2. **Then**: Begin UI/UX design implementation
3. **Parallel**: Start building admin management forms
4. **Before Production**: Replace all demo content with verified information

---

Good luck with the design phase! The foundation is solid and ready for your expertise.
