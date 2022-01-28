const express = require('express')
const openapi = require('../docs/openapi.json')

module.exports = express
  .Router()

  .get('/', (req, res) => {
    res.json(openapi)
  })
