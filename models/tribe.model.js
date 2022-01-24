const db = require('./db')
const helper = require('./helper')

const Tribe = function (tribe) {
  this.tribeId = tribe.tribeId
  this.name = tribe.name
  this.cohort = tribe.cohort
  this.description = tribe.description
  this.avatar = tribe.avatar
  this.url = tribe.url
}

Tribe.create = async function (newTribe) {
  const rows = await db.query(`INSERT INTO tribe SET ?`, newTribe)
  return {
    data: helper.emptyOrRows(rows),
    meta: {}, //insertId?
  }
}

Tribe.findById = async function (tribeId) {
  const rows = await db.query(`SELECT * FROM tribe WHERE tribeId = ?`, [tribeId])
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

Tribe.getAll = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM tribe LIMIT ?,?`, [
    helper.getOffset(page, process.env.LIST_PER_PAGE),
    process.env.LIST_PER_PAGE,
  ])

  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

Tribe.updateById = async function (tribeId, tribe) {
  const rows = await db.query(
    'UPDATE tribe SET name = ?, cohort = ?, description = ?, avatar = ?, url = ? WHERE tribeId = ?',
    [tribe.name, tribe.cohort, tribe.description, tribe.avatar, tribe.url, tribeId]
  )
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

Tribe.remove = async function (tribeId) {}
Tribe.removeAll = async function () {}

module.exports = Tribe
