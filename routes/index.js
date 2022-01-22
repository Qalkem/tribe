const express = require('express')

module.exports = express
  .Router()

  .get('/', (req, res) => {
    res.json({ message: 'Welcome to the FDND tribes API.' })
  })
