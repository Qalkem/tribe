// shop for supplies
const express = require('express')
const ejs = require('ejs')

// plan the trip
const index = require('./routes/index')
const stories = require('./routes/stories')
const story = require('./routes/story')
const error = require('./routes/error')

// hop on the express
module.exports = express()
  // talk about the views we got
  .set('views', './views')
  .set('view engine', 'ejs')

  // public is (ec)static
  .use(express.static('public'))

  // show the route
  .use('/', index)
  .use('/stories', stories)
  .use('/story', story)

  // public likes to err, tell them
  .use(error)
