class VOPedido {
    constructor(id_pedido, id_usuario, fecha, fecha_llegada, estado) {
        this.id_pedido = id_pedido;
        this.id_usuario = id_usuario;
        this.fecha = fecha;
        this.fecha_llegada = fecha_llegada;
        this.estado = estado;
    }
}

module.exports = VOPedido