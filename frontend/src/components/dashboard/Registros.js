import React, { useState, useEffect } from 'react';
import axios from 'axios';
import selectService from '../../services/selectService';
import './Registros.css';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Registros = () => {
  const [registros, setRegistros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [sociedades, setSociedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id_registro: '',
    id_usuario: '',
    id_estado: '',
    fecha: '',
    fecha_programada: '',
    archivo: '',
    observaciones: '',
    id_sociedad: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (registros) {
      const pages = Math.ceil(registros.length / itemsPerPage);
      setTotalPages(pages);
    }
  }, [registros, itemsPerPage]);

  const fetchRegistros = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/registro/obtener-registros');
      console.log('Registros:', response.data.data);
      setRegistros(response.data.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchSelectData = async () => {
    try {
      const usuariosData = await selectService.getUsuarios();
      const estadosData = await selectService.getEstados();
      const sociedadesData = await selectService.getSociedades();
      
      if (!usuariosData || !Array.isArray(usuariosData)) {
        throw new Error('Error al obtener usuarios');
      }
      if (!estadosData || !Array.isArray(estadosData)) {
        throw new Error('Error al obtener estados');
      }
      if (!sociedadesData || !Array.isArray(sociedadesData)) {
        throw new Error('Error al obtener sociedades');
      }

      setUsuarios(usuariosData);
      setEstados(estadosData);
      setSociedades(sociedadesData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id_registro) {
        await axios.put(`/api/registro/actualizar-registro/${formData.id_registro}`, formData);
      } else {
        await axios.post('/api/registro/crear-registro', formData);
      }
      
      fetchRegistros();
      setShowForm(false);
      setFormData({
        id_registro: '',
        id_usuario: '',
        id_estado: '',
        fecha: '',
        fecha_programada: '',
        archivo: '',
        observaciones: '',
        id_sociedad: ''
      });
    } catch (err) {
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';

    try {
      // Si es string en formato DD/MM/YYYY
      if (typeof date === 'string') {
        // Dividimos la fecha en partes
        const [day, month, year] = date.split('/');
        
        // Verificamos que tengamos 3 partes
        if (day && month && year) {
          // Convertimos a números
          const d = parseInt(day, 10);
          const m = parseInt(month, 10) - 1; // Los meses en Date son 0-11
          const y = parseInt(year, 10);
          
          // Creamos el objeto Date
          const dateObj = new Date(y, m, d);
          
          // Verificamos que sea una fecha válida
          if (isNaN(dateObj.getTime())) return 'Fecha inválida';
          
          // Formateamos como DD/MM/YYYY
          return `${String(d).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/${y}`;
        }
      }
      
      // Si no es string o no tiene el formato correcto
      return 'Fecha inválida';
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha inválida';
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      try {
        await axios.delete(`/api/registro/eliminar-registro/${id}`);
        fetchRegistros();
      } catch (err) {
      }
    }
  };

  const handleEdit = (registro) => {
    setFormData({
      id_registro: registro.id_registro,
      id_usuario: registro.id_usuario,
      id_estado: registro.id_estado,
      id_sociedad: registro.id_sociedad,
      fecha: registro.fecha,
      fecha_programada: registro.fecha_programada,
      archivo: registro.archivo,
      observaciones: registro.observaciones
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setFormData({
      id_registro: '',
      id_usuario: '',
      id_estado: '',
      id_sociedad: '',
      fecha: '',
      fecha_programada: '',
      archivo: '',
      observaciones: ''
    });
    setShowForm(true);
  };

  useEffect(() => {
    fetchRegistros();
    fetchSelectData();
  }, []);

  if (loading || !registros || !usuarios || !estados) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="registros-card">
              <div className="registros-card-body">
                <div className="text-center">
                  <div className="registros-spinner"></div>
                  <p className="registros-loading-text">Cargando datos...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registros-container">
      <div className="row">
        <div className="col-12">
          <div className="registros-card">
            <div className="registros-card-header d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Registros</h3>
              <button
                className="registros-button registros-button-primary"
                onClick={handleNew}
              >
                Nuevo Registro
              </button>
            </div>
            <div className="registros-card-body">
              {showForm && (
                <div className="mb-4">
                  <form onSubmit={handleSubmit} className="registros-form">
                    <div className="registros-form-group">
                      <label className="registros-form-label">Usuario</label>
                      <select
                        className="registros-form-control"
                        name="id_usuario"
                        value={formData.id_usuario}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar usuario</option>
                        {Array.isArray(usuarios) && usuarios.map(usuario => (
                          <option key={usuario.id_usuario} value={usuario.id_usuario}>
                            {usuario.nombre} {usuario.apellido} ({usuario.username})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="registros-form-group">
                      <label className="registros-form-label">Estado</label>
                      <select
                        className="registros-form-control"
                        name="id_estado"
                        value={formData.id_estado}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar estado</option>
                        {Array.isArray(estados) && estados.map(estado => (
                          <option key={estado.id_estado} value={estado.id_estado}>
                            {estado.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="registros-form-group">
                      <label className="registros-form-label">Sociedad</label>
                      <select
                        className="registros-form-control"
                        name="id_sociedad"
                        value={formData.id_sociedad}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar sociedad</option>
                        {Array.isArray(sociedades) && sociedades.map(sociedad => (
                          <option key={sociedad.id_sociedad} value={sociedad.id_sociedad}>
                            {sociedad.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="registros-form-group">
                      <label className="registros-form-label">Fecha</label>
                      <input
                        type="date"
                        className="registros-form-control"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="registros-form-group">
                      <label className="registros-form-label">Fecha Programada</label>
                      <input
                        type="date"
                        className="registros-form-control"
                        name="fecha_programada"
                        value={formData.fecha_programada}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="registros-form-group">
                      <label className="registros-form-label">Archivo</label>
                      <input
                        type="text"
                        className="registros-form-control"
                        name="archivo"
                        value={formData.archivo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="registros-form-group">
                      <label className="registros-form-label">Observaciones</label>
                      <textarea
                        className="registros-form-control"
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleInputChange}
                        rows="3"
                      />
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="button" className="registros-button-secondary me-2" onClick={() => setShowForm(false)}>
                        Cancelar
                      </button>
                      <button type="submit" className="registros-button registros-button-primary">
                        {formData.id_registro ? 'Actualizar' : 'Crear'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {Array.isArray(registros) && registros.length === 0 ? (
                <div className="text-center py-4">
                  <p className="registros-loading-text">No hay registros disponibles</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Accion</th>
                          <th>Fecha</th>
                          <th>Fecha programada</th>
                          <th>Archivo</th>
                          <th>Observacion</th>
                          <th>Usuario</th>
                          <th>Estado</th>
                          <th>Sociedades</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registros
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map((registro) => (
                            <tr key={registro.id}>
                              <td>
                                <button
                                  onClick={() => handleEdit(registro)}
                                  className="action-btn edit-btn"
                                  title="Editar"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(registro.id)}
                                  className="action-btn delete-btn"
                                  title="Eliminar"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                              <td>{registro?.fecha_registro ? formatDate(registro.fecha_registro) : 'Sin datos'}</td>
                              <td>{registro?.fecha_programada ? formatDate(registro.fecha_programada) : 'Sin datos'}</td>
                              <td>{registro?.archivo ? registro.archivo : 'Sin datos'}</td>
                              <td title={registro?.observacion ? registro.observacion : 'Sin datos'}>
                                <div className="tooltip-content">{registro?.observacion ? registro.observacion : 'Sin datos'}</div>
                              </td>
                              <td>{registro?.usuario ? `${registro?.usuario?.nombre} ${registro?.usuario?.apellido}` : 'Sin datos'}</td>
                              <td>{registro?.estado ? registro.estado.descripcion : 'Sin datos'}</td>
                              <td>{registro?.sociedades ? registro.sociedades : 'Sin datos'}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span>Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, registros.length)} de {registros.length} registros</span>
                    </div>
                    <nav className="registros-pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="page-link"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="page-link"
                      >
                        <FaChevronRight />
                      </button>
                    </nav>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registros;
