// routes/index.js: centralizador de rutas.

const express         = require('express');
const productRoutes   = require('./productRoutes'); 
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes       = require('./apiRoutes');
const router          = express.Router();


router.use("/products", productRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api/products", apiRoutes);

module.exports = router;