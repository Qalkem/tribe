require('dotenv').config()
const express = require('express')

const indexRoute = require('./routes/index')
const tribeRoute = require('./routes/tribe')
const errorRoute = require('./routes/error')

module.exports = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .use('/', indexRoute)
  .use('/tribe', tribeRoute)
  .use(errorRoute)
