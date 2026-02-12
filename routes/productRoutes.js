//productRoutes.js: Define las rutas públicas de los productos y las conecta con su controlador.

const express = require('express');
const publicControllers = require('../controllers/productController');
const router  = express.Router();


router.get("/", publicControllers.showProducts);

router.get("/:productId", publicControllers.showProductById);

module.exports = router;