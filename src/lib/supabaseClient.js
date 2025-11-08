// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'



// console.log('Environment URL:', import.meta.env.VITE_SUPABASE_URL)
// console.log('Environment KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
// Check if environment variables are loaded
if (!import.meta.env.VITE_SUPABASE_URL) {
//   throw new Error('VITE_SUPABASE_URL is not defined in environment variables')
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
//   throw new Error('VITE_SUPABASE_ANON_KEY is not defined in environment variables')
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// console.log('Creating Supabase client with URL:', supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseKey)

// console.log(supabase);


export default supabase