//productRoutes.js: Define las rutas públicas de los productos y las conecta con su controlador.

const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
    res.send("Aquí irán todos los productos")
});

router.get("/:productId", (req, res) => {
    res.send("Detalle de cada producto por su id")
});



module.exports = router;