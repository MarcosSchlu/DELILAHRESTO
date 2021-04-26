
CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `producto` varchar(200) NOT NULL,
  `precio` int(11) NOT NULL,
  `direcciondeenvio` text NOT NULL,
  `formadepago` text NOT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `pedido` (`id`, `usuario`, `producto`, `precio`, `direcciondeenvio`, `formadepago`, `estado`) VALUES
(1, 'Juan', 'Hamburguesa', 150, 'Libertador 25', 'Efectivo', 'Enviado'),
(2, 'Juan', 'Pancho', 100, 'Libertador 25', 'Efectivo', 'Enviado'),
(3, 'Juan', 'Hamburguesa', 150, 'Libertador 25', 'Efectivo', 'Entregado'),
(4, 'Dolo', 'Pancho', 100, 'Maipu 25', 'Tarjeta', 'Cancelado'),
(5, 'Dolo', 'Coca', 20, 'Maipu 25', 'Tarjeta', 'Nuevo');

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `producto` text NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `productos` (`id`, `producto`, `precio`) VALUES
(1, 'Pancho', 100),
(2, 'Hamburguesa', 150),
(3, 'Coca', 20);


CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `nombreyapellido` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `telefono` int(11) NOT NULL,
  `dirreciondeenvio` varchar(200) NOT NULL,
  `contraseña` varchar(200) NOT NULL,
  `admin` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `usuario` (`id`, `usuario`, `nombreyapellido`, `email`, `telefono`, `dirreciondeenvio`, `contraseña`, `admin`) VALUES
(1, 'admin', 'aminadmin', 'admin@admin.com', 11111111, 'admin 1111', 'adminadmin', 'true'),
(2, 'Juan', 'Juan Perez', 'juan@perez.com', 115465138, 'Libertador 25', 'jp25', '0'),
(3, 'Dolo', 'Dolo Perez', 'dolo@perez.com', 115465139, 'Maipu 25', 'dolo25', '0');


ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

