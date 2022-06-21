const path = require('path');

const express = require('express');

const userController = require('../controllers/user');
const adminController = require('../controllers/admin');
const basicMiddleware = require('../middlewares/basicMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// register user
router.get('/register', userController.registerUser);

router.post('/register', userController.postRegisterUser);

router.get('/login', userController.loginUser);

router.post('/login', userController.postLoginUser);

router.get('/buyer/dashboard', basicMiddleware ,userController.dashboard);
router.get('/seller/dashboard', basicMiddleware ,userController.dashboard);
router.get('/admin/dashboard', adminMiddleware ,adminController.dashboard);
router.get('/logout', basicMiddleware ,userController.logout);

module.exports = router;