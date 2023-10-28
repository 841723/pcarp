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
    mail            VARCHAR (50) NOT NULL UNIQUE,
	es_admin		BOOLEAN NOT NULL
);

CREATE TABLE Pedido (
  	id_pedido		SERIAL PRIMARY KEY,
	id_usuario		INT REFERENCES Usuario (id_usuario),
	fecha   		TIMESTAMP NOT NULL DEFAULT current_timestamp,
	fecha_llegada   DATE CHECK (fecha_llegada>DATE(fecha)),
  	estado       	VARCHAR (9) NOT NULL DEFAULT 'pendiente' CHECK (estado = 'procesando' OR estado = 'enviado' OR estado = 'entregado')
);

CREATE TABLE Producto (
  	id_producto     SERIAL PRIMARY KEY,
	marca 			VARCHAR(10) NOT NULL,
	modelo			VARCHAR(25) UNIQUE NOT NULL,
	precio	    	REAL NOT NULL CHECK (precio > 0),
	descuento    	REAL CHECK (descuento > 0 && descuento < 100), -- en porcentaje
  	descripcion 	VARCHAR (70),
	stock		    INT NOT NULL,
	ventas			INT NOT NULL DEFAULT 0 CHECK (ventas >= 0),
	tipo 			VARCHAR CHECK (tipo=='placa_base' ||
								   tipo=='procesador' ||
								   tipo=='disco_duro' ||
								   tipo=='grafica' ||
								   tipo=='ram' ||
								   tipo=='ventilador' ||
								   tipo=='caja_torre' ||
								   tipo=='fuente_alimentacion')
);

CREATE TABLE placa_base (
	id_producto     INT REFERENCES Producto (id_producto),
	
	chipset			VARCHAR(15) NOT NULL,
	tiene_m2		INT NOT NULL
);

CREATE TABLE procesador (
	id_producto     INT REFERENCES Producto (id_producto),
	
	familia			VARCHAR(15) NOT NULL
);

CREATE TABLE disco_duro (
  	id_producto     INT REFERENCES Producto (id_producto),

	tamano			INT NOT NULL,-- en GB
	tecnologia		VARCHAR(3) NOT NULL (CHECK tecnologia='HDD' OR tecnologia='SSD' OR tecnologia='M2')
);

CREATE TABLE grafica (
	id_producto     INT REFERENCES Producto (id_producto),

	tipo 			VARCHAR(6)  NULL (CHECK tipo='Nvidia' OR tipo='AMD' OR tipo='intel'),
	memoria			INT NOT NULL -- en GB
);

CREATE TABLE ram (
	id_producto     INT REFERENCES Producto (id_producto),
	
	tipo			VARCHAR(4)  NOT NULL (CHECK tipo='DDR5' OR tipo='DDR4' OR tipo='DDR3'),
	cantidad		INT NOT NULL, -- cantidad de ranuras que vienen
	almacenamiento  INT NOT NULL -- GB en cada ranura  
);

CREATE TABLE ventilador (
    ID INT REFERENCES Producto (id_producto),
    tipoDisipador VARCHAR(20),
    nivelRuidoDBA DECIMAL(4, 2)
);

CREATE TABLE caja_torre (
	id_producto     INT REFERENCES Producto (id_producto),
	tipo_placa VARCHAR(20)
);

CREATE TABLE fuente_alimentacion (
	id_producto     INT REFERENCES Producto (id_producto),

	potencia		INT NOT NULL -- en W
);



CREATE TABLE Resena (
	id_resena  		    SERIAL PRIMARY KEY,
    id_usuario          INT REFERENCES Usuario (id_usuario),
    id_producto         INT REFERENCES Producto (id_producto),
	contenido 		    VARCHAR (200),
	estrellas	        INT NOT NULL CHECK (estrellas >= 0 AND estrellas <= 5)
);

CREATE TABLE Contenido_Pedido (
	id_pedido		INT REFERENCES Pedido (id_pedido),
	id_producto		INT REFERENCES Producto (id_producto),
    cantidad        INT NOT NULL,
	PRIMARY KEY (id_pedido, id_producto)
);

CREATE TABLE Incompatibilidad (
	id_producto_1		INT REFERENCES Producto (id_producto),
	id_producto_2		INT REFERENCES Producto (id_producto),
	CHECK (id_producto_1 != id_producto_2),
	PRIMARY KEY (id_producto_1, id_producto_2)
);


DELETE FROM Incompatibilidad;
DELETE FROM Contenido_Pedido;
DELETE FROM Pedido_Usuario;


DELETE FROM Resena;
ALTER SEQUENCE Resena_id_resena_seq RESTART WITH 1;

DELETE FROM Producto;
ALTER SEQUENCE Producto_id_producto_seq RESTART WITH 1;

DELETE FROM Pedido;
ALTER SEQUENCE Pedido_id_pedido_seq RESTART WITH 1;

DELETE FROM Usuario;
ALTER SEQUENCE Usuario_id_usuario_seq RESTART WITH 1;