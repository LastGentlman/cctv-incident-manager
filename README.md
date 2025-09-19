# Sistema de Registro CCTV

Una aplicación React para la gestión de incidentes y videos de vigilancia CCTV.

## Características

- ✅ Gestión completa de incidentes CCTV
- ✅ Filtros avanzados (tipo, fecha, empleado, severidad, estado)
- ✅ Paginación
- ✅ Formulario modal para crear/editar incidentes
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Base de datos Supabase con esquema optimizado
- ✅ Búsqueda de texto completo
- ✅ Estadísticas de incidentes
- ✅ CRUD completo con Supabase
- ✅ Estados de carga y manejo de errores
- ✅ IDs automáticos de incidentes (INC-001, INC-002, etc.)

## Tecnologías

- **Frontend**: React 18, Tailwind CSS, Lucide React Icons
- **Backend**: Supabase (PostgreSQL)
- **Base de datos**: PostgreSQL con extensiones avanzadas

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd cctvreg
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura Supabase:
   - Crea un proyecto en [Supabase](https://supabase.com)
   - Ejecuta el archivo `supabase-schema.sql` en tu base de datos
   - Copia `env.example` a `.env` y configura tus credenciales

4. Inicia la aplicación:
```bash
npm start
```

## Configuración de Supabase

### 1. Crear proyecto
- Ve a [supabase.com](https://supabase.com)
- Crea un nuevo proyecto
- Anota la URL del proyecto y la clave anónima

### 2. Ejecutar esquema
- Ve a la sección SQL Editor en tu dashboard de Supabase
- Copia y pega el contenido de `supabase-schema.sql`
- Ejecuta el script

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
REACT_APP_SUPABASE_URL=https://tu-proyecto-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

## Estructura de la Base de Datos

### Tabla `incidents`
- `id`: UUID primario
- `incident_id`: ID único del incidente (INC-001, INC-002, etc.)
- `date`: Fecha del incidente
- `time`: Hora del incidente
- `type`: Tipo (empleado/otro)
- `severity`: Severidad (baja/media/alta)
- `status`: Estado (pendiente/investigando/resuelto)
- `employee`: Nombre del empleado (opcional)
- `location`: Ubicación del incidente
- `camera`: ID de la cámara
- `video_file`: Archivo de video (opcional)
- `description`: Descripción del incidente
- `actions`: Acciones tomadas (opcional)
- `reported_by`: Quien reportó el incidente
- `created_at`: Fecha de creación
- `updated_at`: Fecha de última actualización

### Funciones disponibles
- `get_incident_stats()`: Obtiene estadísticas de incidentes
- `search_incidents(search_term)`: Búsqueda de texto completo
- `generate_incident_id()`: Genera IDs automáticamente

## Uso

### Crear un incidente
1. Haz clic en "Nuevo Incidente"
2. Completa los campos requeridos (marcados con *)
3. Haz clic en "Crear Incidente"

### Filtrar incidentes
1. Haz clic en "Filtros" para mostrar el panel
2. Usa los filtros disponibles:
   - Tipo (Empleado/Otro)
   - Fecha
   - Empleado
   - Severidad
   - Estado
3. Los resultados se actualizan automáticamente

### Editar/Eliminar
- Usa los botones de editar (lápiz) o eliminar (basura) en cada incidente
- La edición abre el mismo formulario con los datos precargados

## Características Técnicas

### Seguridad
- Row Level Security (RLS) habilitado
- Políticas de acceso configuradas
- Validación de datos en frontend y backend

### Performance
- Índices optimizados para consultas frecuentes
- Paginación para grandes volúmenes de datos
- Búsqueda de texto completo con ranking

### Escalabilidad
- Esquema normalizado
- Triggers automáticos para mantenimiento
- Funciones reutilizables

## Desarrollo

### Scripts disponibles
- `npm start`: Inicia el servidor de desarrollo
- `npm build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expone la configuración de webpack

### Estructura del proyecto
```
src/
├── components/
│   └── CCTVIncidentManager.js
├── lib/
│   └── supabase.js
├── App.js
├── index.js
└── index.css
```

### Archivos importantes
- `supabase-schema.sql`: Esquema completo de la base de datos
- `test-schema.js`: Script de prueba para validar la conexión
- `src/lib/supabase.js`: Cliente y funciones de Supabase
- `env.example`: Plantilla de variables de entorno

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
