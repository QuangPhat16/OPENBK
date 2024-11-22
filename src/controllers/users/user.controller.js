const { User } = require('../../database/models')
const bcrypt = require('bcrypt')

//get user info
const getUserInfo = async (req, res) => {
   const id = req.user.id
   console.log(`${id}`)
   try {
      const user = await User.findByPk(id)
      if (!user) return res.status(404).json({ message: 'User not found' })
      return res.json(user)
   } catch (err) {
      console.log(`${err}`)
      return res.status(500).json({ error: err.message })
   }
}

const getAllUsers = async(req, res)=>{
   try{
      const user = await User.findAll()
      res.json(user)
   }
   catch(err){
      res.status(500).json(err)
   }
}

const createUser = async(req, res)=>{
   const {name, email, role, password} = req.body
   try{
      const user = await User.create({name, email, role, password})
      res.json({message:'Created user successfully',user})
   }
   catch(err){
      console.error(err);
      res.status(500).json({ error: err.message });
   }
}

//User change their info
//Still cannot validate input
const updateUserInfo = async (req, res) => {
   const { name, email, password } = req.body
   const id = req.user.id
   try {
      const updateUser = await User.findByPk(id)
      if (!updateUser) return res.status(404).json({ message: 'Updated fail, no user not found' })
      const hashpwd = await bcrypt.hash(password, 10)
      await User.update({ name, email, password: hashpwd }, { where: { id } })
      return res.json({ message: 'Update user information successfully' })
   } catch (err) {
      console.error(`${err}`);
      return res.status(500).json({ error: err.message })
   }
}

//admin change collaborator privilege
const updateCollabPrivilege = async (req, res) => {
   const { role } = req.body
   const id = req.user.id
   try {
      const update = await User.update({ role }, { where: { id } })
      if (!update[0]) return res.status(404).json({ message: 'Updated fail, no user not found' })
      return res.json({ message: 'Update user information successfully' })
   } catch (err) {
      console.error(`${err}`);
      return res.status(500).json({ error: err.message })
   }
}

module.exports = {
   getUserInfo,
   getAllUsers,
   createUser,
   updateUserInfo,
   updateCollabPrivilege
}
