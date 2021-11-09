const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

//Middlewares

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Formulario de Register

router.get('/register', usersController.register);

//Formulario de Login

router.get('/login', guestMiddleware ,usersController.login);

//Procesar el Login

router.post('/login', usersController.loginProcess);

//Perfil de usuario

router.get('/profile', authMiddleware ,usersController.profile);

//Logout

router.get('/logout/', usersController.logout);

module.exports = router;