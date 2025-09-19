# 📊 Datos Dummy para Sistema CCTV

Este directorio contiene datos de prueba para el Sistema de Registro de Incidentes CCTV.

## 📁 Archivos Incluidos

### 1. `dummy-data.sql`
- **Descripción**: Script SQL con datos dummy para insertar directamente en Supabase
- **Contenido**: 20 incidentes de prueba con diferentes tipos, severidades y estados
- **Uso**: Ejecutar en el SQL Editor de Supabase

### 2. `load-dummy-data.js`
- **Descripción**: Script Node.js para cargar datos dummy automáticamente
- **Contenido**: Mismos 20 incidentes pero en formato JavaScript
- **Uso**: `node load-dummy-data.js`

## 🎯 Datos de Prueba Incluidos

### **Tipos de Incidentes:**
- **Empleados**: 12 incidentes
- **Otros**: 8 incidentes

### **Severidades:**
- **🔴 Alta**: 6 incidentes
- **🟡 Media**: 7 incidentes  
- **🟢 Baja**: 7 incidentes

### **Estados:**
- **⏳ Pendiente**: 6 incidentes
- **🔍 Investigando**: 7 incidentes
- **✅ Resuelto**: 7 incidentes

### **Ubicaciones:**
- **001**: 7 incidentes
- **002**: 7 incidentes
- **003**: 6 incidentes

### **Período de Tiempo:**
- **Enero 2024**: 15 incidentes
- **Febrero 2024**: 5 incidentes

## 🚀 Cómo Cargar los Datos

### **Opción 1: Script Node.js (Recomendado)**
```bash
# Asegúrate de tener las variables de entorno configuradas
node load-dummy-data.js
```

### **Opción 2: SQL Directo**
1. Abre el SQL Editor en Supabase
2. Copia y pega el contenido de `dummy-data.sql`
3. Ejecuta el script

## 📋 Casos de Prueba Cubiertos

### **✅ Filtros:**
- Por tipo (empleado/otro)
- Por severidad (alta/media/baja)
- Por estado (pendiente/investigando/resuelto)
- Por ubicación (001/002/003)
- Por rango de fechas

### **✅ Paginación:**
- 20 incidentes para probar paginación
- Diferentes configuraciones de items por página

### **✅ Reportes PDF:**
- Reportes completos
- Reportes filtrados
- Diferentes combinaciones de filtros

### **✅ Funcionalidades:**
- Crear nuevos incidentes
- Editar incidentes existentes
- Eliminar incidentes
- Búsqueda y filtrado

## 🎭 Escenarios de Prueba

### **1. Incidentes de Empleados:**
- Acceso no autorizado a sistemas
- Violaciones de seguridad
- Uso inadecuado de equipos
- Incumplimiento de protocolos

### **2. Incidentes de Otros:**
- Intrusiones
- Vehículos sospechosos
- Visitantes no autorizados
- Actividades inusuales

### **3. Diferentes Estados:**
- **Pendientes**: Requieren atención inmediata
- **Investigando**: En proceso de resolución
- **Resueltos**: Casos cerrados con acciones tomadas

## 🔧 Configuración Requerida

### **Variables de Entorno:**
```env
REACT_APP_SUPABASE_URL=tu_url_de_supabase
REACT_APP_SUPABASE_ANON_KEY=tu_clave_anonima
```

### **Dependencias:**
```bash
npm install @supabase/supabase-js
```

## 📊 Estadísticas de los Datos

| Categoría | Cantidad | Porcentaje |
|-----------|----------|------------|
| **Total Incidentes** | 20 | 100% |
| **Empleados** | 12 | 60% |
| **Otros** | 8 | 40% |
| **Alta Severidad** | 6 | 30% |
| **Media Severidad** | 7 | 35% |
| **Baja Severidad** | 7 | 35% |
| **Pendientes** | 6 | 30% |
| **Investigando** | 7 | 35% |
| **Resueltos** | 7 | 35% |

## 🎨 Características de los Datos

### **Realismo:**
- Nombres de empleados realistas
- Descripciones detalladas de incidentes
- Acciones tomadas específicas
- Horarios variados (día/noche)

### **Variedad:**
- Diferentes tipos de cámaras (CAM-001 a CAM-025)
- Múltiples ubicaciones
- Enlaces a Google Drive simulados
- Fechas distribuidas en el tiempo

### **Completitud:**
- Todos los campos requeridos llenos
- Datos consistentes
- Relaciones lógicas entre campos
- Estados coherentes con descripciones

## 🧪 Pruebas Sugeridas

1. **Filtros Básicos**: Probar cada filtro individualmente
2. **Filtros Combinados**: Usar múltiples filtros simultáneamente
3. **Paginación**: Cambiar número de items por página
4. **Reportes**: Generar PDFs con diferentes filtros
5. **CRUD**: Crear, editar y eliminar incidentes
6. **Responsive**: Probar en diferentes tamaños de pantalla

## 🔄 Limpiar Datos

Para limpiar los datos dummy y empezar de nuevo:

```sql
DELETE FROM incidents;
```

O usar el script:
```bash
node load-dummy-data.js
```

## 📝 Notas Importantes

- Los datos dummy incluyen enlaces simulados a Google Drive
- Todos los incidentes están reportados por "Surveillance"
- Los IDs de incidentes se generan automáticamente
- Las fechas están en formato YYYY-MM-DD
- Los horarios están en formato HH:MM:SS

¡Disfruta probando todas las funcionalidades del sistema! 🎉
