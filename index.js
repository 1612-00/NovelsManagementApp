const express = require('express')

// Su dung cookie parser de doc du lieu trong cookie
var cookieParser = require('cookie-parser')

// Khai bao router auth phuc vu dang nhap
const authRouter = require('./route/auth.router')
const novelRouter = require('./route/novel.router')

// Cac key khong muon public duoc luu trong fie '.env'
require('dotenv').config()

const authMiddleware = require('./middleware/auth.middleware')

const app = express()

const port = 3000

// Su dung de doc static file trong thu muc public
app.use(express.static('public'))

// for parsing application/json
app.use(express.json()) 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser(process.env.SESSION_SECRET))

// Cac file view dc su dung dc lay tu thu muc view va duoc doc duoi dang pug
app.set('views', './view')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Su dung router dang nhap
app.use('/auth', authRouter);
app.use('/novel', authMiddleware.authLogin, novelRouter);

app.listen(port, () => {
  console.log('Server listenning on port ' + port)
})