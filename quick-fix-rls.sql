-- Quick fix for RLS policy issue
-- Run this in your Supabase SQL Editor to fix the incident creation error

-- Drop existing policies
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON incidents;
DROP POLICY IF EXISTS "Allow all operations for all users" ON incidents;

-- Create new policy that allows all operations
CREATE POLICY "Allow all operations for all users" ON incidents
    FOR ALL USING (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'incidents';
