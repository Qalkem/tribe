const db = require('./db')
const helper = require('./helper')

const Tribe = function (tribe) {
  // Check for sanity?
  this.tribeId = tribe.tribeId
  this.name = tribe.name
  this.cohort = tribe.cohort
  this.description = tribe.description
  this.avatar = tribe.avatar
  this.url = tribe.url
}

Tribe.create = async function (tribe) {
  const rows = await db.query(
    `INSERT INTO tribe SET name = ?, cohort = ?, description = ?, avatar = ?, url = ?`,
    prepareForInsert(tribe)
  )
  tribe.tribeId = rows.insertId
  return {
    data: [tribe],
    meta: {
      insertId: rows.insertId,
    },
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

/**
 * Prepares a passed tribe object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} tribe a new tribe object created with the Tribe constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(tribe) {
  return [tribe.name, tribe.cohort, tribe.description, tribe.avatar, tribe.url]
}

module.exports = Tribe
