const express = require('express')
const {sequelize} = require('./database/models')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express()

const corsOptions = {
   origin: "http://localhost:3000",
   methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
 };

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())

app.use('/auth', require('./routes/auth/auth.route'))
// app.use(verifyJWT)
app.use('/', require('./routes'))


app.listen(3001, async ()=>{
   console.log('Server is running')
   await sequelize.authenticate()
   console.log('Database connected \n')
   await sequelize.sync({alter: true})
   console.log('Database synced \n')
})
