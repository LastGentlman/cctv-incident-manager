-- Datos Dummy para el Sistema de Registro CCTV
-- Este archivo contiene datos de prueba para todas las funcionalidades del sistema

-- Limpiar datos existentes (opcional - comentar si quieres mantener datos existentes)
-- DELETE FROM incidents;

-- Insertar datos dummy extensos
INSERT INTO incidents (
    date, time, type, severity, status, employee, location, camera, 
    video_file, description, actions, reported_by
) VALUES 
-- Incidentes de Empleados
(
    '2024-01-15', '08:30:00', 'empleado', 'baja', 'resuelto', 
    'María González', '001', 'CAM-001', 
    'https://drive.google.com/file/d/1abc123/view', 
    'Empleada accediendo a oficina fuera del horario laboral para recoger documentos personales',
    'Verificación con supervisor. Acceso autorizado para recoger documentos.',
    'Surveillance'
),
(
    '2024-01-16', '12:15:00', 'empleado', 'media', 'investigando', 
    'Carlos Ruiz', '002', 'CAM-003', 
    'https://drive.google.com/file/d/1def456/view', 
    'Empleado en área de almacén sin chaleco de seguridad requerido',
    'Capacitación de seguridad programada. Revisión de protocolos.',
    'Surveillance'
),
(
    '2024-01-17', '16:45:00', 'empleado', 'alta', 'pendiente', 
    'Ana Martínez', '003', 'CAM-005', 
    'https://drive.google.com/file/d/1ghi789/view', 
    'Empleada accediendo a sistema informático sin autorización en horario no laboral',
    'Reporte enviado a IT. Revisión de accesos pendiente.',
    'Surveillance'
),
(
    '2024-01-18', '09:20:00', 'empleado', 'baja', 'resuelto', 
    'Luis Fernández', '001', 'CAM-002', 
    'https://drive.google.com/file/d/1jkl012/view', 
    'Empleado comiendo en área de trabajo no autorizada',
    'Conversación educativa. Área designada para descanso identificada.',
    'Surveillance'
),
(
    '2024-01-19', '14:30:00', 'empleado', 'media', 'investigando', 
    'Elena Vargas', '002', 'CAM-004', 
    'https://drive.google.com/file/d/1mno345/view', 
    'Empleada usando teléfono personal durante horas de trabajo',
    'Revisión de políticas de uso de dispositivos móviles.',
    'Surveillance'
),

-- Incidentes de Otros (No empleados)
(
    '2024-01-20', '22:15:00', 'otro', 'alta', 'investigando', 
    NULL, '001', 'CAM-006', 
    'https://drive.google.com/file/d/1pqr678/view', 
    'Persona no identificada intentando acceder al edificio principal',
    'Reporte a seguridad. Revisión de cámaras perimetrales.',
    'Surveillance'
),
(
    '2024-01-21', '03:45:00', 'otro', 'alta', 'pendiente', 
    NULL, '002', 'CAM-008', 
    'https://drive.google.com/file/d/1stu901/view', 
    'Vehículo sospechoso estacionado en zona restringida',
    'Reporte a autoridades. Patrullaje adicional programado.',
    'Surveillance'
),
(
    '2024-01-22', '11:30:00', 'otro', 'media', 'resuelto', 
    NULL, '003', 'CAM-010', 
    'https://drive.google.com/file/d/1vwx234/view', 
    'Visitante sin identificación en área de recepción',
    'Verificación con recepción. Visitante autorizado identificado.',
    'Surveillance'
),
(
    '2024-01-23', '19:20:00', 'otro', 'baja', 'resuelto', 
    NULL, '001', 'CAM-007', 
    'https://drive.google.com/file/d/1yza567/view', 
    'Animal doméstico en área de estacionamiento',
    'Animal removido del área. Señalización mejorada.',
    'Surveillance'
),
(
    '2024-01-24', '06:30:00', 'otro', 'media', 'investigando', 
    NULL, '002', 'CAM-009', 
    'https://drive.google.com/file/d/1bcd890/view', 
    'Actividad inusual en perímetro durante madrugada',
    'Revisión de sensores. Patrullaje nocturno intensificado.',
    'Surveillance'
),

-- Más incidentes para probar filtros y paginación
(
    '2024-01-25', '13:45:00', 'empleado', 'baja', 'resuelto', 
    'Roberto Silva', '003', 'CAM-011', 
    'https://drive.google.com/file/d/1efg123/view', 
    'Empleado usando uniforme inadecuado en área de producción',
    'Conversación con supervisor. Uniformes correctos proporcionados.',
    'Surveillance'
),
(
    '2024-01-26', '17:10:00', 'empleado', 'alta', 'pendiente', 
    'Carmen López', '001', 'CAM-012', 
    'https://drive.google.com/file/d/1hij456/view', 
    'Empleada accediendo a archivos confidenciales sin autorización',
    'Reporte a recursos humanos. Investigación en curso.',
    'Surveillance'
),
(
    '2024-01-27', '10:25:00', 'otro', 'baja', 'resuelto', 
    NULL, '002', 'CAM-013', 
    'https://drive.google.com/file/d/1klm789/view', 
    'Repartidor entregando paquete en área incorrecta',
    'Reubicación a área correcta. Instrucciones actualizadas.',
    'Surveillance'
),
(
    '2024-01-28', '15:50:00', 'empleado', 'media', 'investigando', 
    'Diego Morales', '003', 'CAM-014', 
    'https://drive.google.com/file/d/1nop012/view', 
    'Empleado no siguiendo protocolo de seguridad en laboratorio',
    'Capacitación adicional programada. Supervisión reforzada.',
    'Surveillance'
),
(
    '2024-01-29', '21:35:00', 'otro', 'alta', 'pendiente', 
    NULL, '001', 'CAM-015', 
    'https://drive.google.com/file/d/1qrs345/view', 
    'Intento de sabotaje en sistema de seguridad',
    'Reporte a autoridades. Sistema de respaldo activado.',
    'Surveillance'
),

