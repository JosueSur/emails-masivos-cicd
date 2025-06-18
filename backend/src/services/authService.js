const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuarios } = require('../models/index');
const ldapService = require('./ldapService');

const authService = {
  async register(userData) {
    const { email, password, nombre } = userData;
    
    // Verificar si el usuario ya existe
    const existingUser = await Usuarios.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const user = await Usuarios.create({
      email,
      password: hashedPassword,
      nombre
    });

    return user;
  },

  async login(username, password) {

    const user = await Usuarios.findOne({ where: { username } });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const ldap = await ldapService.authDN(username, password);
    if (!ldap) {
      throw new Error('Credenciales inválidas');
    }

    /* const isPasswordValid = await bcrypt.compare(password, password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    } */

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { user, token };
  }
};

module.exports = authService;
