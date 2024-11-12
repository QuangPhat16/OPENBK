const express = require('express')
const authRouter = express.Router()
const {userCreateValidations, userLoginValidation} = require('../userDTO')
const DB = require('../../database/models')
const User = DB.User
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//sign up 
authRouter.post('/signup', userCreateValidations, async (req, res) => {
   try{
      const {name, email, password} = req.body

      dupplicate = await User.findOne( { where:{email,} })

      if(dupplicate) return res.status(401).json({ERROR:'Email is registered'})
      const hashpwd = await bcrypt.hash(password, 10)
      const newUser = await User.create({name, email, password: hashpwd})

      //create access, refresh token
      const accessToken = jwt.sign(
         {"username" : newUser.name,
            "userID": newUser.id,
            "userRole": newUser.role
         },
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: '300s'}
      )

      const refreshToken = jwt.sign(
         {"username" : newUser.name,
            "userID": newUser.id,
            "userRole": newUser.role
         },
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn: '1d'}
      )
      //store refresh token in cookies
      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
      //pass accessToken to front end (client side) for later API calls
      res.status(200).json({accessToken})

   }catch(err){
      console.log(`${err}`)
      res.status(500).json({err})
   }
})

//log in 
authRouter.post('/login', userLoginValidation, async (req, res) => {
   try{
      const {email, password} = req.body
      const existUser = await User.findOne({
         where: {email,}
      })
      if(!existUser) return res.status(404).json({message: 'User is not exist'})
      const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
      if (!isPasswordCorrect) return res.status(404).json({ message: 'Password is incorrect' });      

      const accessToken = jwt.sign(
         {"username" : existUser.name,
            "userID": existUser.id,
            "userRole": existUser.role
         },
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: '300s'}
      )

      const refreshToken = jwt.sign(
         {"username" : existUser.name,
            "userID": existUser.id,
            "userRole": existUser.role
         },
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn: '1d'}
      )
      //store refresh token in cookies
      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
      //pass accessToken to front end (client side) for later API calls
      res.status(200).json({accessToken})
   }catch(err){
      console.log(`${err}`)
      return res.status(500).json({err})
   }
})

module.exports = authRouter