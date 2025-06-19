const { Registros, Clientes, Usuarios, Estados, ClientesArgentina } = require('../models');
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
        await Clientes.create({
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
      const registros = await Registros.findAll({
        include: [
          {
            model: Usuarios,
            attributes: ['id', 'username', 'nombre', 'apellido', 'email', 'roleId']
          },
          {
            model: Estados,
            attributes: ['id', 'descripcion']
          }
        ],
        order: [['fecha_registro', 'DESC']]
      });
      return registros;
    } catch (error) {
      throw error;
    }
  },

  async crearRegistro(registroData) {
    try {
      const registro = await Registros.create(registroData);
      return registro;
    } catch (error) {
      throw error;
    }
  },

  async actualizarRegistro(id, registroData) {
    try {
      const registro = await Registros.findByPk(id);
      if (!registro) {
        throw new Error('Registro no encontrado');
      }
      await registro.update(registroData);
      return registro;
    } catch (error) {
      throw error;
    }
  },

  async eliminarRegistro(id) {
    try {
      const registro = await Registros.findByPk(id);
      if (!registro) {
        throw new Error('Registro no encontrado');
      }
      await registro.destroy();
    } catch (error) {
      throw error;
    }
  }
};

module.exports = registroService;
