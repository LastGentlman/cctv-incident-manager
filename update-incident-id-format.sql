-- Update incident ID format to V-000
-- Run this in your Supabase SQL Editor

-- Update the function to generate V-000 format
CREATE OR REPLACE FUNCTION generate_incident_id()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
BEGIN
    -- Get the next number in sequence
    SELECT COALESCE(MAX(CAST(SUBSTRING(incident_id FROM 3) AS INTEGER)), 0) + 1
    INTO next_number
    FROM incidents
    WHERE incident_id LIKE 'V-%';
    
    -- Set the incident_id
    NEW.incident_id := 'V-' || LPAD(next_number::TEXT, 3, '0');
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Update the trigger to always generate incident_id
DROP TRIGGER IF EXISTS generate_incident_id_trigger ON incidents;
CREATE TRIGGER generate_incident_id_trigger
    BEFORE INSERT ON incidents
    FOR EACH ROW
    EXECUTE FUNCTION generate_incident_id();

-- Update existing incidents to use V- format (optional)
-- Uncomment the following lines if you want to update existing incidents
/*
UPDATE incidents 
SET incident_id = 'V-' || LPAD(ROW_NUMBER() OVER (ORDER BY created_at)::TEXT, 3, '0')
WHERE incident_id NOT LIKE 'V-%';
*/
