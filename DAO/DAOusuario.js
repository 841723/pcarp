const VOusuario=require ('../VO/VOusuario')

class DAOusuario {
    
    constructor(database) {
        this.database = database;
    }

    async obtenerTodos() {
        try {
            // Realiza la consulta a la base de datos para obtener el usuario con el ID proporcionado
            const result = await this.database.query('SELECT * FROM usuario');
            
            if (result.rows.length === 0) {
                return null;
            }
    
            const VOusuarios = result.rows.map((usuario) => new VOusuario(usuario.id_usuario, usuario.nombre,usuario.apellidos,usuario.contrasena,usuario.mail,usuario.direccion));
            return VOusuarios;

        } catch (error) {
            throw error;
        }
        // Implementación para obtener todos los usuarios
    }

    async obtenerPorId(id) {
        // Implementación para obtener un usuario por su ID desde la base de datos
        try {
            // Realiza la consulta a la base de datos para obtener el usuario con el ID proporcionado
            const result = await this.database.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
    
            if (result.rows.length === 0) {
                return null;
            }
            const usuario = result.rows[0];
            const res = new VOusuario(usuario.id_usuario, usuario.nombre,usuario.apellidos,usuario.contrasena,usuario.mail,usuario.direccion);
            return [res];

        } catch (error) {
            throw error;
        }
    }
    async obtenerPorNombre(nombre) {
        // Implementación para obtener un usuario por su ID desde la base de datos
        try {
            // Realiza la consulta a la base de datos para obtener el usuario con el ID proporcionado
            const result = await this.database.query('SELECT * FROM usuario WHERE nombre = $1', [nombre]);
    
            if (result.rows.length === 0) {
                return null;
            }
            const usuario = result.rows[0];
            const res = new VOusuario(usuario.id_usuario, usuario.nombre,usuario.apellidos,usuario.contrasena,usuario.mail,usuario.direccion);
            return [res];

        } catch (error) {
            throw error;
        }
    }
  
    async insertar(usuario) {
        try {
            const query = 'INSERT INTO usuario (nombre, apellidos, contraseña, direccion, mail VALUES ($1, $2, $3, $4, $5)';
            const values = [usuario.nombre, usuario.apellidos, usuario.contrasena, usuario.direccion, usuario.mail];
            await this.database.query(query, values);

        } catch (error) {
            throw error;
        }
    }

    async actualizar(usuario) {
        try {
            const query = 'UPDATE usuarios SET nombre = $1, apellidos = $2, contrasena = $3, direccion = $4, email = $5 WHERE id_usuario = $6';
            const values = [usuario.nombre, usuario.apellidos, usuario.contrasena, usuario.direccion, usuario.mail, usuario.id_usuario];
            await this.database.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const query = 'DELETE FROM usuario WHERE id_usuario = $1';
            const value= [i];
            await this.database.query(query, value);
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = DAOusuario