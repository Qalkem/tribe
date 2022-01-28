const express = require('express')
const Team = require('../models/team.model')

module.exports = express
  .Router()

  // Add a new team
  .post('/team', async (req, res, next) => {
    try {
      res.json(await Team.create(new Team(req.body)))
    } catch (err) {
      console.error('Error while adding team: ', err.message)
      next(err)
    }
  })

  // List ALL teams
  .get('/team', async (req, res, next) => {
    try {
      res.json(await Team.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting teams: ', err.message)
      next(err)
    }
  })
  // Find a team by id
  .get('team/:id', async (req, res, next) => {
    try {
      res.json(await Team.findById(req.params.id))
    } catch (err) {
      console.error('Error finding team by id: ', err.message)
      next(err)
    }
  })

// .patch('/:id', team.update)
// .delete('/:id', team.delete)
