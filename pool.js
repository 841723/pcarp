const { Pool } = require('pg');

// Configuración del pool de conexiones
const pool = new Pool({
    host:"bjxc2jinqbwlt3blkcz6-postgresql.services.clever-cloud.com",
    user:"umqcsr9mkmjeb8mqysqs",
    password:"buGaOwptsN1AOfdrb1Um",
    port:"50013",
    database:"bjxc2jinqbwlt3blkcz6"
});

// Cerrar todas las conexiones existentes en el pool
pool.end()
  .then(() => console.log('Todas las conexiones cerradas correctamente'))
  .catch(err => console.error('Error al cerrar las conexiones:', err));
