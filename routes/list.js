const express = require('express')
const List = require('../models/list.model')

module.exports = express
  .Router()

  // Return a list of all members with left joined info
  .get('/', async (req, res, next) => {
    try {
      res.json(await List.get())
    } catch (err) {
      console.error('Error while getting tribes: ', err.message)
      next(err)
    }
  })
