const express = require('express')
const Tribe = require('../models/tribe.model')

module.exports = express
  .Router()

  // Add a new tribe
  .post('/', async (req, res, next) => {
    try {
      res.json(await Tribe.create(new Tribe(req.body)))
    } catch (err) {
      console.error('Error while adding tribe: ', err.message)
      next(err)
    }
  })

  // List ALL tribes
  .get('/', async (req, res, next) => {
    try {
      res.json(await Tribe.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting tribes: ', err.message)
      next(err)
    }
  })
  // Find a tribe by id
  .get('/:id', async (req, res, next) => {
    try {
      res.json(await Tribe.findById(req.params.id))
    } catch (err) {
      console.error('Error finding tribe by id: ', err.message)
      next(err)
    }
  })

// .patch('/:id', tribe.update)
// .delete('/:id', tribe.delete)
