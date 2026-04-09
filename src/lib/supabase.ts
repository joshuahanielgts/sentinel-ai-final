import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isMissing = !supabaseUrl || !supabaseAnonKey;

if (isMissing) {
  console.warn(
    'Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local. Auth features will not work.'
  );
}

export const supabase: SupabaseClient = isMissing
  ? (new Proxy({} as SupabaseClient, {
      get(_target, prop) {
        if (prop === 'auth') {
          return {
            onAuthStateChange: (_cb: unknown) => ({ data: { subscription: { unsubscribe: () => {} } } }),
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            signInWithPassword: () => Promise.resolve({ data: {}, error: new Error('Supabase not configured') }),
            signUp: () => Promise.resolve({ data: {}, error: new Error('Supabase not configured') }),
            signInWithOAuth: () => Promise.resolve({ data: {}, error: new Error('Supabase not configured') }),
            signOut: () => Promise.resolve({ error: null }),
          };
        }
        return undefined;
      },
    }))
  : createClient(supabaseUrl, supabaseAnonKey);
