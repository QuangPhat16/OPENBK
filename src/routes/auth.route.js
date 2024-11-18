const express = require('express')
const authRouter = express.Router()
const { userCreateValidations, userLoginValidation } = require('../controllers/users/userDTO')
const { signUp, logIn } = require('../controllers/auth/authController')

authRouter.post('/signup', userCreateValidations, signUp)

authRouter.post('/login', userLoginValidation, logIn)

module.exports = authRouter
