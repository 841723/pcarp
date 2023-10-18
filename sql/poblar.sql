
INSERT INTO Usuario (nombre,contrasena,mail) VALUES ('diego','roldan','raul@gmail.com');
INSERT INTO Usuario (nombre,contrasena,mail) VALUES ('abel','romeo','romeo@unizar.com');
SELECT * FROM Usuario;


DELETE FROM Pedido;
INSERT INTO Pedido (fecha,estado) VALUES (current_timestamp,'pendiente');
INSERT INTO Pedido (fecha,estado) VALUES (current_timestamp,'enviado');
SELECT * FROM Pedido;


DELETE FROM Producto;
ALTER SEQUENCE Producto_id_producto_seq RESTART WITH 1;
INSERT INTO Producto (nombre,precio,descripcion,stock) VALUES ('producto1',23.5,'',50);
INSERT INTO Producto (nombre,precio,descripcion,stock) VALUES ('producto2',3.12,'',163);
SELECT * FROM Producto;


DELETE FROM Resena;
ALTER SEQUENCE Resena_id_resena_seq RESTART WITH 1;
INSERT INTO Resena (id_usuario,contenido,estrellas) VALUES (1,'muy malo',1);
INSERT INTO Resena (id_usuario,contenido,estrellas) VALUES (2,'oleee',5);
INSERT INTO Resena (id_usuario,contenido,estrellas) VALUES (2,'bueno regulinchi',3);
SELECT * FROM Resena;


INSERT INTO Pedido_Usuario (id_usuario,id_pedido) VALUES (1,1);
INSERT INTO Pedido_Usuario (id_usuario,id_pedido) VALUES (2,2);
SELECT * FROM Pedido_Usuario;


INSERT INTO Contenido_Pedidos (id_pedido,id_producto,cantidad) VALUES (1,1,2);
INSERT INTO Contenido_Pedidos (id_pedido,id_producto,cantidad) VALUES (1,2,9);
INSERT INTO Contenido_Pedidos (id_pedido,id_producto,cantidad) VALUES (2,2,35);
SELECT * FROM Contenido_Pedidos;


INSERT INTO Producto_Resena (id_resena,id_producto) VALUES (1,1);
INSERT INTO Producto_Resena (id_resena,id_producto) VALUES (2,2);
INSERT INTO Producto_Resena (id_resena,id_producto) VALUES (3,2);
SELECT * FROM Producto_Resena;

INSERT INTO Incompatibilidades (id_producto_1,id_producto_2) VALUES (1,2);
SELECT * FROM Incompatibilidades;

