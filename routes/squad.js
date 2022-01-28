const express = require('express')
const Squad = require('../models/squad.model')

module.exports = express
  .Router()

  // Add a new squad
  .post('/', async (req, res, next) => {
    try {
      res.json(await Squad.create(new Squad(req.body)))
    } catch (err) {
      console.error('Error while adding squad: ', err.message)
      next(err)
    }
  })

  // List ALL squads
  .get('/', async (req, res, next) => {
    try {
      res.json(await Squad.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting squads: ', err.message)
      next(err)
    }
  })
  // Find a squad by id
  .get('/:id', async (req, res, next) => {
    try {
      res.json(await Squad.findById(req.params.id))
    } catch (err) {
      console.error('Error finding squad by id: ', err.message)
      next(err)
    }
  })

  // Update a squad
  .patch('/', async (req, res, next) => {
    try {
      res.json(await Squad.update(new Squad(req.body)))
    } catch (err) {
      console.error('Error patching squad: ', err.message)
      next(err)
    }
  })

// .delete('/:id', squad.delete)
