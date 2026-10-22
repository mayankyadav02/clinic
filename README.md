# Shri Krishna Physiotherapy Clinic Website

A production-oriented website foundation for Shri Krishna Physiotherapy Clinic, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Icons**: Lucide React
- **Validation**: Zod

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is sufficient)
- Git (optional, for version control)

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

Follow the detailed setup guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md):

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Get your Project URL and anon key from Project Settings → API
3. Run the database migrations from `supabase/migrations/`
4. Create the initial admin user

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ **Important**: Never commit `.env.local` or any real credentials to version control. Use `.env.example` as a reference for required variable names.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard (protected)
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── disclaimer/        # Disclaimer page
│   ├── equipment/         # Equipment page
│   ├── privacy-policy/    # Privacy policy page
│   ├── services/          # Services pages
│   └── layout.tsx         # Root layout with Header/Footer
├── components/
│   └── layout/            # Reusable layout components
├── lib/
│   ├── config/            # Centralized configuration
│   ├── schedule.ts        # Schedule logic (Asia/Kolkata)
│   └── supabase/          # Supabase client and types
└── middleware.ts          # Auth middleware

supabase/
└── migrations/            # Database schema and demo data
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Schema

The database includes the following tables:

- `clinic_settings` - Clinic information and contact details
- `doctor_profiles` - Doctor information and credentials
- `services` - Physiotherapy services
- `equipment` - Clinic equipment
- `weekly_schedule` - Operating hours by day
- `holiday_overrides` - Temporary closures and special hours
- `faqs` - Frequently asked questions
- `testimonials` - Patient testimonials
- `admin_users` - Authorized administrators

All tables have Row Level Security (RLS) policies to ensure:
- Public users can only access published content
- Admin operations require authentication and authorization
- Sensitive data is never exposed to unauthorized users

## Demo Content

The project includes demo data marked with `is_demo = true` in the database. This is for development and testing only. Before going to production:

1. Review all demo data in `supabase/migrations/002_demo_data.sql`
2. Replace with actual clinic information
3. Update or remove demo records
4. Ensure `is_demo` is set to `false` for production content

## Admin Dashboard

The admin dashboard at `/admin` allows authorized users to:
- Edit clinic details and contact information
- Update doctor information and credentials
- Manage services, equipment, and FAQs
- Set operating hours and holiday overrides
- Manage testimonials

**Note**: The admin dashboard foundation is complete. The actual management interfaces will be implemented by Antigravity as part of the UI/UX design phase.

## Security Notes

- The service role key is never exposed to client-side code
- All admin routes require server-side authentication
- Database access follows RLS policies
- Public queries exclude unpublished content
- Secrets are not committed to source control

## Public Routes

- `/` - Home page
- `/about` - About the clinic and doctor
- `/services` - Services listing
- `/services/[slug]` - Individual service details
- `/equipment` - Equipment and facilities
- `/contact` - Contact and directions
- `/privacy-policy` - Privacy policy
- `/disclaimer` - Medical disclaimer
- `/admin/login` - Admin login (protected)
- `/admin` - Admin dashboard (protected)

## Timezone

All schedule logic uses `Asia/Kolkata` timezone. The schedule functions in `src/lib/schedule.ts` handle:
- Different hours on different weekdays
- Morning and evening sessions
- Break periods
- Weekly closed days
- Date-specific holiday overrides

## Verification Status

The following information is confirmed:
- Clinic name: Shri Krishna Physiotherapy Clinic
- Doctor name: Dr. Suresh Yadav
- Phone: 7891426494 (pending WhatsApp format verification)
- Map coordinates: 27.2924909, 75.1829705
- Google Maps URL: https://www.google.com/maps?q=27.2924909,75.1829705

The following information is NOT confirmed and should be sourced from the database:
- WhatsApp number (pending production verification)
- Email address
- Street address
- City, state, PIN code
- Operating hours
- Doctor qualifications and registration number
- Service details and pricing

## Next Steps for Antigravity

1. **UI/UX Design**: Implement detailed visual design across all pages
2. **Admin Forms**: Build management interfaces for all content types
3. **Image Upload**: Implement image upload functionality with Supabase Storage
4. **Real-time Updates**: Connect admin forms to database operations
5. **WhatsApp Integration**: Implement WhatsApp click-to-chat with verified number
6. **SEO Optimization**: Implement meta tags and structured data
7. **Performance**: Optimize images, implement caching strategies

## Support

For Supabase-specific issues, refer to [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

For Next.js documentation, visit [https://nextjs.org/docs](https://nextjs.org/docs).

## License

This project is proprietary to Shri Krishna Physiotherapy Clinic.
