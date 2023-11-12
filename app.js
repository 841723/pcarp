const express = require('express');
const app = express();
const {Client} = require('pg')
const DAOusuario = require('./DAO/DAOusuario');
const DAOPedido = require('./DAO/DAOpedido');
const DAOProducto = require('./DAO/DAOproducto');

const client = new Client ({
    host:"bjxc2jinqbwlt3blkcz6-postgresql.services.clever-cloud.com",
    user:"umqcsr9mkmjeb8mqysqs",
    password:"buGaOwptsN1AOfdrb1Um",
    port:"50013",
    database:"bjxc2jinqbwlt3blkcz6"

});

client.connect();

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
  

    const daoP = new DAOPedido(client);
    if (data=="") {
      console.log("data=")
      daoP.obtenerTodos()
      .then((resultadoObtenido) => {
        res.json(resultadoObtenido);
      })
      .catch((error) => {
        console.error(error); // Manejo de errores
      });
    }
    else {
      daoP.obtenerPorId(data)
      .then((resultadoObtenido) => {
        res.json(resultadoObtenido);
      })
      .catch((error) => {
        console.error(error); // Manejo de errores
      });
    }
  });

  app.get('/hot_deals', (req, res) => {
    const daoP = new DAOProducto(client);
    daoP.obtenerMasVendidos(5)
      .then((resultadoObtenido) => {
        res.json(resultadoObtenido);
      })
      .catch((error) => {
        console.error(error); // Manejo de errores
      });
  });

  app.get('/user_mail', (req, res) => {
    const data = req.query.data; // Aquí obtendrás el string enviado
    const daoU = new DAOusuario(client);

    daoU.obtenerPorMail(data)
      .then((resultadoObtenido) => {
        res.json(resultadoObtenido);
      })
      .catch((error) => {
        console.error(error); // Manejo de errores
      });
  });

