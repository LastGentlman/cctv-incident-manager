-- Fix RLS policy to allow anonymous users
-- Run this in your Supabase SQL Editor

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON incidents;

-- Create a new policy that allows all operations for anonymous users
-- WARNING: This allows anyone to access your data. Use only for development!
CREATE POLICY "Allow all operations for anonymous users" ON incidents
    FOR ALL USING (true);

-- Alternative: If you want to keep RLS but allow anonymous access, you can also:
-- CREATE POLICY "Allow all operations for anonymous users" ON incidents
--     FOR ALL USING (auth.role() = 'anon' OR auth.role() = 'authenticated');

-- If you want to disable RLS completely (not recommended for production):
-- ALTER TABLE incidents DISABLE ROW LEVEL SECURITY;
