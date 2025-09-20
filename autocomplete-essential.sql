-- Optimizaciones esenciales para el sistema de autocompletado
-- Solo lo necesario para que funcione correctamente

-- 1. Índices para mejorar el rendimiento de las consultas de autocompletado
-- Estos índices mejoran significativamente las consultas de empleados y cámaras únicas

CREATE INDEX IF NOT EXISTS idx_incidents_employee_autocomplete ON incidents(employee) 
WHERE employee IS NOT NULL AND employee != '';

CREATE INDEX IF NOT EXISTS idx_incidents_camera_autocomplete ON incidents(camera) 
WHERE camera IS NOT NULL AND camera != '';

-- 2. Verificar que los índices se crearon correctamente
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'incidents' 
AND indexname LIKE '%autocomplete%';

-- Nota: Las funciones getUniqueEmployees() y getUniqueCameras() en el código JavaScript
-- funcionarán correctamente con estos índices. No se necesitan funciones adicionales
-- en la base de datos ya que son consultas simples SELECT DISTINCT.
