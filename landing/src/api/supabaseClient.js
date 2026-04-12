import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Tracks a new artist onboarding
 */
export const registerArtist = async (artistData) => {
  const { data, error } = await supabase
    .from('artists')
    .insert([
      { 
        name: artistData.name, 
        email: artistData.email, 
        art_type: artistData.artType,
        signature_url: artistData.signature // Base64 in MVP, URL in future
      }
    ])
    .select();

  return { data, error };
};
