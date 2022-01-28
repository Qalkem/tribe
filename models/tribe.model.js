const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new tribes that checks if the passed object adheres the format
 * we need and throws errors if it doesn't
 * @param {*} tribe an object containing the necessary fields to make a new tribe
 */
const Tribe = function (tribe) {
  // TODO: Check for sanity...
  this.tribeId = tribe.tribeId
  this.name = tribe.name
  this.cohort = tribe.cohort
  this.description = tribe.description
  this.avatar = tribe.avatar
  this.url = tribe.url
}

/**
 * Add a new tribe to the database
 * @param {*} tribe a new tribe object created with the Tribe constructor
 * @returns an object containing the inserted tribe with the newly inserted tribeId
 */
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

/**
 * Update a tribe in the database, should return a usefull message if anything
 * goes wrong.. but we still have to fix this..
 * @param {*} tribe the tribe object to be updated, created with the Tribe constructor
 * @returns
 */
Tribe.updateById = async function (tribe) {
  const rows = await db.query(
    'UPDATE tribe SET name = ?, cohort = ?, description = ?, avatar = ?, url = ? WHERE tribeId = ?',
    prepareForUpdate(tribe)
  )
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

Tribe.remove = async function (tribeId) {}
Tribe.removeAll = async function () {}

/**
 * Find a corresponding tribe in the database using the passed tribeId
 * @param {*} tribeId a tribeId to lookup in the database
 * @returns an object with the found tribe
 */
Tribe.findById = async function (tribeId) {
  const rows = await db.query(`SELECT * FROM tribe WHERE tribeId = ?`, [tribeId])
  return {
    data: helper.emptyOrRows(rows),
    meta: { tribeId },
  }
}

/**
 * Get all tribes from the database, will be paginated if the number of
 * tribes in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of tribes you want to get
 * @returns
 */
Tribe.getAll = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM tribe LIMIT ?,?`, [
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

module.exports = Tribe

/**
 * Prepares a passed tribe object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} tribe a new tribe object created with the Tribe constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(tribe) {
  // TODO: Check for sanity...
  return [tribe.name, tribe.cohort, tribe.description, tribe.avatar, tribe.url]
}

/**
 * Prepares a passed tribe object for updating in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} tribe the tribe object to be updated, created with the Tribe constructor
 * @returns an array to be used in the update query
 */
function prepareForUpdate(tribe) {
  // TODO: Check for sanity...
  return [...prepareForInsert(tribe), tribe.tribeId]
}
