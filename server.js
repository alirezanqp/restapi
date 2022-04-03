require('dotenv').config()
const bootapplication = require('./app')

bootapplication(process.env.APP_PORT)
