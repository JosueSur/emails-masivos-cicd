const { sql, getConnection, getData/* getConnectionView */ } = require("../../database/connectionSQLServer");
const { Clientes_argentina, Estados, Registros, Roles, Usuarios } = require("../../database/db_emails_masivos");
const { sequelize } = require("../../database/db_emails_masivos");
const nodemailer = require("nodemailer");
const path = require("path");
//const { default: axios } = require("axios");
require("dotenv").config();
const xlsx = require('xlsx');
/* const { info, info } = require("console"); */


const getNuevosClientes = async (req, res) => {

  try{
    //const truncate = await Clientes_argentina.destroy({truncate: true});
    const excel = xlsx.readFile('./controllers/registro/12052025.XLSX');
    const resultSheets = excel.SheetNames;
    const result = xlsx.utils.sheet_to_json(excel.Sheets[resultSheets]);
    let excelObject = [];
    
    const chargeObject = result.forEach((item) => {
      
          excelObject.push({
            id_clientes: item.id_clientes,
            organizacion_venta: item.organizacion_venta,
            canal_distribucion: item.canal_distribucion,
            sector: item.sector,
            matchcode: item.matchcode,
            poblacion: item.poblacion,
            nombre: item.nombre,
            clave_pais: item.clave_pais,
            telefono: item.telefono,
            grupo_clientes: item.grupo_clientes,
            email: item.email
        })

    });

    function removeDuplicates(originalArray, prop) {
      const newArray = [];
      const lookupObject  = {};
 
      for(const i in originalArray) {
         lookupObject[originalArray[i][prop]] = originalArray[i];
      }
 
      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
       return newArray;
    }
    const uniqueArray = removeDuplicates(excelObject, "id_clientes");

    uniqueArray.map(async(item) => {
        try{
 
         const chargeDb = await Clientes_argentina.create({
           id_clientes: item.id_clientes,
           organizacion_venta: item.organizacion_venta,
           canal_distribucion: item.canal_distribucion,
           sector: item.sector,
           matchcode: item.matchcode,
           poblacion: item.poblacion,
           nombre: item.nombre,
           clave_pais: item.clave_pais,
           telefono: item.telefono,
           grupo_clientes: item.grupo_clientes,
           email: item.email
         })
         return chargeDb
         //res.status(200).json({msg: 'Ok'});
        }catch(err){
          //res.status(500);
          console.log(err)
          res.send(err.message);
        }
     });
    //res.status(200).json({msg: 'Ok'});
  }catch(err){
    //res.status(500);
    console.log(err)
    res.send(err.message);
  }
  
};
//getNuevosClientes()
const getRegistros = async (req, res) => {
    let results = await Registros.findAll({raw: true});
    let response = await Usuarios.findAll({raw: true});
    let username = [];
    response.map(e => {
      username.push({id: e.id, username: e.username})
    })
    results.map(e => {
      response.map(j => {
        if(e.usuarioId == j.id){
          e['username'] = j.username
        }
      })
    })
    res.status(200).json({ data: results });
};

const getAllRegistrosById = async (req, res) => {
  const { contract } = req.body;
  let results = await Registros.findAll({where: {id: contract}, raw: true})
  res.status(200).json({ data: results })
}

