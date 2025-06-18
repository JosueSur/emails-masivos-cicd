const Estado = require('../../models/Estado');

const estadoController = {
  getAll: async (req, res) => {
    try {
      const estados = await Estado.findAll();
      res.json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const estado = await Estado.findByPk(req.params.id);
      if (!estado) {
        return res.status(404).json({ error: 'Estado no encontrado' });
      }
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const estado = await Estado.create(req.body);
      res.status(201).json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const estado = await Estado.findByPk(req.params.id);
      if (!estado) {
        return res.status(404).json({ error: 'Estado no encontrado' });
      }
      await estado.update(req.body);
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const estado = await Estado.findByPk(req.params.id);
      if (!estado) {
        return res.status(404).json({ error: 'Estado no encontrado' });
      }
      await estado.destroy();
      res.json({ message: 'Estado eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = estadoController;
