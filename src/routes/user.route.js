const express = require('express')
const router = express.Router()
//const User = require('../database/models/userModel')
const DB = require('../database/models')
const User = DB.User
const { userUpdateValidations } = require('../controllers/users/userDTO')  // Validation middleware

const {
   getUserInfo,
   updateUserInfo,
   updateCollabPrivilege
} = require('../controllers/users/user.controller')

router.get('/', async(req, res)=>{
   try{
      const user = await User.findAll()
      res.json(user)
   }
   catch(err){
      res.status(500).json(err)
   }
})

router.post('/', async(req, res)=>{
   const {name, email, role, password} = req.body
   try{
      const user = await User.create({name, email, role, password})
      res.json({message:'Created user successfully',user})
   }
   catch(err){
      console.error(err);
      res.status(500).json({ error: err.message });
   }
})

router.get('/info', getUserInfo)

router.patch('/info', userUpdateValidations, updateUserInfo)

router.patch('/collab/:id', userUpdateValidations, updateCollabPrivilege)

module.exports = router