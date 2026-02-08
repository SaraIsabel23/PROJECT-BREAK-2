// routes/index.js: centralizador de rutas.

const express         = require('express');
const productRoutes   = require('./productRoutes'); 
const dashboardRoutes = require('./dashboardRoutes');
const router          = express.Router();


router.use("/products", productRoutes);
router.use("/dashboard", dashboardRoutes);


module.exports = router;