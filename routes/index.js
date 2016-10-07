const express = require('express')

module.exports = express.Router()

  .get('/', (req, res) => {
    res.locals.title = 'Blok Web API'
    res.render('index')
  })

  // TODO: enforce login using express sessions
  .get('/add', (req, res) => {
    res.render('addForm')
  })
