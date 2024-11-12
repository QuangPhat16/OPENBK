//Implementing both router and services controllers
const express = require('express')
const userRouter = express.Router()
const {userUpdateValidations} = require('../userDTO')
const DB = require('../../database/models')
const { where } = require('sequelize')
const bcrypt = require('bcrypt')
const User = DB.User

//get user info
userRouter.get('/info', async(req, res)=>{
   const id = req.user.id
   console.log(`${id}`)
   try{
      const user = await User.findByPk(id)
      if(!user) return res.status(404).json({message: 'User not found'})
      return res.json(user)
   }
   catch(err){
      console.log(`${err}`)
      return res.status(500).json(err)
   }
})

//User change their info
//Still cannot validate input
userRouter.patch('/info', userUpdateValidations, async(req, res)=>{
   const {name, email, password} = req.body
   const id = req.user.id
   //const {name, email, password} = req.body
   try{
      const updateUser = User.findByPk(id) 
      if(!updateUser) return res.status(404).json({message:'Updated fail, no user not found'})
      const hashpwd = await bcrypt.hash(password, 10)
      await User.update({name, email, password: hashpwd}, {where: {id}})
      return res.json({message:'Update user information successfully'})
   }
   catch(err){
      console.error(`${err}`);
      res.status(500).json({ error: err.message });
   }
})

//admin change colaborator privillige
userRouter.patch('/collab/id:', userUpdateValidations, async(req, res)=>{
   const role = req.body
   const id = req.user.id
   try{
      const update = updateUser({role}, {where: {id}})
      if(!update[0]) return res.status(404).json({message:'Updated fail, no user not found'})
      return res.json({message:'Update user information successfully'})
   }
   catch(err){
      console.error(`${err}`);
      res.status(500).json({ error: err.message });
   }
})

module.exports = userRouter