import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kbkzeihbxlpsvkjpczms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtia3plaWhieGxwc3ZranBjem1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExOTk2NzQsImV4cCI6MjAzNjc3NTY3NH0.fRsuMrxSGlAYFNGhysj46ajeecKWf5IGaJtchtMQA2Y';

export const supabase = createClient(supabaseUrl, supabaseKey);
