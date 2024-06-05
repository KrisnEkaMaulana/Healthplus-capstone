const express = require('express')
const useController = require('../controller/userController')

const router = express.Router();

router.get('/users', useController.getAllUsers)
router.get('/login', useController.login)
router.get('/register', useController.register)

module.exports = router
