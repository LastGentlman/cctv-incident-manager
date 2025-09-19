// Script para cargar datos dummy en Supabase
// Ejecutar con: node load-dummy-data.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuración de Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.error('❌ Error: Configura las variables de entorno de Supabase');
  console.log('Crea un archivo .env con:');
  console.log('REACT_APP_SUPABASE_URL=tu_url_de_supabase');
  console.log('REACT_APP_SUPABASE_ANON_KEY=tu_clave_anonima');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Datos dummy para insertar
const dummyIncidents = [
  // Incidentes de Empleados
  {
    date: '2024-01-15',
    time: '08:30:00',
    type: 'empleado',
    severity: 'baja',
    status: 'resuelto',
    employee: 'María González',
    location: '001',
    camera: 'CAM-001',
    video_file: 'https://drive.google.com/file/d/1abc123/view',
    description: 'Empleada accediendo a oficina fuera del horario laboral para recoger documentos personales',
    actions: 'Verificación con supervisor. Acceso autorizado para recoger documentos.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-16',
    time: '12:15:00',
    type: 'empleado',
    severity: 'media',
    status: 'investigando',
    employee: 'Carlos Ruiz',
    location: '002',
    camera: 'CAM-003',
    video_file: 'https://drive.google.com/file/d/1def456/view',
    description: 'Empleado en área de almacén sin chaleco de seguridad requerido',
    actions: 'Capacitación de seguridad programada. Revisión de protocolos.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-17',
    time: '16:45:00',
    type: 'empleado',
    severity: 'alta',
    status: 'pendiente',
    employee: 'Ana Martínez',
    location: '003',
    camera: 'CAM-005',
    video_file: 'https://drive.google.com/file/d/1ghi789/view',
    description: 'Empleada accediendo a sistema informático sin autorización en horario no laboral',
    actions: 'Reporte enviado a IT. Revisión de accesos pendiente.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-18',
    time: '09:20:00',
    type: 'empleado',
    severity: 'baja',
    status: 'resuelto',
    employee: 'Luis Fernández',
    location: '001',
    camera: 'CAM-002',
    video_file: 'https://drive.google.com/file/d/1jkl012/view',
    description: 'Empleado comiendo en área de trabajo no autorizada',
    actions: 'Conversación educativa. Área designada para descanso identificada.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-19',
    time: '14:30:00',
    type: 'empleado',
    severity: 'media',
    status: 'investigando',
    employee: 'Elena Vargas',
    location: '002',
    camera: 'CAM-004',
    video_file: 'https://drive.google.com/file/d/1mno345/view',
    description: 'Empleada usando teléfono personal durante horas de trabajo',
    actions: 'Revisión de políticas de uso de dispositivos móviles.',
    reported_by: 'Surveillance'
  },
  // Incidentes de Otros (No empleados)
  {
    date: '2024-01-20',
    time: '22:15:00',
    type: 'otro',
    severity: 'alta',
    status: 'investigando',
    employee: null,
    location: '001',
    camera: 'CAM-006',
    video_file: 'https://drive.google.com/file/d/1pqr678/view',
    description: 'Persona no identificada intentando acceder al edificio principal',
    actions: 'Reporte a seguridad. Revisión de cámaras perimetrales.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-21',
    time: '03:45:00',
    type: 'otro',
    severity: 'alta',
    status: 'pendiente',
    employee: null,
    location: '002',
    camera: 'CAM-008',
    video_file: 'https://drive.google.com/file/d/1stu901/view',
    description: 'Vehículo sospechoso estacionado en zona restringida',
    actions: 'Reporte a autoridades. Patrullaje adicional programado.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-22',
    time: '11:30:00',
    type: 'otro',
    severity: 'media',
    status: 'resuelto',
    employee: null,
    location: '003',
    camera: 'CAM-010',
    video_file: 'https://drive.google.com/file/d/1vwx234/view',
    description: 'Visitante sin identificación en área de recepción',
    actions: 'Verificación con recepción. Visitante autorizado identificado.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-23',
    time: '19:20:00',
    type: 'otro',
    severity: 'baja',
    status: 'resuelto',
    employee: null,
    location: '001',
    camera: 'CAM-007',
    video_file: 'https://drive.google.com/file/d/1yza567/view',
    description: 'Animal doméstico en área de estacionamiento',
    actions: 'Animal removido del área. Señalización mejorada.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-24',
    time: '06:30:00',
    type: 'otro',
    severity: 'media',
    status: 'investigando',
    employee: null,
    location: '002',
    camera: 'CAM-009',
    video_file: 'https://drive.google.com/file/d/1bcd890/view',
    description: 'Actividad inusual en perímetro durante madrugada',
    actions: 'Revisión de sensores. Patrullaje nocturno intensificado.',
    reported_by: 'Surveillance'
  },
  // Más incidentes para probar filtros y paginación
  {
    date: '2024-01-25',
    time: '13:45:00',
    type: 'empleado',
    severity: 'baja',
    status: 'resuelto',
    employee: 'Roberto Silva',
    location: '003',
    camera: 'CAM-011',
    video_file: 'https://drive.google.com/file/d/1efg123/view',
    description: 'Empleado usando uniforme inadecuado en área de producción',
    actions: 'Conversación con supervisor. Uniformes correctos proporcionados.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-26',
    time: '17:10:00',
    type: 'empleado',
    severity: 'alta',
    status: 'pendiente',
    employee: 'Carmen López',
    location: '001',
    camera: 'CAM-012',
    video_file: 'https://drive.google.com/file/d/1hij456/view',
    description: 'Empleada accediendo a archivos confidenciales sin autorización',
    actions: 'Reporte a recursos humanos. Investigación en curso.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-27',
    time: '10:25:00',
    type: 'otro',
    severity: 'baja',
    status: 'resuelto',
    employee: null,
    location: '002',
    camera: 'CAM-013',
    video_file: 'https://drive.google.com/file/d/1klm789/view',
    description: 'Repartidor entregando paquete en área incorrecta',
    actions: 'Reubicación a área correcta. Instrucciones actualizadas.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-28',
    time: '15:50:00',
    type: 'empleado',
    severity: 'media',
    status: 'investigando',
    employee: 'Diego Morales',
    location: '003',
    camera: 'CAM-014',
    video_file: 'https://drive.google.com/file/d/1nop012/view',
    description: 'Empleado no siguiendo protocolo de seguridad en laboratorio',
    actions: 'Capacitación adicional programada. Supervisión reforzada.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-01-29',
    time: '21:35:00',
    type: 'otro',
    severity: 'alta',
    status: 'pendiente',
    employee: null,
    location: '001',
    camera: 'CAM-015',
    video_file: 'https://drive.google.com/file/d/1qrs345/view',
    description: 'Intento de sabotaje en sistema de seguridad',
    actions: 'Reporte a autoridades. Sistema de respaldo activado.',
    reported_by: 'Surveillance'
  },
  // Incidentes recientes
  {
    date: '2024-02-01',
    time: '11:30:00',
    type: 'empleado',
    severity: 'media',
    status: 'pendiente',
    employee: 'Miguel Torres',
    location: '001',
    camera: 'CAM-021',
    video_file: 'https://drive.google.com/file/d/1ijk123/view',
    description: 'Empleado no siguiendo protocolo de limpieza en área de trabajo',
    actions: 'Recordatorio de protocolos. Supervisión adicional.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-02-02',
    time: '16:45:00',
    type: 'otro',
    severity: 'alta',
    status: 'investigando',
    employee: null,
    location: '002',
    camera: 'CAM-022',
    video_file: 'https://drive.google.com/file/d/1lmn456/view',
    description: 'Actividad sospechosa en área de estacionamiento ejecutivo',
    actions: 'Reporte a seguridad. Revisión de accesos VIP.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-02-03',
    time: '08:20:00',
    type: 'empleado',
    severity: 'baja',
    status: 'resuelto',
    employee: 'Sofía Jiménez',
    location: '003',
    camera: 'CAM-023',
    video_file: 'https://drive.google.com/file/d/1opq789/view',
    description: 'Empleada usando equipo de protección personal incorrecto',
    actions: 'Capacitación sobre EPP. Equipo correcto proporcionado.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-02-04',
    time: '20:15:00',
    type: 'otro',
    severity: 'media',
    status: 'pendiente',
    employee: null,
    location: '001',
    camera: 'CAM-024',
    video_file: 'https://drive.google.com/file/d/1rst012/view',
    description: 'Luz de emergencia activada sin causa aparente',
    actions: 'Revisión técnica programada. Sistema de alarmas verificado.',
    reported_by: 'Surveillance'
  },
  {
    date: '2024-02-05',
    time: '13:25:00',
    type: 'empleado',
    severity: 'alta',
    status: 'investigando',
    employee: 'Andrés Vega',
    location: '002',
    camera: 'CAM-025',
    video_file: 'https://drive.google.com/file/d/1uvw345/view',
    description: 'Empleado accediendo a sistema de nóminas sin autorización',
    actions: 'Reporte a IT y RRHH. Accesos suspendidos temporalmente.',
    reported_by: 'Surveillance'
  }
];

