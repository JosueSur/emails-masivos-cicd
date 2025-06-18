const sql = require("mssql");
require("dotenv").config();

const dbSettings = {
  user: process.env.DB_USER_SQLSERVER || "",
  password: process.env.DB_PASSWORD_SQLSERVER || "",
  server: process.env.DB_SERVER_SQLSERVER || "",
  database: process.env.DB_DATABASE_SQLSERVER || "",
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

/* const dbSettings2 = {
  user: process.env.DB_USER_SQLSERVER_VIEW || "",
  password: process.env.DB_PASSWORD_SQLSERVER_VIEW || "",
  server: process.env.DB_SERVER_SQLSERVER_VIEW || "",
  database: process.env.DB_DATABASE_SQLSERVER_VIEW || "",
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
}; */

const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool
  } catch (error) {
    console.error(error);
  }
};

/* let clientes;
function getConnectionView(){
  return sql.connect(dbSettings2).then(pool => {
    return pool.request()
    .query("SELECT * FROM [dbo].[view_clientes_argentina]")
  }).then(results => {
    clientes = results.recordset;
  })
  .catch(err => {
    console.error(err);
  })
};

async function getData(){
  await getConnectionView();
  console.log(clientes[0])
} */

module.exports = { sql, getConnection, /* getData */ };
