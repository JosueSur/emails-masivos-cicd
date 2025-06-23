const { Registros, Clientes, Usuarios, Estados, ClientesArgentina } = require('../models');
const xlsx = require('xlsx');
const fs = require('fs').promises;
const path = require('path');
const dayjs = require('dayjs');

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

  async crearRegistro(req) {
    try {
      // Obtener los datos del formulario
      const datos = req.body;
      
      if (req.file) {
        
        const fechaDayjs = dayjs(datos.fecha_programada).format('DD_MM_YYYY');
        // Si hay archivo, moverlo a la carpeta files
        // Obtener el nombre original del archivo
        const nombreOriginal = req.file.originalname;
        // Reemplazar espacios por guiones bajos en el nombre original
        const nombreSinEspacios = nombreOriginal.split('.')[0].replace(/\s+/g, '_');
        
        // Crear el nombre del archivo con el formato: nombre_original_fecha_programada.pdf
        const nombreArchivo = `${nombreSinEspacios}_${fechaDayjs}.pdf`;
        const rutaArchivo = path.join(__dirname, '../files/', nombreArchivo);
        // Verificar si el archivo ya existe
        const existeArchivo = await fs.access(rutaArchivo).then(() => true).catch(() => false);
        if (existeArchivo) {
          throw new Error('Un archivo con este nombre ya existe');
        }
        
        // Mover el archivo a la carpeta files
        await fs.rename(req.file.path, rutaArchivo);
        
        // Actualizar los datos con el nombre del archivo
        datos.archivo = nombreArchivo;
      }
      
      // Crear el registro con los datos
      // Formatear fechas en DD/MM/YYYY
      const fechaRegistro = new Date(datos.fecha_registro);
      const fechaDay = dayjs(datos.fecha_programada).format('DD/MM/YYYY');

      const formatoFecha = (fecha, soloUnDigitoMes = false) => {
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = soloUnDigitoMes ? String(fecha.getMonth() + 1) : String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
      };
      
      const registro = await Registros.create({
        fecha_registro: formatoFecha(fechaRegistro, true),
        fecha_programada: fechaDay,
        archivo: datos.archivo, 
        observacion: datos.observaciones, 
        sociedades: datos.sociedad, 
        usuarioId: datos.usuario_id,
        estadoId: 1
      });
      
      return registro;
    } catch (error) {
      console.error('Error al crear registro:', error);
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
