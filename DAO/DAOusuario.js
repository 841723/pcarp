const VOusuario=require ('../VO/VOusuario')

class DAOusuario {
    
    constructor(database) {
        this.database = database;
    }

    async obtenerTodos() {
        try {
            // Realiza la consulta a la base de datos para obtener el usuario con el ID proporcionado
            const result = await this.database.query('SELECT * FROM usuarios');
            
            if (result.rows.length === 0) {
                return null;
            }
    
            const VOusuarios = result.rows.map((usuario) => new VOusuario(usuario.id_usuario, usuario.nombre,usuario.apellidos,usuario.contraseña,
                 usuario.direccion,usuario.email));

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
            const result = await this.database.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
    
            if (result.rows.length === 0) {
                return null;
            }
    
            const usuario = result.rows[0];
            const VOusuario = new VOusuario(usuario.id_usuario, usuario.nombre,usuario.apellidos,usuario.contraseña,
                usuario.direccion,usuario.email);

            return [VOusuario];

        } catch (error) {
            throw error;
        }
    }
  
    async insertar(usuario) {
        // Implementación para insertar un usuario en la base de datos
    }

    async actualizar(usuario) {
        // Implementación para actualizar un usuario en la base de datos
    }

    async eliminar(id) {
        // Implementación para eliminar un usuario de la base de datos por su ID
    }
    
}

module.exports = DAOusuario