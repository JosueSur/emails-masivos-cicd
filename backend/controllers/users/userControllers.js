const { sql, getConnection } = require("../../database/connectionSQLserver")
const { sequelize } = require("../../database/db_emails_masivos")
const { Clientes, Estados, Registros, Roles, Usuarios } = require("../../database/db_emails_masivos")
const {default: axios} = require("axios");
const ldap = require("ldapjs");
require("dotenv").config();


////////////////////////////// LOGIN USUARIO CON LDAP ////////////////////////////////////////////////

function authDN(usuario, password, cb) {
    const client = ldap.createClient({ url: process.env.LDAP })
      client.bind(usuario, password, function (err) { 
      client.unbind();
      cb(err === null, err);
    });
  }
  
  const getlogin = async (req, res) => {
    const { usuario, password } = req.body;
    
    if (!usuario || !password){
      return res.status(400).send({
        error : "Missing required fields - username, password"
      });
    }

    let results;
    try {
        results = await Usuarios.findAll({ where: {username: usuario}, raw: true})
        } catch (error) {
      return res.status(200).json( "null" );
    }
    authDN(String(usuario)+ '@pdm.local', String(password), async function(result,err){
      if (err){
        return res.status(200).json(
         "Unable to login"
        );
      } else if (results[0]) {
        const cant_conex = await Usuarios.update({cantidad_conexiones: results[0].cantidad_conexiones + 1,
                                                  ultima_conexion: new Date()}, 
                                                  {where: {id: results[0].id}});
        res.status(200).json({ data: results[0] });
      }
    });
  };

  const getRoles = async (req, res) => {
    const results = await Roles.findAll()
    res.status(200).json({ data: results });
 };

const createUser = async (req, res) => {
  try{
    const { nombre, apellido, email, username, roleId } = req.body;
    let result = await Usuarios.findAll()
    const data = result[0]
    if(data && Object.values(data).some(element => element.username == username)){
      return res.status(200).json({ data: 'null' })
      } else {

      await Usuarios.create({ nombre: nombre,
                              apellido: apellido,
                              email: email,
                              username: username,
                              roleId: roleId })
      res.status(200).json({ data: "OK" })
      }
  } catch (error) {
    console.log(error) 
    return res.status(200).json( "null" );   
  } 
}

  /////////////////////////////// MODULE EXPORTS //////////////////////////////////////////////////////////////////

  module.exports = { 
      getlogin,
      getRoles,
      createUser,
  }