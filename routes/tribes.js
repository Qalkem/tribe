const express = require('express')
const tribes = require('../services/tribes')

module.exports = express
  .Router()
  // List ALL tribes
  .get('/', async (req, res, next) => {
    try {
      res.json(await tribes.getMultiple(req.query.page))
    } catch (err) {
      console.error('Error while getting tribes: ', err.message)
      next(err)
    }
  })
