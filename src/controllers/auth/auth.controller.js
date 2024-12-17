// controllers/authController.js
const DB = require('../../database/models')
const User = DB.User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateLearnerID } = require('../../utils/generateID')


// sign up
const signUp = async (req, res) => {
   try {
      const { name, email, password } = req.body
      const userID = generateLearnerID()
      const imageUrl = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"

      const dupplicate = await User.findOne({ where: { email } })
      if (dupplicate) return res.status(401).json({ ERROR: 'Email is registered' })

      const hashpwd = await bcrypt.hash(password, 10)

      const newUser = await User.create({ userID: userID, name, email, password: hashpwd, imageUrl })
      // create access, refresh token
      const accessToken = jwt.sign(
         { name: newUser.name, id: newUser.id, role: newUser.role },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '3000s' }
      )

      const refreshToken = jwt.sign(
         { name: newUser.name, id: newUser.id, role: newUser.role },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: '1d' }
      )

      // store refresh token in cookies
      // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      // pass accessToken to frontend (client-side) for later API calls
      const role = "LEARNER"
      res.status(200).json({userID, role, accessToken })

   } catch (err) {
      res.status(500).json({ err })
   }
}

// log in
const logIn = async (req, res) => {
   try {
      const { email, password } = req.body
      const existUser = await User.findOne({ where: { email } })
      if (!existUser) return res.status(401).json({ ERROR: 'Email is not registered' })
      if (!existUser) return res.status(404).json({ message: 'User does not exist' })

      const isPasswordCorrect = await bcrypt.compare(password, existUser.password)
      if (!isPasswordCorrect) return res.status(404).json({ message: 'Password is incorrect' })

      const accessToken = jwt.sign(
         { "username": existUser.name, "userID": existUser.userID, "userRole": existUser.role },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '3000s' }
      )
   
      const refreshToken = jwt.sign(
         { "username": existUser.name, "userID": existUser.userID, "userRole": existUser.role },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: '1d' }
      )

      // store refresh token in cookies
      // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      // pass accessToken to frontend (client-side) for later API calls
      const userID = existUser.userID
      const role = existUser.role
      res.status(200).json({ userID, role, accessToken })

   } catch (err) {
      return res.status(500).json({ err })
   }
}

module.exports = {
   signUp,
   logIn
}
