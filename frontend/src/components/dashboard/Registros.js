import React, { useState, useEffect } from 'react';
import axios from 'axios';
import selectService from '../../services/selectService';

const Registros = () => {
  const [registros, setRegistros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id_registro: '',
    id_usuario: '',
    id_estado: '',
    fecha: '',
    observaciones: ''
  });

  useEffect(() => {
    fetchRegistros();
    fetchSelectData();
  }, []);

  const fetchRegistros = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/registros');
      setRegistros(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar registros');
      setLoading(false);
    }
  };

  const fetchSelectData = async () => {
    try {
      const [usuariosData, estadosData] = await Promise.all([
        selectService.getUsuarios(),
        selectService.getEstados()
      ]);
      setUsuarios(usuariosData);
      setEstados(estadosData);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar datos');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id_registro) {
      handleUpdate(e);
    } else {
      handleCreate(e);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8001/api/registros', formData);
      setShowForm(false);
      setFormData({
        id_registro: '',
        id_usuario: '',
        id_estado: '',
        fecha: '',
        observaciones: ''
      });
      fetchRegistros();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear registro');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8001/api/registros/${formData.id_registro}`, formData);
      setShowForm(false);
      setFormData({
        id_registro: '',
        id_usuario: '',
        id_estado: '',
        fecha: '',
        observaciones: ''
      });
      fetchRegistros();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar registro');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await axios.delete(`http://localhost:8001/api/registros/${id}`);
        fetchRegistros();
      } catch (err) {
        setError(err.response?.data?.message || 'Error al eliminar registro');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Registros</h2>
        <button
          onClick={() => {
            setFormData({
              id_registro: '',
              id_usuario: '',
              id_estado: '',
              fecha: new Date().toISOString().split('T')[0],
              observaciones: ''
            });
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Nuevo Registro
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <select
                name="id_usuario"
                value={formData.id_usuario}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Seleccionar usuario</option>
                {usuarios.map(usuario => (
                  <option key={usuario.value} value={usuario.value}>
                    {usuario.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                name="id_estado"
                value={formData.id_estado}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Seleccionar estado</option>
                {estados.map(estado => (
                  <option key={estado.value} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Observaciones</label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registros.map((registro) => (
              <tr key={registro.id_registro}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {registro.id_registro}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {registro.usuario?.nombre} {registro.usuario?.apellido}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {registro.estado?.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(registro.fecha).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => {
                      setFormData(registro);
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(registro.id_registro)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registros;
