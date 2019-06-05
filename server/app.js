const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')

const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const commentRoutes = require('./routes/comment.routes')
const keys = require('./keys')
// или const keys = require('./keys/index')  
const app = express()

mongoose.connect(keys.baseUrl, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB connected...')
    }).catch(error => console.error(error))

app.use(passport.initialize())
passport.use(passportStrategy)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes) //регистрируем роуты в express
app.use('/api/post', postRoutes) //регистрируем роуты в express
app.use('/api/comment', commentRoutes) //регистрируем роуты в express

module.exports = app

