class VOUsuario {
    constructor(id_usuario,nombre,apellidos,contrasena,mail,direccion,es_admin) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.contrasena = contrasena;
        this.direccion = direccion;
        this.mail = mail;
        this.es_admin = es_admin;
    }
}

module.exports = VOUsuario