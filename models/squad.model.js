const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new squads that checks if the passed object adheres the format
 * we need and throws errors if it doesn't
 * @param {*} squad an object containing the necessary fields to make a new squad
 */
const Squad = function (squad) {
  // TODO: Check for sanity...
  this.squadId = squad.squadId
  this.tribeId = squad.tribeId
  this.name = squad.name
  this.description = squad.description
  this.avatar = squad.avatar
  this.url = squad.url
}

/**
 * Add a new squad to the database
 * @param {*} squad a new squad object created with the squad constructor
 * @returns an object containing the inserted squad with the newly inserted squadId
 */
squad.create = async function (squad, tribeId) {
  const rows = await db.query(
    `INSERT INTO squad SET name = ?, squadId= ?, tribeId= ${tribeId}, description = ?, avatar = ?, url = ?`,
    prepareForInsert(squad)
  )
  squad.squadId = rows.insertId
  return {
    data: [squad],
    meta: {
      insertId: rows.insertId,
    },
  }
}

/**
 * Find a corresponding squad in the database using the passed squadId
 * @param {*} squadId a squadId to lookup in the database
 * @returns an object with the found squad
 */
squad.findById = async function (squadId) {
  const rows = await db.query(`SELECT * FROM squad WHERE squadId = ?`, [squadId])
  return {
    data: helper.emptyOrRows(rows),
    meta: { squadId },
  }
}

/**
 * Get all squads from the database, will be paginated if the number of
 * squads in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of squads you want to get
 * @returns
 */
squad.getAll = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM squad LIMIT ?,?`, [
    helper.getOffset(page, process.env.LIST_PER_PAGE),
    process.env.LIST_PER_PAGE,
  ])

  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

/**
 *
 * @param {*} squadId
 * @param {*} squad
 * @returns
 */
squad.updateById = async function (squadId, squad) {
  const rows = await db.query(
    'UPDATE squad SET name = ?, tribeId = ?, description = ?, avatar = ?, url = ? WHERE squadId = ?',
    [squad.name, squad.tribeId, squad.description, squad.avatar, squad.url, squadId]
  )
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

squad.remove = async function (squadId) {}
squad.removeAll = async function () {}

/**
 * Prepares a passed squad object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} squad a new squad object created with the squad constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(squad) {
  return [squad.name, squad.tribeId, squad.description, squad.avatar, squad.url]
}

module.exports = squad
