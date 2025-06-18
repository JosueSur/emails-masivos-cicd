const Usuario = require('../../models/Usuario');
const Role = require('../../models/Role');

const usuarioController = {
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll({
        include: [
          { model: Role, as: 'role' }
        ]
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id, {
        include: [
          { model: Role, as: 'role' }
        ]
      });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, apellido, email, username, password, roleId } = req.body;
      const usuario = await Usuario.create({
        nombre,
        apellido,
        email,
        username,
        password,
        roleId
      });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      await usuario.update(req.body);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      await usuario.destroy();
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const newPassword = '123456'; // Contraseña por defecto
      usuario.password = newPassword;
      await usuario.save();
      res.json({ message: 'Contraseña reseteada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = usuarioController;
