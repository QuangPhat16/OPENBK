const express = require('express')
const {sequelize} = require('./database/models')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const app = express()
const authRoutes = require('./routes/auth/auth.route');

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
// app.use(verifyJWT)
app.use('/', require('./routes'))


app.listen(3001, async ()=>{
   console.log('Server is running')
   await sequelize.authenticate()
   console.log('Database connected \n')
   await sequelize.sync({alter: true})
   console.log('Database synced \n')
})
