// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eltxzbtatpwxmpjcqyue.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsdHh6YnRhdHB3eG1wamNxeXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTY4ODgsImV4cCI6MjA2NzAzMjg4OH0.xcQEmGVyG3osjpDYCbC7yJTHTA7gsXab3cyud5_01DY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});