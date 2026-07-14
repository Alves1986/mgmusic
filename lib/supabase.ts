import { createClient } from '@supabase/supabase-js'

// Server-side admin client — uses service role key, never exposed to browser
export function createAdminClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}

// Public anon client — safe for public reads in Server Components
export function createPublicClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  )
}
