const VOusuario=require ('../VO/VOUsuario')

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
    
            const res = result.rows.map((result) => new VOusuario(usuario.id_usuario, usuario.nombre,usuario.apellidos,usuario.contrasena,usuario.mail,usuario.direccion));
            return res;

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
  
    async insertar_mail_pass(mail,pass) {
        try {
            await this.database.query("INSERT INTO usuario (nombre, apellidos, contrasena, direccion, mail,es_admin) VALUES ('', '', $2, '', $1,false)", [mail,pass]);
        } catch (error) {
            throw error;
        }
    }
    

    async actualizar(mail,nombre,apellidos,direccion,pass) {
        // Implementación para actualizar un usuario en la base de datos
        try {
            const query = 'UPDATE usuario SET nombre = $2, apellidos = $3, direccion = $4, contrasena = $5 WHERE mail = $1 RETURNING *';
            const values = [mail, nombre, apellidos, direccion, pass];
           const result= await this.database.query(query, values);
        if (result.rows.length === 0) {
            console.log("no se ha actualizado");
            return null;
        }
        return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async actualizar_pass(mail,pass) {
        try{
            const query = 'UPDATE usuario SET contrasena = $2 WHERE mail = $1';
            const values = [mail, pass];
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

    async obtenerPorMail(mail) {
        try {
            // Realiza la consulta a la base de datos para obtener el usuario con el ID proporcionado
            const result = await this.database.query('SELECT * FROM usuario WHERE mail = $1', [mail]);
            if (result.rows.length === 0) {
                return null;
            }
            const usuario = result.rows[0];
            return usuario;
            const res = new VOusuario(usuario.id_usuario, usuario.nombre,usuario.apellidos,usuario.contrasena,usuario.mail,usuario.direccion);
            return res;

        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = DAOusuario