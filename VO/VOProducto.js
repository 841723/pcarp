class VOProducto {
    constructor(id_producto, marca, modelo, precio, descripcion, stock, tipo) {
        this.id_producto = id_producto;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.stock = stock;
        this.ventas = 0;
        this.tipo = tipo;
    }
}

module.exports = VOProducto
