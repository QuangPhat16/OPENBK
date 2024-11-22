const express = require('express')
const router = express.Router()
//const User = require('../database/models/user.model')
const DB = require('../../database/models')
const User = DB.User
const { userUpdateValidations } = require('../../controllers/users/userDTO')  // Validation middleware

const {
   getUserInfo,
   getAllUsers,
   createUser,
   updateUserInfo,
   updateCollabPrivilege
} = require('../../controllers/users/user.controller')

router.get('/', getAllUsers)

router.post('/', createUser)

router.get('/info', getUserInfo)

router.patch('/info', userUpdateValidations, updateUserInfo)

router.patch('/collab/:id', userUpdateValidations, updateCollabPrivilege)

module.exports = router