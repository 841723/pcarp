const VOproducto = require('../VO/VOProducto');

class DAOproducto {
    constructor(database) {
        this.database = database;
    }

    async obtenerTodos() {
        try {
            const result = await this.database.query('SELECT * FROM producto ORDER BY id_producto ASC');

            if (result.rows.length === 0) {
                return null;
            }
            //id_producto, marca, modelo, precio, descuento, descripcion, ventas,stock, tipo
            const res = result.rows.map((producto) => new VOproducto(producto.id_producto, 
                                                                     producto.marca, 
                                                                     producto.modelo, 
                                                                     producto.precio,
                                                                     producto.descuento, 
                                                                     producto.descripcion,
                                                                     producto.ventas,
                                                                     producto.stock, 
                                                                     producto.tipo))
            
            return res;
        } catch (error) {
            throw error;
        }
    }

    async obtenerTodosAll(id_producto) {
        try {
            if (id_producto === null || id_producto === ""  || id_producto === undefined) {
                
                let tipos = ["procesador","placa_base","grafica","ram","disco_duro","fuente_alimentacion","ventilador","caja_torre"]
                let  querys = [] 
                for (let i = 0; i < tipos.length; i++) 
                    querys.push("SELECT * FROM producto p INNER JOIN " + tipos[i] +" AS t ON p.id_producto = t.id_producto ORDER BY p.id_producto ASC")

                let result = []
                
                for (let i = 0; i < querys.length; i++) {
                    const res = await this.database.query(querys[i]);
                    result.push(res.rows)
                }
                
                return result;
            }
            else {
                const query1 = 'SELECT tipo FROM producto WHERE id_producto = $1'
                const values1 = [id_producto];
                const result1 = await this.database.query(query1, values1);
                if (result1.rows.length === 0) {
                    return null;
                }
                let tipo = result1.rows[0].tipo

                const query2 = 'SELECT * FROM producto p INNER JOIN ' + tipo +' AS t ON p.id_producto = t.id_producto WHERE p.id_producto = ' + id_producto
                const result2 = await this.database.query(query2);
                return result2.rows;
            }
        } catch (error) {
            throw error;
        }
    }

    async obtenerPorTipo(tipo) {
        try {
            tipo = this.transform(tipo)
            let result = null
            if (tipo == "none") {
                result = await this.database.query('SELECT * FROM producto');
            }
            else {
                result = await this.database.query('SELECT * FROM producto WHERE tipo = $1', [tipo]);
            }
            
            if (result.rows.length === 0) {
                return null;
            }

            const res = result.rows.map((producto) => new VOproducto(producto.id_producto, 
                producto.marca, 
                producto.modelo, 
                producto.precio,
                producto.descuento, 
                producto.descripcion,
                producto.ventas,
                producto.stock, 
                producto.tipo))
            return res;
        } catch (error) {
            throw error;
        }
    }
    async obtenerPorId(id) {
        try {
            const query = 'SELECT * FROM producto WHERE id_producto = $1';
            const values = [id];
            const result = await this.database.query(query, values);

            if (result.rows.length === 0) {
                return null;
            }

            const producto = result.rows[0];
            const res =new VOproducto(producto.id_producto, 
                producto.marca, 
                producto.modelo, 
                producto.precio,
                producto.descuento, 
                producto.descripcion,
                producto.ventas,
                producto.stock, 
                producto.tipo)

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

    async crearList(keys,values,keys_extra,values_extra) {
        try {
            let tipo = ""
            let query = 'INSERT INTO producto ('//(marca, modelo, precio, descuento, descripcion, ventas, stock, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ';
            for (let i = 0; i < keys.length; i++) {
                query += keys[i] + ', ';
            }
            query = query.slice(0, -2);
            query += ') VALUES (nextval(\'producto_id_producto_seq\'), ';
            for (let i = 1; i < keys.length; i++) {
                query += '$' + (i) + ', ';
                if (keys[i] == 'tipo')
                    tipo = values[i]
            }
            query = query.slice(0, -2);
            query += ') RETURNING id_producto';
            values.shift()
            console.log(query)
            console.log(values)
            const result = await this.database.query(query, values);

            let result_extra = null
            if (result != null) {
                let query_extra = 'INSERT INTO '+ tipo +' (id_producto, '//(marca, modelo, precio, descuento, descripcion, ventas, stock, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ';
                console.log(keys_extra)
                for (let i = 0; i < keys_extra.length; i++) {
                    query_extra += keys_extra[i] + ', ';
                }
                query_extra = query_extra.slice(0, -2);
                query_extra += ') VALUES ($1, ';
                for (let i = 0; i < keys_extra.length; i++) {
                    query_extra += '$' + (i+2) + ', ';
                }
                query_extra = query_extra.slice(0, -2);
                query_extra += ') RETURNING id_producto';
                console.log(query_extra)
                values_extra.unshift(result.rows[0].id_producto)
                console.log(values_extra)

                const result_extra = await this.database.query(query_extra, values_extra);
            }

            return result_extra != null ? true:false
        }
        catch (error) {
            throw error;
        }
    }

    async actualizarList(keys,values,keys_extra,values_extra) {
        try {
            let query = 'UPDATE producto SET ';
            for (let i = 1; i < keys.length; i++) {
                query += keys[i] + ' = $' + (i+1) + ', ';
            }
            query = query.slice(0, -2);
            query += ' WHERE id_producto = $' + (1) + ' RETURNING id_producto';
            // console.log(query)
            // console.log(values)
            const result = await this.database.query(query, values);
            let result_extra = null
            if (result != null) {
                let query_extra = 'UPDATE ' + values[8] + ' SET ';
                for (let i = 0; i < keys_extra.length; i++) {
                    query_extra += keys_extra[i] + ' = $' + (i+1) + ', ';
                }
                query_extra = query_extra.slice(0, -2);
                query_extra += ' WHERE id_producto = $' + (keys_extra.length+1) + ' RETURNING id_producto';
                values_extra.push(values[0])

                const result_extra = await this.database.query(query_extra, values_extra);
            }
            // return result_extra != null ? true:false
            return true
        }
        catch (error) {
            throw error;
        }
    }

    async actualizarStock(id, stock) {
        try {
            for (let i = 0; i < id.length; i++) {
                const query = 'UPDATE producto SET stock = (stock-$1), ventas = (ventas+$2) WHERE id_producto = $3;';
                const values = [stock[i],stock[i], id[i]];
                await this.database.query(query, values);
            }
        } catch (error) {
            throw error;
        }
    }
    // async actualizarStockProduct(id, ventas) {
    //     try {
    //         const query = 'UPDATE producto SET stock = (stock-$1), (ventas = ventas+$1) WHERE id_producto = $2';
    //         const values = [ventas, id];
    //         await this.database.query(query, values);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

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

    async obtener(tipo,cantidad,order,precio_max,precio_min,brands_names) {
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

                // console.log('SELECT * FROM producto WHERE tipo=\''+tipo+'\' AND '+ precio_query + ' ' +brands_query + ' ' + order_query + ' LIMIT '+ cantidad)
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