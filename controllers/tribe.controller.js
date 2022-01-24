const Tribe = require('../models/tribe.model')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  const tribe = new Tribe({
    name: req.body.name,
    cohort: req.body.cohort,
    description: req.body.description,
    avatar: req.body.avatar,
    url: req.body.url,
  })

  tribe.create(tribe, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while creating the tribe.',
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  const name = req.query.name

  Tribe.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tribes.',
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Tutorial.findById(req.params.tribeId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Tribe with tribeId ${req.params.tribeId}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Tribe with tribeId ' + req.params.tribeId,
        })
      }
    } else res.send(data)
  })
}

exports.update = (req, res) => {}
