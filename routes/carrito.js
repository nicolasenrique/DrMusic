const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Middlewar
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const authUserMiddleware = require('../middlewares/authUserMiddleware');

router.get('/mostrar', authUserMiddleware, carritoController.mostrar);

/* *** Las rutas debajo hoy no están siendo utilizadas *** */
router.get('/checkOut', carritoController.mostrar);
router.post('/pago', carritoController.mostrar);
router.post('/ect', carritoController.mostrar);

module.exports = router;