-- Incidentes con diferentes estados y severidades
(
    '2024-01-30', '07:15:00', 'empleado', 'baja', 'resuelto', 
    'Patricia Herrera', '002', 'CAM-016', 
    'https://drive.google.com/file/d/1tuv678/view', 
    'Empleada llegando tarde y accediendo por entrada no autorizada',
    'Conversación sobre puntualidad. Uso de entradas correctas.',
    'Surveillance'
),
(
    '2024-01-31', '12:40:00', 'empleado', 'media', 'resuelto', 
    'Fernando Castro', '003', 'CAM-017', 
    'https://drive.google.com/file/d/1wxy901/view', 
    'Empleado no reportando incidente menor de seguridad',
    'Capacitación sobre reportes obligatorios completada.',
    'Surveillance'
),
(
    '2024-02-01', '18:20:00', 'otro', 'media', 'investigando', 
    NULL, '001', 'CAM-018', 
    'https://drive.google.com/file/d/1zab234/view', 
    'Vehículo no autorizado en zona de carga',
    'Investigación de permisos. Revisión de accesos.',
    'Surveillance'
),
(
    '2024-02-02', '09:55:00', 'empleado', 'alta', 'investigando', 
    'Isabel Ramírez', '002', 'CAM-019', 
    'https://drive.google.com/file/d/1cde567/view', 
    'Empleada compartiendo información confidencial con persona externa',
    'Reporte a recursos humanos. Investigación disciplinaria iniciada.',
    'Surveillance'
),
(
    '2024-02-03', '14:10:00', 'otro', 'baja', 'resuelto', 
    NULL, '003', 'CAM-020', 
    'https://drive.google.com/file/d/1fgh890/view', 
    'Visitante perdido buscando dirección',
    'Asistencia proporcionada. Señalización mejorada.',
    'Surveillance'
),

-- Incidentes recientes para probar filtros de fecha
(
    '2024-02-04', '11:30:00', 'empleado', 'media', 'pendiente', 
    'Miguel Torres', '001', 'CAM-021', 
    'https://drive.google.com/file/d/1ijk123/view', 
    'Empleado no siguiendo protocolo de limpieza en área de trabajo',
    'Recordatorio de protocolos. Supervisión adicional.',
    'Surveillance'
),
(
    '2024-02-05', '16:45:00', 'otro', 'alta', 'investigando', 
    NULL, '002', 'CAM-022', 
    'https://drive.google.com/file/d/1lmn456/view', 
    'Actividad sospechosa en área de estacionamiento ejecutivo',
    'Reporte a seguridad. Revisión de accesos VIP.',
    'Surveillance'
),
(
    '2024-02-06', '08:20:00', 'empleado', 'baja', 'resuelto', 
    'Sofía Jiménez', '003', 'CAM-023', 
    'https://drive.google.com/file/d/1opq789/view', 
    'Empleada usando equipo de protección personal incorrecto',
    'Capacitación sobre EPP. Equipo correcto proporcionado.',
    'Surveillance'
),
(
    '2024-02-07', '20:15:00', 'otro', 'media', 'pendiente', 
    NULL, '001', 'CAM-024', 
    'https://drive.google.com/file/d/1rst012/view', 
    'Luz de emergencia activada sin causa aparente',
    'Revisión técnica programada. Sistema de alarmas verificado.',
    'Surveillance'
),
(
    '2024-02-08', '13:25:00', 'empleado', 'alta', 'investigando', 
    'Andrés Vega', '002', 'CAM-025', 
    'https://drive.google.com/file/d/1uvw345/view', 
    'Empleado accediendo a sistema de nóminas sin autorización',
    'Reporte a IT y RRHH. Accesos suspendidos temporalmente.',
    'Surveillance'
);

-- Verificar la inserción de datos
SELECT 
    COUNT(*) as total_incidents,
    COUNT(*) FILTER (WHERE type = 'empleado') as employee_incidents,
    COUNT(*) FILTER (WHERE type = 'otro') as other_incidents,
    COUNT(*) FILTER (WHERE severity = 'alta') as high_severity,
    COUNT(*) FILTER (WHERE severity = 'media') as medium_severity,
    COUNT(*) FILTER (WHERE severity = 'baja') as low_severity,
    COUNT(*) FILTER (WHERE status = 'pendiente') as pending,
    COUNT(*) FILTER (WHERE status = 'investigando') as investigating,
    COUNT(*) FILTER (WHERE status = 'resuelto') as resolved
FROM incidents;

-- Mostrar algunos incidentes de ejemplo
SELECT 
    incident_id,
    date,
    time,
    type,
    severity,
    status,
    employee,
    location,
    camera,
    description
FROM incidents 
ORDER BY date DESC, time DESC 
LIMIT 10;
