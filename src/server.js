const express = require('express')
const { sequelize } = require('./database/models')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');
const verifyJWT = require('./middleware/verifyJWT')
const app = express()

const corsOptions = {
   origin: true,
   methods: '*',
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())

app.use('/auth', require('./routes/auth/auth.route'))
// app.use(verifyJWT)
app.use('/uploads', express.static('uploads'));
app.use('/', require('./routes'))
// Tạo route để phục vụ các hình ảnh


app.listen(3001, async () => {
   console.log('Server is running')
   await sequelize.authenticate()
   console.log('Database connected \n')
   await sequelize.sync({ alter: true })
   console.log('Database synced \n')
   console.log(express.static(path.join(__dirname, 'uploads')))

})
