const express = require('express')

module.exports = express.Router()
  // List ALL stories
  .get('/', (req, res) => {
    // TODO: hook up db
    res.json([])
  })
  // List SOME stories based on <query>
  .get('/:query', (req, res) => {
    // TODO: hook up db
    res.json([])
  })
  // TODO: more ways to surge?
