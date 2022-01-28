const express = require('express')
const Team = require('../models/team.model')

module.exports = express
  .Router()

  // Add a new team
  .post('/', async (req, res, next) => {
    try {
      res.json(await Team.create(new Team(req.body)))
    } catch (err) {
      console.error('Error while adding team: ', err.message)
      next(err)
    }
  })

  // List ALL teams
  .get('/', async (req, res, next) => {
    try {
      res.json(await Team.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting teams: ', err.message)
      next(err)
    }
  })
  // Find a team by id
  .get('/:id', async (req, res, next) => {
    try {
      res.json(await Team.findById(req.params.id))
    } catch (err) {
      console.error('Error finding team by id: ', err.message)
      next(err)
    }
  })

  // Update a team
  .patch('/', async (req, res, next) => {
    try {
      res.json(await Team.update(new Team(req.body)))
    } catch (err) {
      console.error('Error patching team: ', err.message)
      next(err)
    }
  })

// .delete('/:id', team.delete)
