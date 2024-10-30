const express = require('express')
const {sequelize} = require('./database/models')
const Userrouter = require('./users/userController')
const app = express()

app.use(express.json())
app.use('/users',Userrouter)

app.listen(3001, async ()=>{
   console.log('Server is running')
   await sequelize.authenticate()
   console.log('Database connected \n')
   await sequelize.sync({alter: true})
   console.log('Database synced \n')
})
