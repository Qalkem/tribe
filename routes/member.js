const express = require('express')
const Member = require('../models/member.model')
const squadId = 1 // pass as an paramater id in the post request?

module.exports = express
  .Router()

  // Add a new member
  .post('/', async (req, res, next) => {
    try {
      res.json(await Member.create(new Member(req.body)))
    } catch (err) {
      console.error('Error while adding member: ', err.message)
      next(err)
    }
  })

  // List ALL members
  .get('/', async (req, res, next) => {
    try {
      res.json(await Member.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting members: ', err.message)
      next(err)
    }
  })

  // Find a member by id
  .get('/:id', async (req, res, next) => {
    try {
      res.json(await Member.findById(req.params.id))
    } catch (err) {
      console.error('Error finding member by id: ', err.message)
      next(err)
    }
  })

  // Update a member
  .patch('/', async (req, res, next) => {
    try {
      res.json(await Member.update(new Member(req.body)))
    } catch (err) {
      console.error('Error patching member: ', err.message)
      next(err)
    }
  })

// .delete('/:id', member.delete)
