const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth.routes')
const keys = require('./keys')
// или const keys = require('./keys/index')
const app = express()

mongoose.connect(keys.baseUrl)
    .then(() => {
        console.log('MongoDB connected...')
    }).catch(error => console.error(error))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes) //регистрируем роуты в express

module.exports = app

