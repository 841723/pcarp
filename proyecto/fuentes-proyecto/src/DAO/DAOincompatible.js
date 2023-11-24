const VOPedido = require('../VO/VOPedido');

class DAOPedido {
    constructor(database) {
        this.database = database;
    }

    async obtenerTodos() {
        try {
            const result = await this.database.query('SELECT * FROM pedido');

            if (result.rows.length === 0) {
                return null;
            }

            const VOPedidos = result.rows.map((pedido) => new VOPedido(pedido.id_pedido, pedido.fecha, pedido.fecha_llegada, pedido.estado));

            return VOPedidos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPorId(id) {
        try {
            const result = await this.database.query('SELECT * FROM pedido WHERE id_pedido = $1', [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const pedido = result.rows[0];
            const res = new VOPedido(pedido.id_pedido, pedido.fecha, pedido.fecha_llegada, pedido.estado);

            return [res];
        } catch (error) {
            throw error;
        }
    }
    async insertar(pedido) {
        try {
            const query = 'INSERT INTO pedido (fecha, fecha_llegada, estado) VALUES ($1, $2, $3) RETURNING id_pedido';
            const values = [pedido.fecha, pedido.fechaLlegada, pedido.estado];
            const result = await this.database.query(query, values);
            return result.rows[0].id_pedido;
        } catch (error) {
            throw error;
        }
    }

    async actualizar(pedido) {
        try {
            const query = 'UPDATE pedido SET fecha = $1, fecha_llegada = $2, estado = $3 WHERE id_pedido = $4';
            const values = [pedido.fecha, pedido.fechaLlegada, pedido.estado, pedido.idPedido];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const query = 'DELETE FROM pedido WHERE id_pedido = $1';
            const values = [id];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOpedido;