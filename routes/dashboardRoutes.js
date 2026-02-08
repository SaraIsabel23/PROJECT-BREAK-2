//dashboardRoutes.js: Define las rutas para el administrador de los productos y las conecta con su controlador.

const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
    res.send("Aquí aparecerán todos los productos.Al hacer click, nos lleva a su página para actualizar o eliminar")
});

router.get("/new", (req, res) => {
    res.send("Devuelve el formulario para subir un artículo nuevo")
});

router.post("/", (req, res) => {
    res.send("Crea un nuevo producto")
});

router.get("/:productId", (req, res) => {
    console.log(req.params.productId)
    res.send("Devuelve el detalle de un producto en el dashboard")
});

router.get("/:productId/edit", (req, res) => {
    res.send("Devuelve el formulario para editar un producto")
});

router.put("/:productId", (req, res) => {
    res.send("Actualiza un producto")
});

router.delete("/:productId/delete", (req, res) => {
    res.send("Elimina un producto")
});

module.exports = router;