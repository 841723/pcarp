class VOProducto {
    constructor(id_producto, marca, modelo, precio, descuento, descripcion, ventas,stock, tipo) {
        this.id_producto = id_producto;
        this.marca = marca;
        this.modelo = modelo;
        this.descuento = descuento
        this.descripcion = descripcion;
        this.stock = stock;
        this.ventas = ventas;
        this.precio = precio;
        this.tipo = tipo;
    }
}

module.exports = VOProducto
