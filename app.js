const fs = require('fs')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const stories = require('./routes/stories')
const story = require('./routes/story')
const error = require('./routes/error')

module.exports = express()
  .use(logger('common', {stream: fs.createWriteStream('./logs/access.log', {flags: 'a+'})}))
  .use(logger('dev')) // comment out for deployment
  .use(bodyParser.urlencoded({extended: true}))

  .set('views', './views')
  .set('view engine', 'ejs')

  .use(express.static('public'))

  .use('/', index)
  .use('/stories', stories)
  .use('/story', story)

  .use(error)
