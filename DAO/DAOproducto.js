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

            // this.id_producto = id_producto;
            // this.marca = marca;
            // this.modelo = modelo;
            // this.precio = precio;
            // this.descripcion = descripcion;
            // this.stock = stock;
            // this.ventas = 0;
            // this.tipo = tipo;
            const res = result.rows.map((producto) => new VOproducto(producto.id_producto, producto.marca, producto.modelo, producto.precio, producto.descripcion, producto.stock, producto.ventas, producto.tipo));

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
            const res = new VOproducto(producto.id_producto, producto.marca, producto.modelo, producto.precio, producto.descripcion, producto.stock, producto.ventas, producto.tipo);

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

    async obtenerPorTipo(tipo,cantidad,order,precio_max,precio_min,brands_names) {
        try {
            var order_query = "";
            switch (order) {
                case "precio_asc":
                    order_query = 'ORDER BY precio ASC'
                    break
                case "precio_desc":
                    order_query = 'ORDER BY precio DESC'
                    break;
                case "ventas":
                    order_query = 'ORDER BY ventas DESC'
                    break;
                default:
                    order_query = 'ORDER BY RANDOM()'
                    break;
            }

            var precio_query = 'precio>'+precio_min+' AND precio<'+precio_max;

            if (brands_names.length != 0) {
                brands_names = brands_names.split(',').join("','");
                brands_names = brands_names.replace(/INTEL/g, "Intel");
                brands_names = brands_names.replace(/CORSAIR/g, "Corsair");
                brands_names = brands_names.replace(/CRUCIAL/g, "Crucial");
                var brands_query = 'marca IN (\''+brands_names+'\')';
            }
            else {
                var brands_query = 'marca IS NOT NULL';
            }

            tipo = this.transform(tipo)

            if (tipo == "none" ) {
                // console.log('SELECT * FROM producto WHERE ' + precio_query + ' AND ' + brands_query + ' ' + order_query + ' LIMIT '+ cantidad)
                const query = 'SELECT * FROM producto WHERE ' + precio_query + ' AND ' + brands_query + ' ' + order_query + ' LIMIT $1';
                const values = [cantidad];
                const result = await this.database.query(query, values);

                const res = result.rows.map((producto) => new VOproducto(producto.id_producto, 
                    producto.marca, 
                    producto.modelo, 
                    producto.precio,
                    producto.descuento, 
                    producto.descripcion,
                    producto.ventas,
                    producto.stock, 
                    producto.tipo));                
                return res;
    
            }
            else { 

                console.log('SELECT * FROM producto WHERE tipo=\''+tipo+'\' AND '+ precio_query + ' ' +brands_query + ' ' + order_query + ' LIMIT '+ cantidad)
                const query = 'SELECT * FROM producto WHERE (tipo= $1) AND '+ precio_query + ' AND ' + brands_query + ' ' + order_query + ' LIMIT $2';
                const values = [tipo,cantidad];
                const result = await this.database.query(query, values);
                const res = result.rows.map((producto) => new VOproducto(producto.id_producto, 
                                                                         producto.marca, 
                                                                         producto.modelo, 
                                                                         producto.precio,
                                                                         producto.descuento, 
                                                                         producto.descripcion,
                                                                         producto.ventas,
                                                                         producto.stock, 
                                                                         producto.tipo));
                return res;
            }
        } catch (error) {
            throw error;
        }
    }

    transform(tipo) {
        switch (tipo) {
        case "Procesadores":
            return "procesador"

        case "Placas Base":
            return "placa_base"

        case "Tarjetas Gráficas":
            return "grafica"

        case "Memorias RAM":
            return "ram"
        
        case "Almacenamiento":
            return "disco_duro"

        case "Fuentes Alimentación":
            return "fuente_alimentacion"
        
        case "Ventiladores":
            return "ventilador" 
        
        case "Cajas":
            return "caja_torre"
        
        default:
            return "none"
        }
    }
}
module.exports = DAOproducto;