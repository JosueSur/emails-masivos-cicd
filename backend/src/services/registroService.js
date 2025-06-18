const { Registro, Cliente, Usuario } = require('../models');
const xlsx = require('xlsx');

const registroService = {
  async cargarClientesDesdeExcel(file) {
    try {
      const workbook = xlsx.readFile(file);
      const sheetName = workbook.SheetNames[0];
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Eliminar duplicados
      const clientesUnicos = data.reduce((acc, item) => {
        if (!acc[item.id_clientes]) {
          acc[item.id_clientes] = item;
        }
        return acc;
      }, {});

      // Convertir a array
      const clientesArray = Object.values(clientesUnicos);

      // Guardar en base de datos
      for (const cliente of clientesArray) {
        await Cliente.create({
          id_clientes: cliente.id_clientes,
          organizacion_venta: cliente.organizacion_venta,
          canal_distribucion: cliente.canal_distribucion,
          sector: cliente.sector,
          matchcode: cliente.matchcode,
          poblacion: cliente.poblacion,
          nombre: cliente.nombre,
          clave_pais: cliente.clave_pais,
          telefono: cliente.telefono,
          grupo_clientes: cliente.grupo_clientes,
          email: cliente.email
        });
      }

      return { success: true, message: 'Clientes cargados exitosamente' };
    } catch (error) {
      throw new Error('Error al cargar clientes: ' + error.message);
    }
  },

  async obtenerRegistros() {
    try {
      const registros = await Registro.findAll({
        include: [
          {
            model: Usuario,
            attributes: ['id', 'username', 'nombre', 'apellido']
          }
        ],
        order: [['fecha', 'DESC']]
      });

      return registros;
    } catch (error) {
      throw new Error('Error al obtener registros: ' + error.message);
    }
  },

  async crearRegistro(data, usuarioId) {
    try {
      const registro = await Registro.create({
        ...data,
        usuarioId
      });

      return registro;
    } catch (error) {
      throw new Error('Error al crear registro: ' + error.message);
    }
  },

  async actualizarRegistro(id, data) {
    try {
      const registro = await Registro.findByPk(id);
      if (!registro) {
        throw new Error('Registro no encontrado');
      }

      return await registro.update(data);
    } catch (error) {
      throw new Error('Error al actualizar registro: ' + error.message);
    }
  },

  async eliminarRegistro(id) {
    try {
      const registro = await Registro.findByPk(id);
      if (!registro) {
        throw new Error('Registro no encontrado');
      }

      return await registro.destroy();
    } catch (error) {
      throw new Error('Error al eliminar registro: ' + error.message);
    }
  },

  async obtenerRegistrosPorUsuario(usuarioId) {
    try {
      const registros = await Registro.findAll({
        where: { usuarioId },
        include: [
          {
            model: Usuario,
            attributes: ['username', 'nombre', 'apellido']
          }
        ],
        order: [['fecha', 'DESC']]
      });

      return registros;
    } catch (error) {
      throw new Error('Error al obtener registros del usuario: ' + error.message);
    }
  },

  async obtenerRegistrosPorEstado(estado) {
    try {
      const registros = await Registro.findAll({
        where: { estado },
        include: [
          {
            model: Usuario,
            attributes: ['username', 'nombre', 'apellido']
          }
        ],
        order: [['fecha', 'DESC']]
      });

      return registros;
    } catch (error) {
      throw new Error('Error al obtener registros por estado: ' + error.message);
    }
  }
};

module.exports = registroService;
