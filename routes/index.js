const express = require('express')
const openapi = require('../docs/openapi.json')

module.exports = express
  .Router()

  // Send openapi doc as formatted HTML
  .get('/', (req, res) => {
    // parse to HTML?
    res.json({
      message: 'Welcome to tribe.api.fdnd.nl! Please use the resources below to expore this API.',
      github: 'https://github.com/fdnd-apis/tribe',
      spec: 'https://tribe.api.fdnd.nl/v1',
      docs: 'https://redocly.github.io/redoc/?url=https://tribe.api.fdnd.nl/v1',
    })
  })

  // Send openapi doc as json
  .get('/v1', (req, res) => {
    res.json(openapi)
  })
