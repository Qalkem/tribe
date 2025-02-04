const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new teams that checks if the passed object adheres the format
 * we need and throws errors if it doesn't
 * @param {*} team an object containing the necessary fields to make a new team
 */
const team = function (team) {
  // TODO: Check for sanity...
  this.teamId = team.teamId
  this.name = team.name
  this.description = team.description
  this.avatar = team.avatar
  this.url = team.url
}

/**
 * Add a new team to the database
 * @param {*} team a new team object created with the team constructor
 * @returns an object containing the inserted team with the newly inserted teamId
 */
team.create = async function (team) {
  const rows = await db.query(
    `INSERT INTO team SET name = ?, description = ?, avatar = ?, url = ?`,
    prepareForInsert(team)
  )
  team.teamId = rows.insertId
  return {
    data: [team],
    meta: {
      insertId: rows.insertId,
    },
  }
}

/**
 * Update a team in the database, should return a usefull message if anything
 * goes wrong.. but we still have to fix this..
 * @param {*} team the team object to be updated, created with the Team constructor
 * @returns an object with the updated team and some metadata
 */
team.update = async function (team) {
  const rows = await db.query(
    'UPDATE team SET name = ?, description = ?, avatar = ?, url = ? WHERE teamId = ?',
    prepareForUpdate(team)
  )
  return {
    data: [team],
    meta: {
      affectedRows: rows.affectedRows,
      changedRows: rows.changedRows,
    },
  }
}

team.remove = async function (teamId) {}
team.removeAll = async function () {}

/**
 * Find a corresponding team in the database using the passed teamId
 * @param {*} teamId a teamId to lookup in the database
 * @returns an object with the found team
 */
team.findById = async function (teamId) {
  const rows = await db.query(`SELECT * FROM team WHERE teamId = ?`, [teamId])
  return {
    data: helper.emptyOrRows(rows),
    meta: { teamId },
  }
}

/**
 * Get all teams from the database, will be paginated if the number of
 * teams in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of teams you want to get
 * @returns
 */
team.getAll = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM team LIMIT ?,?`, [
    helper.getOffset(page, process.env.LIST_PER_PAGE),
    process.env.LIST_PER_PAGE,
  ])
  console.log(rows)
  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

module.exports = team

/**
 * Prepares a passed team object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} team a new team object created with the team constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(team) {
  return [team.name, team.description, team.avatar, team.url]
}

/**
 * Prepares a passed team object for updating in the db, it's mostly an order
 * thing as the update query expects an array with a certain order.
 * @param {*} team the team object to be updated, created with the Team constructor
 * @returns an array to be used in the update query
 */
function prepareForUpdate(team) {
  // TODO: Check for sanity...
  return [...prepareForInsert(team), team.teamId]
}
