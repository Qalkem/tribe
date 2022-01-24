const express = require('express')
const tribe = require('../controllers/tribe.controller')

module.exports = express
  .Router()
  // List ALL tribes
  .post('/', tribe.create)
  .get('/', tribe.findAll)
  .get('/:id', tribe.findOne)
  .put('/:id', tribe.update)
