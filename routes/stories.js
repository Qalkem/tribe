const express = require('express')

module.exports = express.Router()
  // List ALL stories
  .get('/', (req, res) => {
    res.json([])
  })
  // List SOME stories based on <query>
  .get('/:query', (req, res) => {
    res.json([])
  })
  // TODO: more ways to surge?
