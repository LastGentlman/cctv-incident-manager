-- Supabase Database Schema for CCTV Incident Manager
-- This schema creates the necessary tables and configurations for the CCTV incident management system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for better data integrity
CREATE TYPE incident_type AS ENUM ('empleado', 'otro');
CREATE TYPE severity_level AS ENUM ('baja', 'media', 'alta');
CREATE TYPE incident_status AS ENUM ('pendiente', 'investigando', 'resuelto');

-- Create the main incidents table
CREATE TABLE incidents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    incident_id VARCHAR(20) UNIQUE NOT NULL, -- e.g., INC-001
    date DATE NOT NULL,
    time TIME NOT NULL,
    type incident_type NOT NULL,
    severity severity_level NOT NULL,
    status incident_status NOT NULL DEFAULT 'pendiente',
    employee VARCHAR(255), -- NULL for non-employee incidents
    location VARCHAR(255) NOT NULL,
    camera VARCHAR(100) NOT NULL,
    video_file VARCHAR(255),
    description TEXT NOT NULL,
    actions TEXT,
    reported_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX idx_incidents_date ON incidents(date);
CREATE INDEX idx_incidents_type ON incidents(type);
CREATE INDEX idx_incidents_severity ON incidents(severity);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_employee ON incidents(employee);
CREATE INDEX idx_incidents_incident_id ON incidents(incident_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_incidents_updated_at 
    BEFORE UPDATE ON incidents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create a function to generate incident IDs
CREATE OR REPLACE FUNCTION generate_incident_id()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
BEGIN
    -- Get the next number in sequence
    SELECT COALESCE(MAX(CAST(SUBSTRING(incident_id FROM 5) AS INTEGER)), 0) + 1
    INTO next_number
    FROM incidents
    WHERE incident_id LIKE 'INC-%';
    
    -- Set the incident_id
    NEW.incident_id := 'INC-' || LPAD(next_number::TEXT, 3, '0');
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically generate incident IDs
CREATE TRIGGER generate_incident_id_trigger
    BEFORE INSERT ON incidents
    FOR EACH ROW
    WHEN (NEW.incident_id IS NULL OR NEW.incident_id = '')
    EXECUTE FUNCTION generate_incident_id();

-- Create a view for easier querying with formatted data
CREATE VIEW incidents_view AS
SELECT 
    id,
    incident_id,
    date,
    time,
    type,
    severity,
    status,
    employee,
    location,
    camera,
    video_file,
    description,
    actions,
    reported_by,
    created_at,
    updated_at,
    -- Add computed fields
    CONCAT(date, ' ', time) AS datetime,
    CASE 
        WHEN type = 'empleado' THEN 'Empleado'
        ELSE 'Otro'
    END AS type_display,
    CASE 
        WHEN severity = 'alta' THEN 'Alta'
        WHEN severity = 'media' THEN 'Media'
        ELSE 'Baja'
    END AS severity_display,
    CASE 
        WHEN status = 'pendiente' THEN 'Pendiente'
        WHEN status = 'investigando' THEN 'Investigando'
        ELSE 'Resuelto'
    END AS status_display
FROM incidents;

-- Create RLS (Row Level Security) policies
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations for authenticated users
-- Note: In production, you should create more restrictive policies based on user roles
CREATE POLICY "Allow all operations for authenticated users" ON incidents
    FOR ALL USING (auth.role() = 'authenticated');

-- Create a function to get incident statistics
CREATE OR REPLACE FUNCTION get_incident_stats()
RETURNS TABLE (
    total_incidents BIGINT,
    pending_incidents BIGINT,
    investigating_incidents BIGINT,
    resolved_incidents BIGINT,
    high_severity_incidents BIGINT,
    employee_incidents BIGINT,
    other_incidents BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_incidents,
        COUNT(*) FILTER (WHERE status = 'pendiente') as pending_incidents,
        COUNT(*) FILTER (WHERE status = 'investigando') as investigating_incidents,
        COUNT(*) FILTER (WHERE status = 'resuelto') as resolved_incidents,
        COUNT(*) FILTER (WHERE severity = 'alta') as high_severity_incidents,
        COUNT(*) FILTER (WHERE type = 'empleado') as employee_incidents,
        COUNT(*) FILTER (WHERE type = 'otro') as other_incidents
    FROM incidents;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert some sample data
INSERT INTO incidents (
    date, time, type, severity, status, employee, location, camera, 
    video_file, description, actions, reported_by
) VALUES 
(
    '2024-09-15', '14:30:00', 'empleado', 'media', 'resuelto', 
    'Juan Pérez', 'Almacén Principal', 'CAM-004', 
    'video_001_20240915_1430.mp4', 
    'Empleado accediendo a área restringida sin autorización',
    'Conversación con supervisor. Capacitación adicional programada.',
    'María González'
),
(
    '2024-09-16', '22:15:00', 'otro', 'alta', 'investigando', 
    NULL, 'Perímetro Norte', 'CAM-012', 
    'video_002_20240916_2215.mp4', 
    'Intento de intrusión en horario nocturno',
    'Reporte enviado a seguridad. Revisión de protocolos.',
    'Carlos Ruiz'
);

-- Create a function for full-text search
CREATE OR REPLACE FUNCTION search_incidents(search_term TEXT)
RETURNS TABLE (
    id UUID,
    incident_id VARCHAR(20),
    date DATE,
    incident_time TIME,
    type incident_type,
    severity severity_level,
    status incident_status,
    employee VARCHAR(255),
    location VARCHAR(255),
    camera VARCHAR(100),
    video_file VARCHAR(255),
    description TEXT,
    actions TEXT,
    reported_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.incident_id,
        i.date,
        i.time as incident_time,
        i.type,
        i.severity,
        i.status,
        i.employee,
        i.location,
        i.camera,
        i.video_file,
        i.description,
        i.actions,
        i.reported_by,
        i.created_at,
        i.updated_at,
        ts_rank(
            to_tsvector('spanish', 
                COALESCE(i.description, '') || ' ' || 
                COALESCE(i.actions, '') || ' ' || 
                COALESCE(i.location, '') || ' ' || 
                COALESCE(i.employee, '') || ' ' || 
                COALESCE(i.reported_by, '')
            ),
            plainto_tsquery('spanish', search_term)
        ) as rank
    FROM incidents i
    WHERE to_tsvector('spanish', 
        COALESCE(i.description, '') || ' ' || 
        COALESCE(i.actions, '') || ' ' || 
        COALESCE(i.location, '') || ' ' || 
        COALESCE(i.employee, '') || ' ' || 
        COALESCE(i.reported_by, '')
    ) @@ plainto_tsquery('spanish', search_term)
    ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for full-text search
CREATE INDEX idx_incidents_search ON incidents 
USING gin(to_tsvector('spanish', 
    COALESCE(description, '') || ' ' || 
    COALESCE(actions, '') || ' ' || 
    COALESCE(location, '') || ' ' || 
    COALESCE(employee, '') || ' ' || 
    COALESCE(reported_by, '')
));

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON incidents TO authenticated;
GRANT ALL ON incidents_view TO authenticated;
GRANT EXECUTE ON FUNCTION get_incident_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION search_incidents(TEXT) TO authenticated;
