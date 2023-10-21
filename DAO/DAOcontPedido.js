const VOcontenido_pedidos = require('../VO/VOcontenido_pedidos');

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

            const VOcontenido_pedido = result.rows.map((contenido_pedido) => new VOcontenido_pedido(contenido_pedido.id_contenido_pedido, contenido_pedido.fecha, contenido_pedido.fecha_llegada, contenido_pedido.estado));

            return VOcontenido_pedidos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPorId(id) {
        try {
            const result = await this.database.query('SELECT * FROM contenido_pedido WHERE id_contenido_pedido = $1', [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const contenido_pedido = result.rows[0];
            const res = new VOcontenido_pedido(contenido_pedido.id_contenido_pedido, contenido_pedido.fecha, contenido_pedido.fecha_llegada, contenido_pedido.estado);

            return [res];
        } catch (error) {
            throw error;
        }
    }
    async insertar(contenido_pedido) {
        try {
            const query = 'INSERT INTO contenido_pedido (fecha, fecha_llegada, estado) VALUES ($1, $2, $3) RETURNING id_contenido_pedido';
            const values = [contenido_pedido.fecha, contenido_pedido.fechaLlegada, contenido_pedido.estado];
            const result = await this.database.query(query, values);
            return result.rows[0].id_contenido_pedido;
        } catch (error) {
            throw error;
        }
    }

    async actualizar(contenido_pedido) {
        try {
            const query = 'UPDATE contenido_pedido SET fecha = $1, fecha_llegada = $2, estado = $3 WHERE id_contenido_pedido = $4';
            const values = [contenido_pedido.fecha, contenido_pedido.fechaLlegada, contenido_pedido.estado, contenido_pedido.idcontenido_pedido];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const query = 'DELETE FROM contenido_pedido WHERE id_contenido_pedido = $1';
            const values = [id];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOcontenido_pedido;