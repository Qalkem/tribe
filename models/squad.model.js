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
Squad.create = async function (squad) {
  const rows = await db.query(
    `INSERT INTO squad SET name = ?, description = ?, avatar = ?, url = ?, tribeId= ?`,
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
 * Update a squad in the database, should return a usefull message if anything
 * goes wrong.. but we still have to fix this..
 * @param {*} squad the squad object to be updated, created with the Squad constructor
 * @returns an object with the updated team and some metadata
 */
Squad.update = async function (squad) {
  const rows = await db.query(
    'UPDATE squad SET name = ?, description = ?, avatar = ?, url = ?, tribeId = ? WHERE squadId = ?',
    prepareForUpdate(squad)
  )
  return {
    data: [squad],
    meta: {
      affectedRows: rows.affectedRows,
      changedRows: rows.changedRows,
    },
  }
}

Squad.remove = async function (squadId) {}
Squad.removeAll = async function () {}

/**
 * Find a corresponding squad in the database using the passed squadId
 * @param {*} squadId a squadId to lookup in the database
 * @returns an object with the found squad
 */
Squad.findById = async function (squadId) {
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
Squad.getAll = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM squad LIMIT ?,?`, [
    helper.getOffset(page, process.env.LIST_PER_PAGE),
    process.env.LIST_PER_PAGE,
  ])

  return {
    data: helper.emptyOrRows(rows),
    meta: {
      page: page,
      limit: process.env.LIST_PER_PAGE,
    },
  }
}

module.exports = Squad

/**
 * Prepares a passed squad object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} squad a new squad object created with the squad constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(squad) {
  return [squad.name, squad.description, squad.avatar, squad.url, squad.tribeId]
}

/**
 *
 * @param {*} squad
 * @returns
 */
function prepareForUpdate(squad) {
  // TODO: Check for sanity...
  return [...prepareForInsert(squad), squad.squadId]
}
