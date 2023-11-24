const VOcontenido_pedido = require('../VO/VOContenidoPedidos');

class DAOcont_pedido {
    constructor(database) {
        this.database = database;
    }

    async obtenerTodos() {
        try {
            const result = await this.database.query('SELECT * FROM contenido_pedido');

            if (result.rows.length === 0) {
                return null;
            }

            const res = result.rows.map((contenido_pedido) => new VOcontenido_pedido(contenido_pedido.id_contenido_pedido, contenido_pedido.fecha, contenido_pedido.fecha_llegada, contenido_pedido.estado));

            return res;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPorId(id) {
        try {
            const result = await this.database.query('SELECT * FROM contenido_pedido WHERE id_pedido = $1', [id]);

            if (result.rows.length === 0) {
                return null;
            }
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    async insertar(id_pedido, id_producto, cantidad) {
        try {
            const query = 'INSERT INTO contenido_pedido (id_pedido, id_producto, cantidad) VALUES ($1, $2, $3)';
            const values = [id_pedido, id_producto, cantidad];
            const result = await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const query = 'DELETE FROM contenido_pedido WHERE id_pedido = $1';
            const values = [id];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOcontenido_pedido;