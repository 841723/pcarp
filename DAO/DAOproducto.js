const VOproducto = require('../VO/VOProducto');

class DAOproducto {
    constructor(database) {
        this.database = database;
    }

    async obtenerTodos() {
        try {
            const result = await this.database.query('SELECT * FROM producto');

            if (result.rows.length === 0) {
                return null;
            }

            const res = result.rows.map((producto) => new VOproducto(producto.id_producto, producto.nombre, producto.precio, producto.descripcion, producto.stock));

            return res;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPorId(id) {
        try {
            const result = await this.database.query('SELECT * FROM producto WHERE id_producto = $1', [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const producto = result.rows[0];
            const res = new VOproducto(producto.id_producto, producto.nombre, producto.precio, producto.descripcion, producto.stock);

            return res;
        } catch (error) {
            throw error;
        }
    }
    async insertar(producto) {
        try {
            const query = 'INSERT INTO producto (nombre, precio, descripcion, stock) VALUES ($1, $2, $3, $4) RETURNING id_producto';
            const values = [producto.nombre, producto.precio, producto.descripcion, producto.stock];
            const result = await this.database.query(query, values);
            return result.rows[0].id_producto;
        } catch (error) {
            throw error;
        }
    }

    async actualizar(producto) {
        try {
            const query = 'UPDATE producto SET nombre = $1, precio = $2, descripcion = $3, stock = $4 WHERE id_producto = $5';
            const values = [producto.nombre, producto.precio, producto.descripcion, producto.stock];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const query = 'DELETE FROM producto WHERE id_producto = $1';
            const values = [id];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    async obtenerMasVendidos(cantidad) {
        try {
            const query = 'SELECT * FROM producto ORDER BY ventas DESC LIMIT $1';
            const values = [cantidad];
            const result = await this.database.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async obtenerRandom(cantidad) {
        try {
            const query = 'SELECT * FROM producto ORDER BY RANDOM() LIMIT $1';
            const values = [cantidad];
            const result = await this.database.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = DAOproducto;