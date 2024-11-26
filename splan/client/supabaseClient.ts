// Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lgxpumurghtoclmioznf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxneHB1bXVyZ2h0b2NsbWlvem5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1ODYzNDQsImV4cCI6MjAzMDE2MjM0NH0.h0sb8bk68uvO3EA36DVNMSYAVPuwo9ccUnTu9MweJiw'

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
