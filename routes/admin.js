const express = require('express')
const https = require('https')
const config = require('../config')

module.exports = express.Router()

  // Personal admin page
  .get('/', (req, res) => {
    if (req.session.login) {
      req.getConnection((err, db) => {
        if (err) throw err
        // Verify if the user is already in our db and update the lastlogin time
        db.query(`UPDATE user SET lastlogin = NOW() WHERE hvaId = "${req.session.studentid}"`, (err, response) => {
          if (err) throw err
          // User doesn't exist locally create it
          if (response.affectedRows === 0) {
            db.query(`INSERT INTO user (hvaId, name, email, lastlogin) VALUES ("${req.session.studentid}", "${req.session.fullname}", "${req.session.email}", NOW())`)
          }
          db.query(`SELECT * FROM verhalen WHERE hvaId = "${req.session.studentid}"`, (err, response) => {
            if (err) throw err
            // add an add button when there are less than three stories
            if (response.length <= 2) {
              response.push({
                verhaalId: 'add',
                titel: 'Toevoegen',
                imgMedium: 'plus-icon-black.png'
              })
            }
            res.locals.stories = response
            res.locals.session = req.session
            res.render('admin/index')
          })
        })
      })
    } else {
      res.redirect(req.baseUrl + '/login')
    }
  })

  .get('/mod/add', (req, res) => {
    if (req.session.login) {
      req.getConnection((err, db) => {
        if (err) throw err
        // Select all stories for the designer panel
        db.query(`SELECT * FROM verhalen WHERE hvaId = "${req.session.studentid}"`, (err, response) => {
          if (err) throw err
          // add an add button when there are less than three stories
          if (response.length <= 2) {
            response.push({
              verhaalId: 'add',
              titel: 'Toevoegen',
              imgMedium: 'plus-icon-black.png'
            })
          }
          res.locals.stories = response
          res.locals.session = req.session
          res.locals.story = { // stub for add form
            verhaalId: null,
            hvaId: null,
            verhaalnr: null,
            genre: null,
            sfeerwoord: null,
            tags: null,
            titel: null,
            imgSmall: null,
            sizeSmall: null,
            imgeMedium: null,
            sizeMedium: null,
            imgLarge: null,
            sizeLarge: null,
            imgXLarge: null,
            sizeXLarge: null,
            typeDisplay: null,
            typeCopyText: null,
            fontRatio: null,
            color_one: null,
            color_two: null,
            vak: null,
            datum: null
          }
          // Present the form
          res.render('admin/storyform')
        })
      })
    } else {
      res.redirect(req.baseUrl + '/login')
    }
  })

  .post('/mod/add', (req, res) => {
    // console.log(req.body)
    if (req.session.login) {
      req.getConnection((err, db) => {
        if (err) throw err

        let insert = {}
        insert.cols = Object.keys(req.body).filter((value, index) => req.body[value] !== '')
        insert.vals = insert.cols.map((value, index) => req.body[value])

        db.query('INSERT INTO verhalen (hvaId, ' + insert.cols.join(', ') + ', datum) VALUES ("' + req.session.studentid + '", "' + insert.vals.join('", "') + '", NOW())', (err, response) => {
          if (err) throw err
          res.redirect(req.baseUrl)
        })
      })
    }
  })

  .get('/mod/:query', (req, res) => {
    console.log('mod nr ' + req.params.query)
  })

  // Show the login form
  .get('/login', (req, res) => {
    res.render('login')
  })

  // Authenticate against oege
  .post('/login', (req, res) => {
    ldapLogin(req.body, (err, data) => {
      if (err) throw (err)
      if (typeof data.error !== 'undefined' && data.error === 0) {
        req.session.studentid = data.studentid || data.userid
        req.session.fullname = data.fullname
        req.session.email = data.mail
        req.session.login = true
        // TODO: log the login succes
        // TODO: store the username, id and email in the db, store the db id in the session

        res.redirect(req.baseUrl)
      } else {
        // TODO: uh oh, something went wrong.. find out what and tell the user
        // TODO: log the login attempt
        res.locals.url = req.baseUrl + '/' + req.params.action
        res.render('login')
      }
    })
  })

  // Logout and redirect
  .get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect(req.baseUrl)
    })
  })

var ldapLogin = function (user, done) {
  if (typeof user.username === 'undefined' || typeof user.password === 'undefined') {
    done('Missing username and/or password', null)
  } else {
    config.https_auth.path += '?username=' + user.username + '&password=' + user.password
    https.get(config.https_auth, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
        .on('end', () => { done(null, JSON.parse(data)[0]) })
        .on('error', (err) => { done(`Problem with LDAP login: ${err.message}`, null) })
    })
  }
}
