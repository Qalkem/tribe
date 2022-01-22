require('dotenv').config()
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const indexRoute = require('./routes/index')
// const tribeRoute = require('./routes/tribe')
// const tribesRoute = require('./routes/tribes')

// --- --- --- mysql test --- --- ---
const mysql = require('mysql2')

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// execute will internally call prepare and query
connection.execute('SELECT * FROM `tribe`', [], function (err, results, fields) {
  console.log(err)
  console.log(results)
  console.log(fields)
})

// --- --- --- end mysql test --- --- ---

module.exports = express()
  .use(bodyParser.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  .set('views', './views')
  .set('view engine', 'ejs')

  .use('/', indexRoute)
// .use('/tribe', tribeRoute)
// .use('/tribes', tribesRoute)

// const morgan = require('morgan')
// const session = require('express-session')
// const upload = require('multer')({dest: 'public/uploads'})
// const mysql = require('mysql')
// const myconnection = require('express-myconnection')
// const config = require('./config')

// const adminRoute = require('./routes/admin')
// const storiesRoute = require('./routes/stories')
// const storyRoute = require('./routes/story')
// const errorRoute = require('./routes/error')

//   .use(morgan('dev')) // comment out for deployment
//   .use(morgan('common', {stream: fs.createWriteStream('./access.log', {flags: 'a+'})}))

//   .use(myconnection(mysql, config.mysql, 'single'))

//   .use(session(config.session))

//   .set('views', './views')
//   .set('view engine', 'ejs')

//   .use(express.static('public'))

//   .use('/admin', adminRoute)
//   .use('/stories', storiesRoute)
//   .use('/story', upload.single('bs-file'), storyRoute)

//   .use(errorRoute)
