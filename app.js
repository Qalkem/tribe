const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const jsonBodyParser = require('body-parser').json()

const indexRoute = require('./routes/index')
const storiesRoute = require('./routes/stories')
const storyRoute = require('./routes/story')
const errorRoute = require('./routes/error')

module.exports = express()
  .use(morgan('dev')) // comment out for deployment
  .use(morgan('common', {stream: fs.createWriteStream('./access.log', {flags: 'a+'})}))
  .use(jsonBodyParser)

  .set('views', './views')
  .set('view engine', 'ejs')

  .use(express.static('public'))

  .use('/', indexRoute)
  .use('/stories', storiesRoute)
  .use('/story', storyRoute)

  .use(errorRoute)
