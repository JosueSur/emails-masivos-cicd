const Registro = require('../../models/Registro');
const Usuarios = require('../../models/Usuarios');
const Estado = require('../../models/Estado');

const registroController = {
  getAll: async (req, res) => {
    try {
      const registros = await Registro.findAll({
        include: [
          { model: Usuarios, as: 'usuario' },
          { model: Estado, as: 'estado' }
        ]
      });
      res.json(registros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const registro = await Registro.findByPk(req.params.id, {
        include: [
          { model: Usuarios, as: 'usuario' },
          { model: Estado, as: 'estado' }
        ]
      });
      if (!registro) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      res.json(registro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { usuarioId, estadoId, descripcion } = req.body;
      const registro = await Registro.create({
        usuarioId,
        estadoId,
        descripcion
      });
      res.status(201).json(registro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const registro = await Registro.findByPk(req.params.id);
      if (!registro) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      await registro.update(req.body);
      res.json(registro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const registro = await Registro.findByPk(req.params.id);
      if (!registro) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      await registro.destroy();
      res.json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = registroController;