async function loadDummyData() {
  try {
    console.log('🚀 Iniciando carga de datos dummy...');
    
    // Limpiar datos existentes (opcional)
    console.log('🧹 Limpiando datos existentes...');
    const { error: deleteError } = await supabase
      .from('incidents')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
    
    if (deleteError) {
      console.warn('⚠️  Advertencia al limpiar datos:', deleteError.message);
    } else {
      console.log('✅ Datos existentes limpiados');
    }
    
    // Insertar datos dummy
    console.log('📝 Insertando datos dummy...');
    const { data, error } = await supabase
      .from('incidents')
      .insert(dummyIncidents);
    
    if (error) {
      console.error('❌ Error al insertar datos:', error);
      return;
    }
    
    console.log('✅ Datos dummy insertados exitosamente!');
    
    // Verificar la inserción
    console.log('🔍 Verificando datos insertados...');
    const { data: incidents, error: fetchError } = await supabase
      .from('incidents')
      .select('*')
      .order('date', { ascending: false });
    
    if (fetchError) {
      console.error('❌ Error al verificar datos:', fetchError);
      return;
    }
    
    // Mostrar estadísticas
    const stats = {
      total: incidents.length,
      empleado: incidents.filter(i => i.type === 'empleado').length,
      otro: incidents.filter(i => i.type === 'otro').length,
      alta: incidents.filter(i => i.severity === 'alta').length,
      media: incidents.filter(i => i.severity === 'media').length,
      baja: incidents.filter(i => i.severity === 'baja').length,
      pendiente: incidents.filter(i => i.status === 'pendiente').length,
      investigando: incidents.filter(i => i.status === 'investigando').length,
      resuelto: incidents.filter(i => i.status === 'resuelto').length
    };
    
    console.log('\n📊 Estadísticas de datos cargados:');
    console.log(`   Total de incidentes: ${stats.total}`);
    console.log(`   Tipo empleado: ${stats.empleado}`);
    console.log(`   Tipo otro: ${stats.otro}`);
    console.log(`   Severidad alta: ${stats.alta}`);
    console.log(`   Severidad media: ${stats.media}`);
    console.log(`   Severidad baja: ${stats.baja}`);
    console.log(`   Estado pendiente: ${stats.pendiente}`);
    console.log(`   Estado investigando: ${stats.investigando}`);
    console.log(`   Estado resuelto: ${stats.resuelto}`);
    
    console.log('\n🎉 ¡Datos dummy cargados exitosamente!');
    console.log('💡 Ahora puedes probar todas las funcionalidades del sistema:');
    console.log('   - Filtros por tipo, severidad, estado, fecha');
    console.log('   - Paginación');
    console.log('   - Generación de reportes PDF');
    console.log('   - Búsqueda y edición de incidentes');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  loadDummyData();
}

module.exports = { loadDummyData, dummyIncidents };
