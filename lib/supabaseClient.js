'use client'; // optional, ensures client-side usage if needed
import { createClient } from '@supabase/supabase-js';

// Read environment variables at runtime
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or ANON KEY is missing. Check .env.local');
}

// Export a function to get a Supabase client
export const getSupabaseClient = () => createClient(supabaseUrl, supabaseAnonKey);
