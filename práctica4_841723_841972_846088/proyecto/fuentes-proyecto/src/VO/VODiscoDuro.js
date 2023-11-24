// VODiscoDuro.js
const VOProducto = require('./VOProducto');

// Definición de la clase para el Value Object Disco Duro
class VODiscoDuro extends VOProducto {
  constructor(id, marca, modelo, precio, descuento, descripcion, stock, ventas, tamano, tecnologia) {
    // Llama al constructor de la clase base (VOProducto)
    super(id, marca, modelo, precio, descuento, descripcion, stock, ventas, 'disco_duro');

    this.tamano = tamano;
    this.tecnologia = tecnologia;
  }
}

// Exporta la clase para su uso en otros archivos
module.exports = VODiscoDuro;
