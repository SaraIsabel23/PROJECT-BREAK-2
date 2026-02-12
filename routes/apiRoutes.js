
const express = require('express');
const apiController = require('../controllers/apiController');
const router  = express.Router();


router.get("/", apiController.getProducts);//Todos los productos en JSON

router.get("/:productId", apiController.getProductById);//Un producto en JSON

router.post("/", apiController.createProduct );//Crea un producto, devuelve el producto creado

router.put("/:productId", apiController.updateProduct);//Actualiza un producto, devuelve el actualizado

router.delete("/:productId", apiController.deleteProduct);//Elimina un producto, devuelve confirmacion

module.exports = router;