INSERT INTO Usuario (nombre,apellidos,contrasena,direccion,mail) VALUES ('diego','roldan','dr0','direccion de diego 3B','raul@gmail.com');
INSERT INTO Usuario (nombre,apellidos,contrasena,direccion,mail) VALUES ('abel','romeo','ab1','direccion de abel 3B','romeo@unizar.com');
INSERT INTO Usuario (nombre,apellidos,contrasena,direccion,mail) VALUES ('pablo','moreno','enfadica','direccion de pablo 3B','marti@poulsen.com');
SELECT * FROM Usuario;


INSERT INTO Pedido (fecha,fecha_llegada,estado) VALUES (current_timestamp,current_date+2,'pendiente');
INSERT INTO Pedido (fecha,fecha_llegada,estado) VALUES (current_timestamp,current_date+3,'enviado');
SELECT * FROM Pedido;


INSERT INTO Producto (nombre,precio,descripcion,stock) VALUES ('producto1',23.5,'',50);
INSERT INTO Producto (nombre,precio,descripcion,stock) VALUES ('producto2',3.12,'',163);
SELECT * FROM Producto;


INSERT INTO Resena (id_usuario,id_producto,contenido,estrellas) VALUES (1,1,'muy malo',1);
INSERT INTO Resena (id_usuario,id_producto,contenido,estrellas) VALUES (2,2,'oleee',5);
INSERT INTO Resena (id_usuario,id_producto,contenido,estrellas) VALUES (2,2,'bueno regulinchi',3);
SELECT * FROM Resena;


INSERT INTO Pedido_Usuario (id_usuario,id_pedido) VALUES (1,1);
INSERT INTO Pedido_Usuario (id_usuario,id_pedido) VALUES (2,2);
SELECT * FROM Pedido_Usuario;


INSERT INTO Contenido_Pedido (id_pedido,id_producto,cantidad) VALUES (1,1,2);
INSERT INTO Contenido_Pedido (id_pedido,id_producto,cantidad) VALUES (1,2,9);
INSERT INTO Contenido_Pedido (id_pedido,id_producto,cantidad) VALUES (2,2,35);
SELECT * FROM Contenido_Pedido;


INSERT INTO Incompatibilidad (id_producto_1,id_producto_2) VALUES (1,2);
SELECT * FROM Incompatibilidad;

