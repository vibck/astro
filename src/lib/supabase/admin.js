import { createClient } from "@supabase/supabase-js";

// Zentraler Supabase Admin Client für API-Routen (Service Role Key)
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
