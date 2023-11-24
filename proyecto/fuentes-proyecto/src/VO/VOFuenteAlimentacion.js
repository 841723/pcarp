// VOFuenteAlimentacion.js
const VOProducto = require('./VOProducto');

// Definición de la clase para el Value Object FuenteAlimentacion
class VOFuenteAlimentacion extends VOProducto {
  constructor(id, marca, modelo, precio, descuento, descripcion, stock, ventas, familia) {
    // Llama al constructor de la clase base (VOProducto)
    super(id, marca, modelo, precio, descuento, descripcion, stock, ventas, 'fuente_alimentacion');

    this.familia = familia;
  }
}

// Exporta la clase para su uso en otros archivos
module.exports = VOFuenteAlimentacion;
