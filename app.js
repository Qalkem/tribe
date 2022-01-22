require('dotenv').config()
const express = require('express')
const cors = require('cors')

// const morgan = require('morgan')
// const session = require('express-session')
// const upload = require('multer')({dest: 'public/uploads'})
// const mysql = require('mysql')
// const myconnection = require('express-myconnection')
// const config = require('./config')

// const indexRoute = require('./routes/index')
// const tribeRoute = require('./routes/tribe')
const tribesRoute = require('./routes/tribes')
const errorRoute = require('./routes/error')

module.exports = express()
  // .use(bodyParser.json())
  // .use(bodyParser.json())
  // .use(bodyParser.urlencoded({ extended: true }))
  .use(cors({ origin: 'http://localhost:8081' }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  // .use('/', indexRoute)
  // .use('/tribe', tribeRoute)
  // .use('/tribes', tribesRoute)

  //   .use(morgan('dev')) // comment out for deployment
  //   .use(morgan('common', {stream: fs.createWriteStream('./access.log', {flags: 'a+'})}))

  //   .use(myconnection(mysql, config.mysql, 'single'))

  //   .use(session(config.session))
  // .use(express.static('public'))

  // .set('views', './views')
  // .set('view engine', 'ejs')

  .get('/', (req, res) => {
    res.json({ message: 'Welcome to the FDBD tribes application.' })
  })

  .use('/tribes', tribesRoute)
  .use(errorRoute)
