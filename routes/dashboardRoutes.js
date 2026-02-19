//dashboardRoutes.js: Define las rutas para el administrador de los productos y las conecta con su controlador.

const express             = require('express');
const dashboardController = require('../controllers/dashboardController');
const router              = express.Router();
const authMiddleware      = require('../middlewares/authMiddleware');
const upload              = require('../middlewares/uploadCloudinaryMiddleware');

router.use(authMiddleware);

router.get("/", dashboardController.showProducts);

router.get("/new", dashboardController.showNewProduct);

router.post("/",upload.single('image'), dashboardController.createProduct);

router.get("/:productId", dashboardController.showProductById);

router.get("/:productId/edit", dashboardController.showEditProduct);

router.put("/:productId",upload.single('image'), dashboardController.updateProduct);

router.delete("/:productId/delete", dashboardController.deleteProduct);

module.exports = router;

