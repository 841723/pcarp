class VOPedido {
    constructor(idPedido, fecha, fechaLlegada, estado) {
        this.idPedido = idPedido;
        this.fecha = fecha;
        this.fechaLlegada = fechaLlegada;
        this.estado = estado;
    }
}

module.exports = VOPedido