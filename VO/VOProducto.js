class VOProducto {
    constructor(id_producto, nombre, precio, descripcion, stock) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.stock = stock;
    }
}

module.exports = VOProducto