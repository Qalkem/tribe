const express = require('express')
const tribe = require('../models/tribe.model')

module.exports = express
  .Router()

  // .post('/', tribe.create)

  // List ALL tribes
  .get('/', async (req, res, next) => {
    try {
      res.json(await tribe.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting tribes: ', err.message)
      next(err)
    }
  })
  // Find a tribe by id
  .get('/:id', async (req, res, next) => {
    try {
      res.json(await tribe.findById(req.params.id))
    } catch (err) {
      console.error('Error while getting tribes: ', err.message)
      next(err)
    }
  })

// .put('/:id', tribe.update)
