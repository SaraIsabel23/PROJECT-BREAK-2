// authRoutes.js: Define las rutas de autenticación y las conecta con su controlado

const express        = require('express');
const authController = require('../controllers/authController');
const router         = express.Router();

router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;