require('dotenv').config()
const express = require('express')

const indexRoute = require('./routes/index')
const tribeRoute = require('./routes/tribe')
const squadRoute = require('./routes/squad')
// const teamRoute = require('./routes/team')
// const memberRoute = require('./routes/member')
const errorRoute = require('./routes/error')

module.exports = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .use('/', indexRoute)
  .use('/v1/tribe', tribeRoute)
  .use('/v1/squad', squadRoute)
  // .use('/v1/team', teamRoute)
  // .use('/v1/member', memberRoute)
  .use(errorRoute)
