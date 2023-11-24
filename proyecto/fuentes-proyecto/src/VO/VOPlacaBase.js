// VOPlacaBase.js
const VOProducto = require('./VOProducto');

// Definición de la clase para el Value Object Placa Base
class VOPlacaBase extends VOProducto {
  constructor(id, marca, modelo, precio, descuento, descripcion, stock, ventas, chipset, tieneM2) {
    // Llama al constructor de la clase base (VOProducto)
    super(id, marca, modelo, precio, descuento, descripcion, stock, ventas, 'placa_base');

    this.chipset = chipset;
    this.tieneM2 = tieneM2;
  }
}

// Exporta la clase para su uso en otros archivos
module.exports = VOPlacaBase;