const express = require('express');
const router = express.Router()
const verifyAccessToken = require('../jsonwebtoken/verifyAccessToken');

const userController = require('../controller/userController');
router.post('/register', userController.register);
router.post('/login', userController.login);

const adminController = require('../controller/adminController')
router.get('/users', verifyAccessToken, adminController.getAllUser);
router.get('/users/:id', verifyAccessToken, adminController.getUserById); 
router.post('/users', verifyAccessToken, adminController.addUser);
router.put('/users/:id', verifyAccessToken, adminController.updateUser);
router.delete('/users/:id', verifyAccessToken, adminController.delete);
router.put('/users/deactivate/:id', verifyAccessToken, adminController.deactivateUser); // dimulai dari route ini
router.put('/users/activate/:id', verifyAccessToken, adminController.activateUser);
//ketika endpoint di akses, akan mengupdate status dari aktif menjadi nonaktif begitu juga kebalikan nya

module.exports = router
