-- Agregar restricción única para el campo video_file en la tabla incidents
-- Esto previene duplicados a nivel de base de datos

-- Primero, eliminar cualquier valor duplicado existente (mantener solo el más reciente)
WITH duplicates AS (
  SELECT id, video_file, created_at,
         ROW_NUMBER() OVER (PARTITION BY video_file ORDER BY created_at DESC) as rn
  FROM incidents 
  WHERE video_file IS NOT NULL AND video_file != ''
)
DELETE FROM incidents 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Agregar la restricción única
ALTER TABLE incidents 
ADD CONSTRAINT unique_video_file 
UNIQUE (video_file);

-- Crear un índice para mejorar el rendimiento de las consultas
CREATE INDEX IF NOT EXISTS idx_incidents_video_file ON incidents(video_file) 
WHERE video_file IS NOT NULL AND video_file != '';

-- Comentario sobre la restricción
COMMENT ON CONSTRAINT unique_video_file ON incidents IS 
'Garantiza que cada link de video sea único en el sistema';
