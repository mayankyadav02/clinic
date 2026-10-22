# Supabase Setup Guide

This guide explains how to set up Supabase for the Shri Krishna Physiotherapy Clinic website.

## Prerequisites

- A Supabase account (free tier is sufficient for development)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose a name (e.g., `shri-krishna-physio-clinic`)
4. Choose a database password (save it securely)
5. Select a region closest to your users (Singapore is good for India)
6. Click "Create new project"
7. Wait for the project to be provisioned (2-3 minutes)

## Step 2: Get Your Credentials

1. Go to Project Settings → API
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public key** (starts with `eyJ...`)
3. Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

⚠️ **IMPORTANT**: Never commit the `.env.local` file or any real credentials to version control. The `.env.example` file contains only placeholder names.

## Step 3: Run Database Migrations

You have two options to set up the database schema:

### Option A: Using Supabase Dashboard (Recommended for initial setup)

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy the contents of `supabase/migrations/001_initial_schema.sql`
5. Paste and run the query
6. Create another new query
7. Copy the contents of `supabase/migrations/002_demo_data.sql`
8. Paste and run the query (optional - for demo data only)

### Option B: Using Supabase CLI (Recommended for ongoing development)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your_project_ref
   ```

4. Run migrations:
   ```bash
   supabase db push
   ```

## Step 4: Create the Initial Admin User

The database schema includes an `admin_users` table. To create the first admin user:

1. Go to Supabase Dashboard → Authentication
2. Enable email authentication (it should be enabled by default)
3. Manually insert the first admin user via SQL Editor:

```sql
-- Replace with the actual email address
INSERT INTO admin_users (id, email)
SELECT auth.uid(), 'admin@clinic.example'
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'admin@clinic.example'
);
```

4. Then, have the admin user sign up through the `/admin/login` page on your website
5. After signup, run the SQL above again to link their auth account to admin_users

**Security Note**: The admin_users table has RLS policies that only allow the service role to modify it. This prevents public registration as admin.

## Step 5: Configure Storage (for images)

1. Go to Storage in Supabase Dashboard
2. Create a new bucket named `clinic-images`
3. Make it public (for publicly accessible images)
4. Configure storage policies if needed (for now, public access is fine)

## Step 6: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the home page to ensure the environment variables are loaded correctly
3. Check the browser console for any Supabase connection errors

## Security Notes

- **Never expose the service_role key** in client-side code
- The anon key is safe for public use as it respects RLS policies
- All admin operations require authentication and authorization checks
- Unpublished content is never accessible to public users via RLS

## Migration Management

When making schema changes:
1. Create a new migration file in `supabase/migrations/` with a numbered prefix (e.g., `003_add_new_table.sql`)
2. Write your SQL changes
3. Run the migration using Supabase CLI or Dashboard

## Demo Data

The `002_demo_data.sql` file contains placeholder data marked with `is_demo = true`. This is for development and testing only. Before going to production:

1. Review all demo data
2. Replace with actual clinic information
3. Update or remove demo records
4. Ensure `is_demo` is set to `false` for production content

## Troubleshooting

### Connection Errors
- Verify your `.env.local` file has the correct values
- Check that your Supabase project is active
- Ensure you're using the anon key, not the service_role key

### RLS Policy Errors
- Check that migrations ran successfully
- Verify the user is authenticated for admin operations
- Review the RLS policies in the SQL Editor

### Data Not Appearing
- Ensure records have `is_published = true` for public content
- Check that the user is authenticated for admin content
- Verify RLS policies are allowing access
