const express = require('express')

module.exports = express.Router()
  // List a SINGLE story based on <id>
  .get('/:id', (req, res) => {
    res.json({})
  })
  // Add a SINGLE story based on post-vars
  .post('/', (req, res) => {
    // let post = req.body
    res.json({})
  })
  // Patch a SINGLE story based on post-vars
  .patch('/', (req, res) => {
    // let post = req.body
    res.json({})
  })
  // Delete a SINGLE story based on <id>
  .delete('/:id', (req, res) => {
    res.json()
  })
