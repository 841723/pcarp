const express = require('express');
const app = express();
const {Client} = require('pg')
const {sum} = require('./sum')
const DAOusuario = require('./DAO/DAOusuario')

const client = new Client ({
    // host:"bqnze3lsktl7tehwubei-postgresql.services.clever-cloud.com",
    // user:"umqcsr9mkmjeb8mqysqs",
    // password:"buGaOwptsN1AOfdrb1Um",
    // port:"5432",
    // database:"bqnze3lsktl7tehwubei"
    host: 'bb0nb0yr1ryi57ymxpvb-postgresql.services.clever-cloud.com',
  user: 'uuqrczahynsdtn5wrqec',
  password: 'J1bhpliLfxZGbTMW4COmwfNygibFFb',
  port: 5432,
  database: 'bb0nb0yr1ryi57ymxpvb',
});

client.connect();
// client.query(`SELECT * FROM public.usuario`, (err,res)=>{
client.query(`SELECT * FROM public.empleado`, (err,res)=>{
    var obj = [];
    if (!err) {
        // obj = res.rows;
        // obj.forEach(element => {
        //     console.log("nombre "+element.nombre+" apellido "+element.apellidos+" tiene password: "+element.contrasena+" y mail: "+element.mail);
        // });
        console.log(res.rows)
    }
    else {
        console.log(err.message);
    }
    // client.end();
});     

// const dao = new DAOusuario(client);
// console.log(dao.obtenerTodos());

// app.get('/', (req,res) => {

//     res.end('hola mundo');
// });

app.use(express.static(__dirname +'/public'));


app.listen(3000, () => {
    console.log('servidor iniciado...');
});


app.get('/consulta1', (req, res) => {
    // Aquí ejecutas la consulta SQL a la base de datos y obtienes los resultados.
    client.query(`SELECT * FROM public.usuario`, (error, result) => {
      if (error) {  // Si hay un error, se lanza una excepción.
        throw error;
      }
      // Envía los resultados como respuesta al cliente en formato JSON.
    //   res.send(result.rows);
      res.json(result.rows);
    });
  });


  app.get('/endpoint', (req, res) => {
    const data = req.query.data; // Aquí obtendrás el string enviado
  
    console.log('Recibido:'+data);

    client.query(data, (error, result) => {
      if (error) {  // Si hay un error, se lanza una excepción.
        throw error;
      }
      // Envía los resultados como respuesta al cliente en formato JSON.
    //   res.send(result.rows);
      res.json(result.rows);
    });
  });