import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aibouuicoypixyvdjear.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYm91dWljb3lwaXh5dmRqZWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTU2MzcsImV4cCI6MjA3MDc3MTYzN30.5FYteovy_VhbYtSQpX_tjU2Hu62TOImX3zlCqai6QFM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);