DELETE FROM Incompatibilidades;
DELETE FROM Producto_Resena;
DELETE FROM Pedido_Usuario;


DELETE FROM Resena;
ALTER SEQUENCE Resena_id_resena_seq RESTART WITH 1;

DELETE FROM Producto;
ALTER SEQUENCE Producto_id_producto_seq RESTART WITH 1;

DELETE FROM Pedido;
ALTER SEQUENCE Pedido_id_pedido_seq RESTART WITH 1;

DELETE FROM Usuario;
ALTER SEQUENCE Usuario_id_usuario_seq RESTART WITH 1;
