import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registros.css';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registros = () => {
  const { user } = useAuth();
  
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fecha_registro: '',
    fecha_programada: '',
    archivo: null,
    observaciones: '',
    sociedad: '',
    usuario_id: '',
    id_registro: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        archivo: file
      }));
    }
  };

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
      setRegistros(response.data.data || []);
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
      const formDataToSend = new FormData();
      
      // Agregar todos los campos del formulario
      Object.keys(formData).forEach(key => {
        if (key !== 'archivo') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Agregar el archivo PDF si existe
      if (formData.archivo) {
        formDataToSend.append('archivo', formData.archivo);
      }

      // Enviar el FormData al backend
      const response = await axios.post(
        formData.id_registro 
          ? `http://localhost:8001/api/registro/actualizar-registro/${formData.id_registro}` 
          : 'http://localhost:8001/api/registro/crear-registro',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Manejar la respuesta
      if (response.data && response.data.success) {
        toast.success(formData.id_registro ? 'Registro actualizado exitosamente' : 'Registro creado exitosamente');
        fetchRegistros();
        setShowForm(false);
        setFormData({
          fecha_registro: '',
          fecha_programada: '',
          archivo: null,
          observaciones: '',
          sociedad: '',
          usuario_id: user?.id || '',
          id_registro: ''
        });
      } else {
        console.error('Error al procesar el registro:', response.data.error);
        toast.error('Error al ' + (formData.id_registro ? 'actualizar' : 'crear') + ' el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Error al ' + (formData.id_registro ? 'actualizar' : 'crear') + ' el registro');
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
        await axios.delete(`http://localhost:8001/api/registro/eliminar-registro/${id}`);
        fetchRegistros();
      } catch (err) {
      }
    }
  };

  const handleEdit = (registro) => {
    setFormData({
      fecha_registro: registro.fecha_registro,
      fecha_programada: registro.fecha_programada,
      archivo: registro.archivo,
      observaciones: registro.observaciones,
      sociedad: registro.sociedad,
      usuario_id: registro.usuario_id,
      id_registro: registro.id_registro
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setFormData({
      fecha_registro: '',
      fecha_programada: '',
      archivo: '',
      observaciones: '',
      sociedad: '',
      usuario_id: user?.id || '',
      id_registro: ''
    });
    setShowForm(true);
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  if (loading || !registros) {
    return (
      <div className="container-fluid">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
      <div className="container-fluid">
          <div className="flex justify-center items-center mb-6 mt-6">
            <h2 className="text-2xl font-bold">Registros general de emails</h2>
          </div>
          <div className="registros-card">
            <div className="registros-card-body">
              <div className="flex justify-end">
                <button
                  onClick={() => handleNew()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Nuevo Registro
                </button>
              </div>
              <div className="registros-card-body">
                {showForm && (
                  <div className="mb-4">
                    <form onSubmit={handleSubmit} className="registros-form">
                      <div className="registros-form-group">
                        <label className="registros-form-label">Sociedad</label>
                        <select
                          className="registros-form-control bg-white"
                          name="sociedad"
                          value={formData.sociedad}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Seleccionar sociedad</option>
                          <option value='1000' key={'1000'}>1000</option>
                          <option value='2000' key={'2000'}>2000</option>
                          <option value='4000' key={'4000'}>4000</option>
                          <option value='5000' key={'5000'}>5000</option>
                          <option value='6000' key={'6000'}>6000</option>
                        </select>
                      </div>
                      <div className="registros-form-group">
                        <label className="registros-form-label">Fecha</label>
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
                        <label className="registros-form-label">Archivo PDF</label>
                        <input
                          type="file"
                          className="registros-form-control"
                          name="archivo"
                          accept=".pdf"
                          onChange={handleFileChange}
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
    )
  }

export default Registros;
