require("dotenv").config();

const cookieParser = require('cookie-parser');
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { conexion_emails_masivos, /* conexion_clientes_view */ } = require("./database/db_emails_masivos");
// inicio del sever
const app = express();

// middlewares

// app.use(express.static(__dirname + "/public"), {
//     extensions: ['html', 'htm'],
// });

// app.set('views', path.resolve(__dirname + './views'));
// app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname + '/public')));

app.use(morgan("tiny"));
app.use(cors());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.EMAILS_MASIVOS); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// API REST (llama con middlewares)
app.use("/api/registro", require("./routers/registroRoutes"));
app.use("/api/users", require("./routers/usersRoutes"));
/* app.use("/api/clientes", require("./routers/clientesRoutes")); */

// ejecuta server en puerto
app.set("port", process.env.PORT || 8001);

/* app.listen(app.get("port"), () => {
  console.log("Server on PORT", app.get("port"));
});
 */

/* app.get("/descargar/:id", function(req, res) {
  res.download(__dirname + "/files/" + req.params.id, req.params.id, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("LISTO");
    }
  })
}) */


const connect = async()=>{
  try{
      await app.listen(app.get("port"), () => {
          console.log("Server on PORT", app.get("port"));
          console.log('SISTEMAS PRODEMAN SA');
      });
      await conexion_emails_masivos.authenticate();
      console.log('Conexión Lista');
      await conexion_emails_masivos.sync(/* {force:true} */);
      console.log('Tablas sincronizadas');
      /* await conexion_clientes_view.authenticate();
      console.log('view lista');
      await conexion_clientes_view.sync();
      console.log('view sincronizada') */   
  }
  catch(e){
      console.log(e)
  }
}
connect();
