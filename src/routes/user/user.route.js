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
   updateCollabPrivilege,
   updateUserPassword,
   getAllCourseByUser,
} = require('../../controllers/users/user.controller')
const verifyJWT = require('../../middleware/verifyJWT')

router.get('/', getAllUsers)

router.post('/', createUser)

// router.use(verifyJWT)

router.get('/info', getUserInfo)

router.patch('/info', userUpdateValidations, updateUserInfo)

router.patch('info/password', updateUserPassword)

router.patch('/collab/:id', userUpdateValidations, updateCollabPrivilege)

router.get('/course', getAllCourseByUser)

module.exports = router