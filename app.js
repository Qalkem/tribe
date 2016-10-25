const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const upload = require('multer')({dest: 'public/uploads'})
const mysql = require('mysql')
const myconnection = require('express-myconnection')
const config = require('./config')

const indexRoute = require('./routes/index')
const adminRoute = require('./routes/admin')
const storiesRoute = require('./routes/stories')
const storyRoute = require('./routes/story')
const errorRoute = require('./routes/error')

module.exports = express()
  .use(morgan('dev')) // comment out for deployment
  .use(morgan('common', {stream: fs.createWriteStream('./access.log', {flags: 'a+'})}))

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(myconnection(mysql, config.mysql, 'single'))

  .use(session(config.session))

  .set('views', './views')
  .set('view engine', 'ejs')

  .use(express.static('public'))

  .use('/', indexRoute)
  .use('/admin', adminRoute)
  .use('/stories', storiesRoute)
  .use('/story', upload.single('bs-file'), storyRoute)

  .use(errorRoute)
