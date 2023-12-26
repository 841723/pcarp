-- Sentencias COPY para poblar las tablas en PostgreSQL

COPY Usuario FROM '../csv/pc_arp - usuario.csv' DELIMITER ',' CSV HEADER;
COPY Pedido FROM '../csv/pc_arp - pedido.csv' DELIMITER ',' CSV HEADER;
COPY Producto FROM '../csv/pc_arp - producto.csv' DELIMITER ',' CSV HEADER;
COPY placa_base FROM '../csv/pc_arp - placa_base.csv' DELIMITER ',' CSV HEADER;
COPY procesador FROM '../csv/pc_arp - procesador.csv' DELIMITER ',' CSV HEADER;
COPY disco_duro FROM '../csv/pc_arp - disco_duro.csv' DELIMITER ',' CSV HEADER;
COPY grafica FROM '../csv/pc_arp - grafica.csv' DELIMITER ',' CSV HEADER;
COPY ram FROM '../csv/pc_arp - ram.csv' DELIMITER ',' CSV HEADER;
COPY ventilador FROM '../csv/pc_arp - ventilador.csv' DELIMITER ',' CSV HEADER;
COPY caja_torre FROM '../csv/pc_arp - caja_torre.csv' DELIMITER ',' CSV HEADER;
COPY fuente_alimentacion FROM '../csv/pc_arp - fuente_alimentacion.csv' DELIMITER ',' CSV HEADER;
COPY Resena FROM '../csv/pc_arp - resena.csv' DELIMITER ',' CSV HEADER;
COPY Contenido_Pedido FROM '../csv/pc_arp - contenido_pedido.csv' DELIMITER ',' CSV HEADER;
COPY Incompatibilidad FROM '../csv/pc_arp - incompatibilidad.csv' DELIMITER ',' CSV HEADER;
