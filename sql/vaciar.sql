DELETE FROM Pedido_Usuario;

DELETE FROM Producto;
ALTER SEQUENCE Producto_id_producto_seq RESTART WITH 1;

DELETE FROM Pedido;
ALTER SEQUENCE Pedido_id_pedido_seq RESTART WITH 1;

DELETE FROM Usuario;
ALTER SEQUENCE Usuario_id_usuario_seq RESTART WITH 1;
