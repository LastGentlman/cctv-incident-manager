import React, { useState, useEffect } from 'react';
import { Plus, AlertTriangle, Eye, Filter, Trash2, Edit3, X } from 'lucide-react';
import { incidentsAPI } from '../lib/supabase';

const CCTVIncidentManager = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    date: '',
    employee: '',
    severity: 'all',
    status: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    date: '',
    time: '',
    type: 'otro',
    severity: 'baja',
    status: 'pendiente',
    employee: '',
    location: '',
    camera: '',
    video_file: '',
    description: '',
    actions: '',
    reported_by: ''
  });

  // Load incidents from Supabase
  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await incidentsAPI.getAll();
      setIncidents(data);
      setFilteredIncidents(data);
    } catch (err) {
      setError('Error al cargar los incidentes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar y paginar incidentes
  useEffect(() => {
    let filtered = incidents;

    if (filters.type !== 'all') {
      filtered = filtered.filter(incident => incident.type === filters.type);
    }
    if (filters.date) {
      filtered = filtered.filter(incident => incident.date === filters.date);
    }
    if (filters.employee) {
      filtered = filtered.filter(incident => 
        incident.employee.toLowerCase().includes(filters.employee.toLowerCase())
      );
    }
    if (filters.severity !== 'all') {
      filtered = filtered.filter(incident => incident.severity === filters.severity);
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(incident => incident.status === filters.status);
    }

    setFilteredIncidents(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [incidents, filters]);

  // Calcular incidentes para la página actual
  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIncidents = filteredIncidents.slice(startIndex, endIndex);

  const handleSubmit = async () => {
    // Validar campos requeridos
    if (!formData.date || !formData.time || !formData.location || !formData.camera || !formData.description || !formData.reported_by) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    if (formData.type === 'empleado' && !formData.employee) {
      alert('El nombre del empleado es requerido para incidentes de empleado');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);

      if (editingIncident) {
        // Update existing incident
        const updatedIncident = await incidentsAPI.update(editingIncident.id, formData);
        setIncidents(incidents.map(incident => 
          incident.id === editingIncident.id ? updatedIncident : incident
        ));
        setEditingIncident(null);
      } else {
        // Create new incident - exclude id field for new incidents
        const { id, ...incidentData } = formData;
        const newIncident = await incidentsAPI.create(incidentData);
        setIncidents([newIncident, ...incidents]);
      }

      resetForm();
    } catch (err) {
      setError('Error al guardar el incidente: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      date: '',
      time: '',
      type: 'otro',
      severity: 'baja',
      status: 'pendiente',
      employee: '',
      location: '',
      camera: '',
      video_file: '',
      description: '',
      actions: '',
      reported_by: ''
    });
    setShowForm(false);
    setEditingIncident(null);
  };

  const handleEdit = (incident) => {
    setFormData(incident);
    setEditingIncident(incident);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este incidente?')) {
      try {
        setLoading(true);
        setError(null);
        await incidentsAPI.delete(id);
        setIncidents(incidents.filter(incident => incident.id !== id));
      } catch (err) {
        setError('Error al eliminar el incidente: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resuelto': return 'bg-green-100 text-green-800 border-green-200';
      case 'investigando': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pendiente': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header con botón de filtros */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Eye className="w-8 h-8 text-blue-600" />
                Sistema de Registro CCTV
              </h1>
              <p className="text-gray-600 mt-1">Gestión de incidentes y videos de vigilancia</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors border ${
                  showFilters 
                    ? 'bg-blue-50 text-blue-700 border-blue-200' 
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                Filtros
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo Incidente
              </button>
            </div>
          </div>
        </div>

        {/* Panel de filtros expandible */}
        {showFilters && (
          <div className="border-b border-gray-100 bg-gray-50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="empleado">Empleado</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({...filters, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empleado</label>
                <input
                  type="text"
                  placeholder="Buscar empleado..."
                  value={filters.employee}
                  onChange={(e) => setFilters({...filters, employee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severidad</label>
                <select
                  value={filters.severity}
                  onChange={(e) => setFilters({...filters, severity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas</option>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="investigando">Investigando</option>
                  <option value="resuelto">Resuelto</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Mostrar</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span className="text-sm text-gray-600">incidentes por página</span>
              </div>
              
              <button
                onClick={() => {
                  setFilters({
                    type: 'all',
                    date: '',
                    employee: '',
                    severity: 'all',
                    status: 'all'
                  });
                }}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}

        {/* Barra de información simple */}
        <div className="px-6 py-3 bg-white border-b border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              {filteredIncidents.length === incidents.length ? (
                <>Total: {filteredIncidents.length} incidentes</>
              ) : (
                <>Mostrando {filteredIncidents.length} de {incidents.length} incidentes</>
              )}
            </div>
            <div>
              Página {currentPage} de {totalPages} • 
              Mostrando {startIndex + 1}-{Math.min(endIndex, filteredIncidents.length)}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Cargando...</p>
          </div>
        )}

        {/* Lista de Incidentes */}
        <div className="p-6">
          {!loading && currentIncidents.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron incidentes</p>
            </div>
          ) : !loading && (
            <>
              <div className="space-y-4">
                {currentIncidents.map((incident) => (
                  <div key={incident.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-lg text-gray-900">{incident.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${incident.type === 'empleado' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-purple-100 text-purple-800 border-purple-200'}`}>
                            {incident.type === 'empleado' ? 'Empleado' : 'Otro'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                            {incident.severity.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                            {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">Fecha y Hora</p>
                            <p className="font-medium">{incident.date} {incident.time}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Ubicación</p>
                            <p className="font-medium">{incident.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Cámara</p>
                            <p className="font-medium">{incident.camera}</p>
                          </div>
                          {incident.employee && (
                            <div>
                              <p className="text-sm text-gray-600">Empleado</p>
                              <p className="font-medium">{incident.employee}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-600">Video</p>
                            <p className="font-medium text-blue-600">{incident.video_file}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Reportado por</p>
                            <p className="font-medium">{incident.reported_by}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">Descripción</p>
                          <p className="text-gray-900">{incident.description}</p>
                        </div>
                        
                        {incident.actions && (
                          <div>
                            <p className="text-sm text-gray-600">Acciones Tomadas</p>
                            <p className="text-gray-900">{incident.actions}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(incident)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(incident.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Anterior
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;
                    
                    // Mostrar solo páginas cercanas a la actual
                    if (totalPages <= 7 || 
                        pageNumber === 1 || 
                        pageNumber === totalPages ||
                        Math.abs(pageNumber - currentPage) <= 2) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-1 rounded-md text-sm ${
                            isCurrentPage
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                      return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de Formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingIncident ? 'Editar Incidente' : 'Nuevo Incidente'}
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha*</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora*</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo*</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value, employee: e.target.value === 'otro' ? '' : formData.employee})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="empleado">Empleado</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severidad*</label>
                    <select
                      value={formData.severity}
                      onChange={(e) => setFormData({...formData, severity: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado*</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="investigando">Investigando</option>
                      <option value="resuelto">Resuelto</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.type === 'empleado' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Empleado*</label>
                      <input
                        type="text"
                        value={formData.employee}
                        onChange={(e) => setFormData({...formData, employee: e.target.value})}
                        required={formData.type === 'empleado'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre del empleado"
                      />
                    </div>
                  )}
                  <div className={formData.type === 'empleado' ? '' : 'col-span-2'}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación*</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ubicación del incidente"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cámara*</label>
                    <input
                      type="text"
                      value={formData.camera}
                      onChange={(e) => setFormData({...formData, camera: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ID de la cámara"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Archivo de Video</label>
                    <input
                      type="text"
                      value={formData.video_file}
                      onChange={(e) => setFormData({...formData, video_file: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre del archivo de video"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reportado por*</label>
                  <input
                    type="text"
                    value={formData.reported_by}
                    onChange={(e) => setFormData({...formData, reported_by: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del reportador"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción*</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descripción detallada del incidente"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Acciones Tomadas</label>
                  <textarea
                    value={formData.actions}
                    onChange={(e) => setFormData({...formData, actions: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Acciones tomadas en respuesta al incidente"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    {loading ? 'Guardando...' : (editingIncident ? 'Actualizar' : 'Crear')} Incidente
                  </button>
                  <button
                    onClick={resetForm}
                    disabled={loading}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTVIncidentManager;
