const express = require('express');
const app = express();
const cors = require('cors');
const {Client} = require('pg')
const DAOusuario = require('./DAO/DAOusuario');
const DAOPedido = require('./DAO/DAOpedido');
const DAOProducto = require('./DAO/DAOproducto');
const DAOcontPedido = require('./DAO/DAOcontPedido');
const DAOproducto = require('./DAO/DAOproducto');

const client = new Client ({
    host:"bjxc2jinqbwlt3blkcz6-postgresql.services.clever-cloud.com",
    user:"umqcsr9mkmjeb8mqysqs",
    password:"buGaOwptsN1AOfdrb1Um",
    port:"50013",
    database:"bjxc2jinqbwlt3blkcz6"

});

client.connect();

app.use(cors());
app.use(express.static(__dirname +'/public'));



// app.get('/consulta1', (req, res) => {
//     // Aquí ejecutas la consulta SQL a la base de datos y obtienes los resultados.
//   client.query(`SELECT * FROM public.usuario`, (error, result) => {
//     if (error) {  // Si hay un error, se lanza una excepción.
//       throw error;
//     }
//     // Envía los resultados como respuesta al cliente en formato JSON.
//     //   res.send(result.rows);
//     res.json(result.rows);
//   });
// });

// app.get('/consulta2', (req, res) => {
//   const daoP = new DAOProducto(client);
//   daoP.obtenerTodos()
//     .then((resultadoObtenido) => {
//       res.json(resultadoObtenido);
//     })
//     .catch((error) => {
//       console.error(error); // Manejo de errores
//     });
// });

// app.get('/consulta3', (req, res) => {
//   // Aquí ejecutas la consulta SQL a la base de datos y obtienes los resultados.
// client.query(`SELECT * FROM public.pedido`, (error, result) => {
//   if (error) {  // Si hay un error, se lanza una excepción.
//     throw error;
//   }
//   // Envía los resultados como respuesta al cliente en formato JSON.
//   //   res.send(result.rows);
//   res.json(result.rows);
// });
// });


app.get('/top_selling', (req, res) => {
  const daoP = new DAOProducto(client);
  daoP.obtenerMasVendidos(4)
    .then((resultadoObtenido) => {
      res.json(resultadoObtenido);
    })
    .catch((error) => {
      console.error(error); // Manejo de errores
    });
});

