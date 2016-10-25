const express = require('express')

module.exports = express.Router()

  .get('/', (req, res) => {
    res.locals.pagetitle = 'Blok Web API'
    res.render('index')
  })
