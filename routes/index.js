// routes/index.js: centralizador de rutas.

const express         = require('express');
const productRoutes   = require('./productRoutes'); 
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes       = require('./apiRoutes');
const authRoutes      = require('./authRoutes');
const router          = express.Router();

router.get('/', (req, res) => {
  res.redirect('/products');
});

router.use("/products", productRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api/products", apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;


