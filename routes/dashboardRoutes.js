//dashboardRoutes.js: Define las rutas para el administrador de los productos y las conecta con su controlador.

const express             = require('express');
const dashboardController = require('../controllers/dashboardController');
const router              = express.Router();
const authMiddleware      = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get("/", dashboardController.showProducts);

router.get("/new", dashboardController.showNewProduct);

router.post("/", dashboardController.createProduct);

router.get("/:productId", dashboardController.showProductById);

router.get("/:productId/edit", dashboardController.showEditProduct);

router.put("/:productId", dashboardController.updateProduct);

router.delete("/:productId/delete", dashboardController.deleteProduct);

module.exports = router;