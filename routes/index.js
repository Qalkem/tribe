const express = require('express')

module.exports = express
  .Router()

  .get('/', (req, res) => {
    res.locals.pagetitle = 'Tribe API'
    res.render('index')
  })