const createRegistroNew = async (req, res) => {
  try {
    const { usuario_id, fecha } = req.body;
    const usuarioId = usuario_id;
    const fecha_registro = fecha;
    let results = await Registros.create({ usuarioId, fecha_registro })
    let response = await Registros.max('id')
    res.status(200).json({ data: response })
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

const importPdf = async (req, res) => {
  try {
    const { clave } = req.body;
    var filePath = path.resolve(__dirname, "../files/" + req.file.filename);
    let response = await Registros.update({ archivo: filePath }, { where: {id: clave} })
    .then(() => res.status(200).json({ data: 'OK' }))
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }  
};

const guardarRegistro = async (req, res) => {
  try{
    const { clave, fecha, pdf, observacion, estado, sociedades} = req.body;
    let results = await Registros.update({ fecha_programada: fecha, 
                                           archivo: pdf, 
                                           observacion: observacion, 
                                           estadoId: estado, 
                                           sociedades: sociedades },
                                           {where: { id: clave }})
    .then(() => res.status(200).json({ data: 'OK' }))                                  
  } catch(error) {
      res.status(500);
      res.send(error.message)
  };
};

const deleteRegistro = async (req, res) => {
  try {
    const { clave } = req.body
    let results = await Registros.destroy({ where: { id: clave } })
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}


const cancelarRegistro = async (req, res) => {
  const { clave } = req.body;
  const result = await Registros.destroy({ where: { id: clave }})
  res.status(200).json({ data: 'OK' })
}


async function traeDatos(){

    let results = await Registros.findAll({raw: true})
  
    let date = new Date();
    //Año
    y = date.getFullYear();
    //Mes
    m = date.getMonth() + 1;
    //Día
    d = date.getDate();
  
    //Agregar cero al dia si es menor a 10
    let day = d;
  
    if(d < 10){
      day = '0' + d;
    }
  
    //Agregar cero al mes si es menor a 10
    let month = m;
  
    if(m < 10){
      month = '0' + m;
    }
  
  
   const fechaDia2 = day + "/" + month + "/" + y; /* + " " + hour + ":" + minute; */
  
   //Guardar en un array todas las fechas e id de los registros
  
   let datosYfechas = [];  

    results.forEach(function(e){
      if(e.estadoId == 2){
        datosYfechas.push({ id: e.id, 
                            fecha: e.fecha_programada, 
                            estado: e.estadoId, 
                            archivo: e.archivo, 
                            observacion: e.observacion, 
                            sociedades: e.sociedades })
                          }
    })

   //Separar las fechas para compararlos
  
   let diaActual = fechaDia2.slice(0,2);
   let mesActual = fechaDia2.slice(3,5);
   let añoActual = fechaDia2.slice(6,10);
  
   let fechasCoinciden = []; //Almacenamos los registros que coinciden con la fecha para ejecutar el envio de email
  
   for(i = 0; i < datosYfechas.length; i++){
    let diaProgramada = datosYfechas[i].fecha.slice(0,2);
    let mesProgramada = datosYfechas[i].fecha.slice(3,5);
    let añoProgramada = datosYfechas[i].fecha.slice(6,10);
    if(diaActual == diaProgramada && mesActual == mesProgramada && añoActual == añoProgramada 
       && datosYfechas[i].estado == 2){
     fechasCoinciden.push(datosYfechas[i])
   }
  }

  if(fechasCoinciden.length > 0){

    for(i = 0; i < fechasCoinciden.length; i++){

      let sociedad = fechasCoinciden[i].sociedades;
      let adjunto = fechasCoinciden[i].archivo;
      let observacion = fechasCoinciden[i].observacion;
    
      /* const dbSettings2 = {
        user: process.env.DB_USER_SQLSERVER_VIEW || "",
        password: process.env.DB_PASSWORD_SQLSERVER_VIEW || "",
        server: process.env.DB_SERVER_SQLSERVER_VIEW || "",
        database: process.env.DB_DATABASE_SQLSERVER_VIEW || "",
        options: {
          encrypt: false, // for azure
          trustServerCertificate: true, // change to true for local dev / self-signed certs
        }
      }; */
   
    
      let clientes;
      let arrayClientes = [];

      const clientesFromDb = await Clientes_argentina.findAll({where: {organizacion_venta: parseInt(sociedad)}, raw: true});

      clientesFromDb.map((item) => {
        if(item.email !== ''){
          arrayClientes.push(item.email);
        }
      });

       /* sql.connect(dbSettings2).then(async pool => {
        return await pool.request()
        .input('sociedad', sql.NVarChar, sociedad)
        .query("SELECT * FROM [dbo].[view_clientes_argentina] WHERE [dbo].[view_clientes_argentina].organizacion_venta = @sociedad")
      }).then(e => {
        clientes = e.recordset
        clientes.forEach(f => {
          arrayClientes.push(f.email)
        }) */
        
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_USER, // generated ethereal user
              pass: process.env.EMAIL_PASS, // generated ethereal password
            },
          });
          
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Registro de emails" <cobranzas@prodeman.com.ar>', // sender address
              to: 'cobranzas@prodeman.com.ar', // list of receivers
              bcc: arrayClientes,
              subject: "Actualización de Legajo Impositivo", // Subject line
              text: observacion,
              attachments: [{ filename: adjunto, path: "./files/"+ adjunto +"" }],
              dsn: {
                id: '5.0.0',
                return: 'headers',
                notify: ['failure', 'delay'],
                recipient: 'cobranzas@prodeman.com.ar'
              }
            }, (error, info) => {
              if(error){
                return console.log('error', error)
              } else {
                console.log('info accepted', info.accepted);
                console.log('info rejected', info.rejected);
                fechasCoinciden.forEach(function (e){
                  let id = e.id;
                  Registros.update({ estadoId: 1 }, { where: { id: id }})              
                })
              }
            });   
         /*  })
        .catch(err => {
        console.error(err);
        }) */
      }
  }
  
  return console.log(fechasCoinciden)
}
//setInterval(function() { traeDatos() }, 21600000)
//traeDatos()

/* const actualizarClientes = async (req, res) => {
      const excel = xlsx.readFile('./controllers/registro/listado_22042025.XLSX');
      const resultSheets = excel.SheetNames;
      const result = xlsx.utils.sheet_to_json(excel.Sheets[resultSheets]);

      const clientesDB = await Clientes_argentina.findAll({raw: true});
      
      const newArray = [];
      result.map((item) => {
        item['id_clientes'] = parseInt(item.cliente);
        return item
      });

      clientesDB.filter((item) => {
        result.map((elem) => {
          if(item.id_clientes === elem.id_clientes){
            newArray.push(item)
          }
        })
      })
      console.log('resultr', newArray);
}
actualizarClientes(); */

module.exports = { 
    getRegistros,
    createRegistroNew,
    importPdf,
    guardarRegistro,
    deleteRegistro,
    getAllRegistrosById,
    cancelarRegistro,
    getNuevosClientes,
    //actualizarClientes
}