app.get('/new_products', (req, res) => {
  const daoP = new DAOProducto(client);
  daoP.obtenerRandom(4)
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

app.get('/create_user_by_mail', (req, res) => { 
  const mail = req.query.mail; // Aquí obtendrás el string enviado
  const pass = req.query.pass; // Aquí obtendrás el string enviado
  const daoU = new DAOusuario(client);

  daoU.insertar_mail_pass(mail,pass)
  res.redirect('/login.html');
});

app.get('/update_pass_by_mail', (req, res) => { 
  const mail = req.query.mail; // Aquí obtendrás el string enviado
  const pass = req.query.pass; // Aquí obtendrás el string enviado
  const daoU = new DAOusuario(client);

  daoU.actualizar_pass(mail,pass)
  res.redirect('/login.html');
});

app.get('/update_user_by_mail', (req, res) => {
  const mail = req.query.email; // Aquí obtendrás el string enviado
  const nombre = req.query.nombre; // Aquí obtendrás el string enviado
  const apellidos = req.query.apellidos; // Aquí obtendrás el string enviado
  const direccion = req.query.direccion; // Aquí obtendrás el string enviado
  const pass = req.query.pass; // Aquí obtendrás el string enviado
  const daoU = new DAOusuario(client);
  daoU.actualizar(mail,nombre,apellidos,direccion,pass)
  .then((resultadoObtenido) => {
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});

app.get('/search_products', (req, res) => {
  const tipo = req.query.tipo; // Aquí obtendrás el string enviado
  const cantidad = req.query.cantidad; // Aquí obtendrás el string enviado
  const order   = req.query.order; // Aquí obtendrás el string enviado
  const precio_max = req.query.precio_max; // Aquí obtendrás el string enviado
  const precio_min = req.query.precio_min; // Aquí obtendrás el string enviado
  const brands_names = req.query.brands_names; // Aquí obtendrás el string enviado
  const daoP = new DAOProducto(client);

  daoP.obtener(tipo,cantidad,order,precio_max,precio_min,brands_names)

    .then((resultadoObtenido) => {
      res.json(resultadoObtenido);
    })
    .catch((error) => {
      console.error(error); // Manejo de errores
    });
});


app.get('/products', (req, res) => {
  const daoP = new DAOProducto(client);
  daoP.obtenerTodos()
  .then((resultadoObtenido) => {
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});

app.get('/products_all', (req, res) => {
  const id_producto = req.query.id_producto; // Aquí obtendrás el string enviado
  const daoP = new DAOProducto(client);
  daoP.obtenerTodosAll(id_producto)
  .then((resultadoObtenido) => {
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});

app.get('/products_tipo', (req, res) => {
  const tipo = req.query.tipo; // Aquí obtendrás el string enviado

  const daoP = new DAOProducto(client);
  daoP.obtenerPorTipo(tipo)
  .then((resultadoObtenido) => {
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});

app.get('/products_random', (req, res) => {

  const daoP = new DAOProducto(client);
  daoP.obtenerRandom(1)
  .then((resultadoObtenido) => {
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});

app.get('/products_id', (req, res) => { 
  const id = req.query.id; // Aquí obtendrás el string enviado
  const daoP = new DAOproducto(client);

  daoP.obtenerPorId(id)
  .then((resultadoObtenido) => {
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});



app.get('/crear_pedido', (req, res) => {
  const id_usuario = req.query.id_usuario; // Aquí obtendrás el string enviado
  const fecha_llegada = req.query.fecha; // Aquí obtendrás el string enviado
  const estado = req.query.estado; // Aquí obtendrás el string enviado
  const cart = req.query.cart; // Aquí obtendrás el string enviado
  productos = []
  cantidades = []
  cart.split(';').forEach(element => {
    productos.push(element.split(':')[0].replace('id',''))
    cantidades.push(element.split(':')[1])
  });
  productos.shift()
  cantidades.shift()

  const daoP = new DAOPedido(client);
  console.log(id_usuario,fecha_llegada,estado)
  
  daoP.insertar(id_usuario,fecha_llegada,estado)
  .then((resultadoObtenido) => {
    const daoCP = new DAOcontPedido(client);
    daoCP.insertar(resultadoObtenido, productos, cantidades)
    const daoP = new DAOProducto(client);
    daoP.actualizarStock(productos, cantidades)
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
})

app.get('/pedidos_datos', (req, res) => {
  const det_prod = req.query.det; // Aquí obtendrás el string enviado

  const daoP = new DAOPedido(client);
  daoP.obtenerTodosDatos(det_prod)
  .then((resultadoObtenido) => {
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});

app.get('/pedidos_datos_by_mail', (req, res) => {
  const det_prod = req.query.det; // Aquí obtendrás el string enviado
  const mail = req.query.email; // Aquí obtendrás el string enviado

  const daoP = new DAOPedido(client);
  daoP.obtenerTodosDatosMail(det_prod, mail)
  .then((resultadoObtenido) => {
    res.json(resultadoObtenido);
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});


app.get('/pedidos_cambiar_estado', (req, res) => {
  const id_pedido = req.query.id_pedido; // Aquí obtendrás el string enviado
  const estado = req.query.estado; // Aquí obtendrás el string enviado

  const daoP = new DAOPedido(client);
  daoP.actualizarEstado(id_pedido,estado)
  .then((resultadoObtenido) => {
    res.json({});
  })
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
});


app.get('/eliminar_objeto', (req, res) => {
  const id = req.query.id; // Aquí obtendrás el string enviado
  const objeto = req.query.objeto; // Aquí obtendrás el string enviado

  if (objeto == 'usuario') {
    const daoU = new DAOusuario(client);
    daoU.eliminar(id)
    .then((resultadoObtenido) => {
      res.json({});
    })
    .catch((error) => {
      console.error(error); // Manejo de errores
    });
  }
  else if (objeto == 'orders') {
    const daoP = new DAOPedido(client);
    daoP.eliminar(id)
    .then((resultadoObtenido) => {
      res.json({});
    })
    .catch((error) => {
      console.error(error); // Manejo de errores
    });
  }
  else if (objeto == 'products') {
    const daoP = new DAOProducto(client);
    daoP.eliminar(id)
    .then((resultadoObtenido) => {
      res.json({});
    })
    .catch((error) => {
      console.error(error); // Manejo de errores
    });
  }
  else if (objeto == 'cont_pedido') {
    const daoCP = new DAOcontPedido(client);
    daoCP.eliminar(id)
    .then((resultadoObtenido) => {
      res.json({});
    })
    .catch((error) => {
      console.error(error); // Manejo de errores
    });
  }
});


app.get('/editar_producto', (req, res) => {
  let attributes = req.query.attributes; // Aquí obtendrás el string enviado
  let keys = []
  let values = []
  let keys_extra = []
  let values_extra = []
  for (let i = 0; i < (attributes.split(';')).length-1; i++) {
    if ((i+1)<=9) {
      keys.push(attributes.split(';')[i].split(':')[0])
      values.push(attributes.split(';')[i].split(':')[1])
    }
    else {
      keys_extra.push(attributes.split(';')[i].split(':')[0])
      values_extra.push(attributes.split(';')[i].split(':')[1])
    }
  }
  const daoProd = new DAOProducto(client);
  daoProd.actualizarList(keys,values,keys_extra,values_extra)
  .then((resultadoObtenido) => {
   res.json({"success":resultadoObtenido});
  })  
  .catch((error) => {
    res.json({"success": false, "error": error});
    console.error(error); // Manejo de errores
  });
})

app.get('/anadir_producto', (req, res) => {
  let attributes = req.query.attributes; // Aquí obtendrás el string enviado
  let keys = []
  let values = []
  let keys_extra = []
  let values_extra = []
  for (let i = 0; i < (attributes.split(';')).length-1; i++) {
    if ((i+1)<=9) {
      keys.push(attributes.split(';')[i].split(':')[0])
      values.push(attributes.split(';')[i].split(':')[1])
    }
    else {
      keys_extra.push(attributes.split(';')[i].split(':')[0])
      values_extra.push(attributes.split(';')[i].split(':')[1])
    }
  }
  const daoProd = new DAOProducto(client);
  daoProd.crearList(keys,values,keys_extra,values_extra)
  .then((resultadoObtenido) => {
    res.json({success: true});
  })  
  .catch((error) => {
    console.error(error); // Manejo de errores
  });
})

app.get('/buy', (req, res) => {
  const id = req.query.id; // Aquí obtendrás el string enviado
  const cantidad = req.query.cantidad; // Aquí obtendrás el string enviado
  const daoP = new DAOProducto(client);

  daoP.actualizarStockProduct(id,cantidad)
  .then((resultadoObtenido) => {
    res.json({"success": true});
  })
  .catch((error) => {
    res.json({"success": false, "error": error});
    console.error(error); // Manejo de errores
  });
})

app.get('/cancelar_pedido', async (req, res) => {
  const id_pedido = req.query.id_pedido; // Aquí obtendrás el string enviado
  const cont = new DAOcontPedido(client);
  const daoP = new DAOPedido(client);

  try {
    // Eliminar de la tabla contPedido
    await cont.eliminar(id_pedido);

    // Eliminar de la tabla Pedido
    await daoP.eliminar(id_pedido);

    // Enviar respuesta JSON
    res.json({});
  } catch (error) {
    console.error(error); // Manejo de errores
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
});



app.listen(33029, () => {
    console.log("servidor iniciado en el puerto 33029...");
});


module.exports = app;