/* global describe, it */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
var should = chai.should()

chai.use(chaiHttp)

describe('API', () => {
  describe('REST calls', () => {
    it('should list ALL stories on /stories GET', (done) => {
      chai.request(server)
        .get('/stories')
        .end((err, res) => {
          if (err) throw (err)
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          // TODO: test structure of objects against schema?
          done()
        })
    })
    it('should list SOME stories on /stories/<query> GET', (done) => {
      chai.request(server)
        .get('/stories/some search string')
        .end((err, res) => {
          if (err) throw (err)
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          // TODO: test structure of objects against schema?
          done()
        })
    })
    it('should list a SINGLE story on /story/<id> GET', (done) => {
      chai.request(server)
        .get('/story/1')
        .end((err, res) => {
          if (err) throw (err)
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          // TODO: test structure of object against schema?
          done()
        })
    })
    it('should add a SINGLE story on /story POST', (done) => {
      chai.request(server)
        .post('/story')
        .send({'title': 'whatever'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('SUCCESS')
          res.body.SUCCESS.should.have.property('title')
          res.body.SUCCESS.should.have.property('id')
          res.body.SUCCESS.title.should.equal('whatever')
          done()
        })
    })
    it('should patch a SINGLE story on /story/<id> PUT / PATCH')
    it('should delete a SINGLE story on /story/<id> DELETE')
  })
})
