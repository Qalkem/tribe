const db = require('./db')

const Tribe = function (tribe) {
  this.tribeId = tribe.tribeId
  this.name = tribe.name
  this.cohort = tribe.cohort
  this.description = tribe.description
  this.avatar = tribe.avatar
  this.url = tribe.url
}

Tribe.create = (newTribe, result) => {
  db.query('INSERT INTO tribe SET ?', newTribe, (err, res) => {
    if (err) {
      console.log('Error: ', err)
      result(err, null)
      return
    }

    console.log('Created tribe: ', { tribeId: res.insertId, ...newTribe })
    result(null, { tribeId: res.insertId, ...newTribe })
  })
}

Tribe.findById = (tribeId, result) => {
  db.query(`SELECT * FROM tribe WHERE tribId = ${tribeId}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('Found tribe: ', res[0])
      result(null, res[0])
      return
    }

    // Didn't find a tribe with the id
    result({ kind: 'not_found' }, null)
  })
}

Tribe.getAll = (name, result) => {
  let query = 'SELECT * FROM tribe'

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`
  }

  db.query(query, (err, res) => {
    if (err) {
      console.log('Error: ', err)
      result(null, err)
      return
    }

    console.log('Tribes: ', res)
    result(null, res)
  })
}

Tribe.updateById = (tribeId, tribe, result) => {
  db.query(
    'UPDATE tribe SET name = ?, cohort = ?, description = ?, avatar = ?, url = ? WHERE tribeId = ?',
    [tribe.name, tribe.cohort, tribe.description, tribe.avatar, tribe.url, tribeId],
    (err, res) => {
      if (err) {
        console.log('Error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: 'not_found' }, null)
        return
      }

      console.log('Updated tutorial: ', { tribeId: tribeId, ...tribe })
      result(null, { tribeId: tribeId, ...tribe })
    }
  )
}

Tribe.remove = (tribeId, result) => {
  db.query('DELETE FROM tribe WHERE tribeId = ?', tribeId, (err, res) => {
    if (err) {
      console.log('Error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: 'not_found' }, null)
      return
    }

    console.log('Deleted tutorial with id: ', tribeId)
    result(null, res)
  })
}

Tribe.removeAll = (result) => {
  db.query('DELETE FROM tribe', (err, res) => {
    if (err) {
      console.log('Error: ', err)
      result(null, err)
      return
    }

    console.log(`Deleted ${res.affectedRows} tutorials`)
    result(null, res)
  })
}

module.exports = Tribe
