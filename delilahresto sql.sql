CREATE DATABASE IF NOT EXISTS `delilahresto` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `delilahresto`;

DROP TABLE IF EXISTS `orden`;
CREATE TABLE `orden` (
  `id` int(200) NOT NULL,
  `idPedido` int(200) NOT NULL,
  `producto` varchar(200) NOT NULL,
  `cantidad` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `orden` (`id`, `idPedido`, `producto`, `cantidad`) VALUES
(1, 1, 'Hamburguesa', 1),
(2, 3, 'Coca', 1),
(3, 3, 'Pancho', 2),
(4, 4, 'Pancho', 1),
(5, 4, 'Hamburguesa', 1),
(6, 5, 'Coca', 1),
(7, 5, 'Wok', 1);

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `precio` int(11) NOT NULL,
  `direcciondeenvio` text NOT NULL,
  `formadepago` text NOT NULL,
  `estado` text NOT NULL,
  `activa` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `pedido` (`id`, `usuario`, `precio`, `direcciondeenvio`, `formadepago`, `estado`, `activa`) VALUES
(1, 'JP23', 150, 'Libertador 25', 'Tarjeta', 'Nuevo', 'si'),
(2, 'Dolo', 30, 'Libertador 25', 'Efectivo', 'Nuevo', 'no'),
(3, 'Marcos', 200, 'Libertador 21', 'Tarjeta', 'Nuevo', 'si'),
(4, 'Dolo', 250, 'Libertador 25', 'Efectivo', 'Entregado', 'si'),
(5, 'JP23', 150, 'Libertador 25', 'Tarjeta', 'Nuevo', 'si');

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `producto` text NOT NULL,
  `precio` int(11) NOT NULL,
  `activa` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `productos` (`id`, `producto`, `precio`, `activa`) VALUES
(1, 'Pancho', 100, 'si'),
(2, 'Hamburguesa', 150, 'si'),
(3, 'Coca', 30, 'si'),
(4, 'Pasta', 130, 'si'),
(5, 'Wok', 120, 'no');

DROP TABLE IF EXISTS `usuario`;
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
(2, 'JP23', 'Juan Perez', 'juan@perez.com', 115465138, 'Libertador 25', 'jp25', '0'),
(3, 'Dolo', 'Dolo Perez', 'dolo@perez.com', 115465139, 'Libertador 25', 'dolo25', '0'),
(4, 'Marcos', 'Marcos Perez', 'marcos@perez.com', 115465138, 'Libertador 21', 'marquitos21', '0'),
(5, 'Pedro', 'Pedro Perez', 'pedro@perez.com', 115465138, 'Maipu 21', 'pedritop', '0');

ALTER TABLE `orden`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `orden`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

