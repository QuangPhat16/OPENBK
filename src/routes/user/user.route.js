const express = require('express')
const router = express.Router()
const { userUpdateValidations } = require('../../controllers/users/userDTO')  // Validation middleware

const {
   getUserInfo,
   getAllUsers,
   createUser,
   deleteUser,
   updateUserInfo,
   updateCollabPrivilege,
   updateUserPassword,
   getAllCourseByUser,
} = require('../../controllers/users/user.controller')
const verifyJWT = require('../../middleware/verifyJWT')

router.get('/', getAllUsers)

router.post('/', createUser)

router.get('/course', getAllCourseByUser) // thêm middleware verifyJWT sau và vẫn phải đặt trước getUserInfo

router.get('/:userID', getUserInfo)

// router.use(verifyJWT)

router.delete('/:userID', deleteUser)

router.patch('/info', userUpdateValidations, updateUserInfo)

router.patch('/info/password', updateUserPassword)

router.patch('/collab/:id', userUpdateValidations, updateCollabPrivilege)


module.exports = router