const express = require('express')

module.exports = express.Router()
  // List ALL stories
  .get('/', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query('SELECT * FROM verhalen', (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
  // List SOME stories based on <query>
  .get('/:query', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query(`SELECT * FROM verhalen WHERE genre LIKE "%${req.params.query}%" OR sfeerwoord LIKE "%${req.params.query}%" OR tags LIKE "%${req.params.query}%" OR titel LIKE "%${req.params.query}%" OR typeDisplay LIKE "%${req.params.query}%" OR typeCopyText LIKE "%${req.params.query}%"`, (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
  // List SOME stories based on genre
  .get('/genre/:query', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query(`SELECT * FROM verhalen WHERE genre LIKE "%${req.params.query}%"`, (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
  // List SOME stories based on sfeerwoord
  .get('/sfeerwoord/:query', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query(`SELECT * FROM verhalen WHERE sfeerwoord LIKE "%${req.params.query}%"`, (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
  // List SOME stories based on tags
  .get('/genre/:query', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query(`SELECT * FROM verhalen WHERE tags LIKE "%${req.params.query}%"`, (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
  // List SOME stories based on titel
  .get('/titel/:query', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query(`SELECT * FROM verhalen WHERE titel LIKE "%${req.params.query}%"`, (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
  // List SOME stories based on typografie
  .get('/typografie/:query', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query(`SELECT * FROM verhalen WHERE typeDisplay LIKE "%${req.params.query}%" OR typeCopyText LIKE "%${req.params.query}%"`, (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
  // List SOME stories based on color
  .get('/kleur/:query', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query(`SELECT * FROM verhalen WHERE color_one LIKE "%${req.params.query}%" OR color_two LIKE "%${req.params.query}%" OR color_three LIKE "%${req.params.query}%"`, (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
  // List SOME stories based on fontRatio
  .get('/fontRatio/:query', (req, res) => {
    req.getConnection((err, db) => {
      if (err) throw err
      db.query(`SELECT * FROM verhalen WHERE fontRatio LIKE "%${req.params.query}%"`, (err, dbres) => {
        if (err) throw err
        res.json(dbres)
      })
    })
  })
