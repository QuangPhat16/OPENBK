const express = require('express')
const router = express.Router()
const { userUpdateValidations } = require('../../controllers/users/userDTO')  // Validation middleware

const {
   getUserInfo,
   getAllUsers,
   createUser,
   deleteUser,
   updateUserInfo,
   updateCollabPrivilege
} = require('../../controllers/users/user.controller')

router.get('/', getAllUsers)

router.post('/', createUser)

router.get('/:userID', getUserInfo)

router.delete('/:userID', deleteUser)

router.patch('/info', userUpdateValidations, updateUserInfo)

router.patch('/collab/:id', userUpdateValidations, updateCollabPrivilege)

module.exports = router