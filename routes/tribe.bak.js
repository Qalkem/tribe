const express = require('express')

module.exports = express
  .Router()
  // List a SINGLE tribe based on <id>
  .get('/:id', (req, res) => {
    // TODO: hook up db
    res.json({})
  })
  // Add a SINGLE tribe based on post-vars
  .post('/', (req, res) => {
    res.json({
      SUCCESS: {
        id: 1,
        title: req.body.title,
      },
    })
  })
  // Patch a SINGLE tribe based on post-vars
  .patch('/', (req, res) => {
    // TODO: hook up db
    res.json({
      SUCCESS: {
        id: 1,
      },
    })
  })
  // Delete a SINGLE tribe based on <id>
  .delete('/:id', (req, res) => {
    // TODO: hook up db
    res.json({
      SUCCESS: {
        id: 1,
      },
    })
  })
