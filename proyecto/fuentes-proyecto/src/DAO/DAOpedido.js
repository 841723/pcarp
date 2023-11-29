const { query } = require('express');
const VOpedido = require('../VO/VOPedido');

class DAOpedido {
    constructor(database) {
        this.database = database;
    }

    async obtenerTodos() {
        try {
            const result = await this.database.query('SELECT * FROM pedido');

            if (result.rows.length === 0) {
                return null;
            }

            const res = result.rows.map((pedido) => new VOpedido(pedido.id_pedido, pedido.id_usuario, pedido.fecha, pedido.fecha_llegada, pedido.estado));

            return res;
        } catch (error) {
            throw error;
        }
    }

    async obtenerTodosDatos(detalle) {
        try {
            let consult = 'SELECT * FROM pedido p INNER JOIN usuario u ON p.id_usuario = u.id_usuario INNER JOIN contenido_pedido c ON p.id_pedido = c.id_pedido';
            if (detalle == 'true') {
                consult += ' INNER JOIN producto d ON c.id_producto = d.id_producto';
            }
            const result = await this.database.query(consult);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows;
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
            const res = new VOpedido(pedido.id_pedido, pedido.id_usuario, pedido.fecha, pedido.fecha_llegada, pedido.estado);

            return [res];
        } catch (error) {
            throw error;
        }
    }
    async insertar(id_usuario, fecha_llegada, estado) {
        try {
            const query = 'INSERT INTO pedido (id_usuario, fecha_llegada, estado) VALUES ($1, $2, $3) RETURNING id_pedido';
            const values = [id_usuario, fecha_llegada, estado];
            const result = await this.database.query(query, values);
            return result.rows[0].id_pedido;
        } catch (error) {
            throw error;
        }
    }

    async actualizar(id_usuario, fecha, fechaLlegada, estado) {
        try {
            const query = 'UPDATE pedido SET id_usuario = $1, fecha = $2, fecha_llegada = $3, estado = $4 WHERE id_pedido = $5';
            const values = [id_usuario, fecha, fechaLlegada, estado, idPedido];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    async actualizarEstado(id_pedido, estado) {
        try {
            const query = 'UPDATE pedido SET estado = $1 WHERE id_pedido = $2';
            const values = [estado, id_pedido];
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