const VOresena = require('../VO/VOResena');

class DAOresena {
    constructor(database) {
        this.database = database;
    }

    async obtenerTodos() {
        try {
            const result = await this.database.query('SELECT * FROM resena');

            if (result.rows.length === 0) {
                return null;
            }

            const res = result.rows.map((resena) => new VOresena(resena.id_resena, resena.id_usuario, resena.id_producto, resena.contenido, resena.estrellas));

            return res;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPorId(id) {
        try {
            const result = await this.database.query('SELECT * FROM resena WHERE id_resena = $1', [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const resena = result.rows[0];
            const res = new VOresena(resena.id_resena, resena.id_usuario, resena.id_producto, resena.contenido, resena.estrellas);

            return [res];
        } catch (error) {
            throw error;
        }
    }
    async insertar(resena) {
        try {
            const query = 'INSERT INTO resena (id_usuario, id_producto, contenido, estrellas) VALUES ($1, $2, $3, $4) RETURNING id_resena';
            const values = [resena.id_usuario, resena.id_producto, resena.contenido, resena.estrellas];
            const result = await this.database.query(query, values);
            return result.rows[0].id_resena;
        } catch (error) {
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const query = 'DELETE FROM resena WHERE id_resena = $1';
            const values = [id];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DAOResena;