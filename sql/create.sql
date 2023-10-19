/*
 * File: 	crearTablas.sql
 * Authors: Diego Raul Roldan Uruena,	841723
 * 			Pablo Moreno Munoz, 841972
 * 			Abel Romeo Lancina,	846088
 * Date: abril 2023
 * Coms: Sentencias que crean las tablas de la base de datos de obras cinematográficas
*/

CREATE TABLE Usuario (
	id_usuario 		SERIAL PRIMARY KEY,
	nombre  		VARCHAR (20) NOT NULL,
	apellidos  		VARCHAR (30) NOT NULL,
	contrasena 		VARCHAR (20) NOT NULL,
	direccion 		VARCHAR (30),
    mail            VARCHAR (50) NOT NULL UNIQUE
);

CREATE TABLE Pedido (
  	id_pedido		SERIAL PRIMARY KEY,
	fecha   		TIMESTAMP NOT NULL DEFAULT current_timestamp,
	fecha_llegada   DATE CHECK (fecha_llegada>DATE(fecha)),
  	estado       	VARCHAR (9) NOT NULL DEFAULT 'pendiente' CHECK (estado = 'pendiente' OR estado = 'enviado' OR estado = 'recibido')
);

CREATE TABLE Producto (
  	id_producto     SERIAL PRIMARY KEY,
	nombre 	        VARCHAR (20) NOT NULL,
	precio	    	REAL NOT NULL CHECK (precio > 0),
  	descripcion 	VARCHAR (70),
	stock		    INT NOT NULL
);

CREATE TABLE Resena (
	id_resena  		    SERIAL PRIMARY KEY,
    id_usuario          INT REFERENCES Usuario (id_usuario),
    id_producto         INT REFERENCES Producto (id_producto),
	contenido 		    VARCHAR (200),
	estrellas	        INT NOT NULL CHECK (estrellas >= 0 AND estrellas <= 5)
);

CREATE TABLE Pedido_Usuario (
  	id_usuario 		INT REFERENCES Usuario (id_usuario),
    id_pedido		INT REFERENCES Pedido (id_pedido),
	PRIMARY KEY (id_usuario, id_pedido)
);

CREATE TABLE Contenido_Pedidos (
	id_pedido		INT REFERENCES Pedido (id_pedido),
	id_producto		INT REFERENCES Producto (id_producto),
    cantidad        INT NOT NULL,
	PRIMARY KEY (id_pedido, id_producto)
);

CREATE TABLE Incompatibilidades (
	id_producto_1		INT REFERENCES Producto (id_producto),
	id_producto_2		INT REFERENCES Producto (id_producto),
	CHECK (id_producto_1 != id_producto_2),
	PRIMARY KEY (id_producto_1, id_producto_2)
);


DELETE FROM Incompatibilidades;
DELETE FROM Contenido_Pedidos;
DELETE FROM Pedido_Usuario;


DELETE FROM Resena;
ALTER SEQUENCE Resena_id_resena_seq RESTART WITH 1;

DELETE FROM Producto;
ALTER SEQUENCE Producto_id_producto_seq RESTART WITH 1;

DELETE FROM Pedido;
ALTER SEQUENCE Pedido_id_pedido_seq RESTART WITH 1;

DELETE FROM Usuario;
ALTER SEQUENCE Usuario_id_usuario_seq RESTART WITH 1;