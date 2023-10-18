/*
 * File: 	crearTablas.sql
 * Authors: Diego Raul Cornudo Urueña,	841723
 * 			Pablo Moreno Muñoz, 841972
 * 			Abel Romeo Lancina,	846088
 * Date: abril 2023
 * Coms: Sentencias que crean las tablas de la base de datos de obras cinematográficas
*/

CREATE TABLE Usuario (
	nombre  		VARCHAR (20),
	contraseña 		VARCHAR (25),
    mail            VARCHAR (50),
	PRIMARY KEY (mail)
);

CREATE TABLE UserPedido (
  	user_id 			VARCHAR(25),
    id    			VARCHAR(20),
	PRIMARY KEY (user_id, id),
	FOREIGN KEY (user_id) REFERENCES Usuario (mail),
    FOREIGN KEY (id) REFERENCES Pedido (id),
    
);

CREATE TABLE ProdPedido (
	id 	            VARCHAR (20),
	producto		VARCHAR (20),
    cantidad        NUMBER,
	PRIMARY KEY (id, producto),
	FOREIGN KEY (producto) REFERENCES Producto (id),
	FOREIGN KEY (id) REFERENCES Pedido (id)
);

CREATE TABLE Pedido (
  	id 	            VARCHAR (20),
	fecha   		Date,
  	estado       	VARCHAR (20) CHECK (estado = 'pendiente' OR estado = 'enviado' OR estado = 'recibido'),
	PRIMARY KEY (id)
);

CREATE TABLE Producto (
	nombre 	        VARCHAR (20),
	precio	    	NUMBER,
  	descripcion 	VARCHAR (70),
	stock		    NUMBER,
  	id	            VARCHAR (15),
    PRIMARY KEY (id),
)
;

CREATE TABLE Reseña (
	id_reseña  		    VARCHAR (25),
	contenido 		    VARCHAR (50),
	estrellas	        NUMBER CHECK (estrellas >= 0 AND estrellas <= 5),
    user_id             VARCHAR (50),
	FOREIGN KEY (user_id) REFERENCES Usuario (mail),
	PRIMARY KEY (id_reseña)
);

CREATE TABLE ProdReseña (
	id_reseña  		    VARCHAR (25),
	producto 		    VARCHAR (20),
	
	FOREIGN KEY (id_reseña) REFERENCES Reseña (id_reseña),
	PRIMARY KEY (id_reseña)
);

CREATE TABLE Persona (
    nombre 			   	VARCHAR(69),
    sexo 			   	CHAR (1) CHECK (sexo = 'f' OR sexo = 'm'),
	PRIMARY KEY (nombre)
);

CREATE TABLE Incompatible (
	id_1 	   			VARCHAR (20),
	id_2 	   			VARCHAR (20),
	FOREIGN KEY (id_1, id_2) REFERENCES Producto (id),
	PRIMARY KEY (id_1, id_2)
);