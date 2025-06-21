import { createClient } from '@supabase/supabase-js'

const  supabaseUrl= 'https://vbmjpzvzmlbnhkeldkhr.supabase.co'
const  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibWpwenZ6bWxibmhrZWxka2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzY5NjksImV4cCI6MjA2NTkxMjk2OX0.txoU810MjltRiHeAH_uSlOzd-sGk6sZpx4RBZLqRXUw'

export const supabase = createClient(supabaseUrl, supabaseKey)