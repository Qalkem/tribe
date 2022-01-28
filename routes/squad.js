const express = require('express')
const Squad = require('../models/squad.model')
const tribId = 7 // pass as an paramater id in the post request?

module.exports = express
  .Router()

  // Add a new squad
  .post('/squad', async (req, res, next) => {
    try {
      res.json(await Squad.create(new Squad(req.body), tribeId))
    } catch (err) {
      console.error('Error while adding squad: ', err.message)
      next(err)
    }
  })

  // List ALL squads
  .get('/squad', async (req, res, next) => {
    try {
      res.json(await Squad.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting squads: ', err.message)
      next(err)
    }
  })
  // Find a squad by id
  .get('squad/:id', async (req, res, next) => {
    try {
      res.json(await Squad.findById(req.params.id))
    } catch (err) {
      console.error('Error finding squad by id: ', err.message)
      next(err)
    }
  })

// .patch('/:id', squad.update)
// .delete('/:id', squad.delete)
