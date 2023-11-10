// VOrocesador.js
const ProductoVO = require('./VOproducto');

// Definición del constructor para el Value Object Procesador
function ProcesadorVO(idProducto, marca, modelo, precio, descuento, descripcion, stock, ventas, tipo, familia) {
  // Llama al constructor del objeto base (Producto)
  ProductoVO.call(this, idProducto, marca, modelo, precio, descuento, descripcion, stock, ventas, tipo);

  this.familia = familia;
}

// Establece la herencia prototípica
VOprocesador.prototype = Object.create(VOProducto.prototype);

// Exporta el constructor para su uso en otros archivos
module.exports = ProcesadorVO;
