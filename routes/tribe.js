const express = require('express')
const tribes = require('../models/tribe.model')

module.exports = express
  .Router()

  // .post('/', tribe.create)

  // List ALL tribes
  .get('/', async (req, res, next) => {
    try {
      res.json(await tribes.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting tribes: ', err.message)
      next(err)
    }
  })
// .get('/:id', tribe.findOne)
// .put('/:id', tribe.update)
