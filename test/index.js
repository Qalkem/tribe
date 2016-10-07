const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
var should = chai.should()

chai.use(chaiHttp)

describe('API', () => {
  describe('REST calls', () => {
    it('should list ALL stories on /stories GET')
    it('should list SOME stories on /stories/<query> GET')
    it('should list a SINGLE story on /story/<id> GET')
    it('should add a SINGLE story on /story POST')
    it('should patch a SINGLE story on /story/<id> PUT / PATCH')
    it('should delete a SINGLE story on /story/<id> DELETE')
  })
})
