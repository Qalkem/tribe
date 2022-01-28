const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new members that checks if the passed object adheres the format
 * we need and throws errors if it doesn't
 * @param {*} member an object containing the necessary fields to make a new member
 */
const member = function (member) {
  // TODO: Check for sanity...
  this.memberId = member.memberId || null
  this.squadId = member.squadId
  this.type = member.type
  this.nickname = member.nickname
  this.name = member.name
  this.prefix = member.prefix
  this.surname = member.surname
  this.avatar = member.avatar
  this.githubHandle = member.githubHandle
  this.bio = member.bio
  this.url = member.url
}

/**
 * Add a new member to the database
 * @param {*} member a new member object created with the member constructor
 * @returns an object containing the inserted member with the newly inserted memberId
 */
member.create = async function (member) {
  const rows = await db.query(
    `INSERT INTO member SET squadId = ?, type = ?, nickname = ?, name = ?, prefix = ?, surname = ?, avatar = ?, githubHandle = ?, bio = ?, url = ?`,
    prepareForInsert(member)
  )
  member.memberId = rows.insertId
  return {
    data: [member],
    meta: {
      insertId: rows.insertId,
    },
  }
}

/**
 * Update a member in the database, should return a usefull message if anything
 * goes wrong.. but we still have to fix this..
 * @param {*} member the member object to be updated, created with the Member constructor
 * @returns an object with the updated member and some metadata
 */
member.update = async function (member) {
  const rows = await db.query(
    `UPDATE member SET squadId = ?, type = ?, nickname = ?, name = ?, prefix = ?, surname = ?, avatar = ?, githubHandle = ?, bio = ?, url = ? WHERE memberId = ?`,
    prepareForUpdate(member)
  )
  return {
    data: [member],
    meta: {
      affectedRows: rows.affectedRows,
      changedRows: rows.changedRows,
    },
  }
}

member.remove = async function (memberId) {}
member.removeAll = async function () {}

/**
 * Find a corresponding member in the database using the passed memberId
 * @param {*} memberId a memberId to lookup in the database
 * @returns an object with the found member
 */
member.findById = async function (memberId) {
  const rows = await db.query(`SELECT * FROM member WHERE memberId = ?`, [memberId])
  return {
    data: helper.emptyOrRows(rows),
    meta: { memberId },
  }
}

/**
 * Get all members from the database, will be paginated if the number of
 * members in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of members you want to get
 * @returns
 */
member.getAll = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM member LIMIT ?,?`, [
    helper.getOffset(page, process.env.LIST_PER_PAGE),
    process.env.LIST_PER_PAGE,
  ])

  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

module.exports = member

/**
 * Prepares a passed member object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} member a new member object created with the member constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(member) {
  return [
    member.squadId,
    member.type,
    member.nickname,
    member.name,
    member.prefix,
    member.surname,
    member.avatar,
    member.githubHandle,
    member.bio,
    member.url,
  ]
}

/**
 * Prepares a passed member object for updating in the db, it's mostly an order
 * thing as the update query expects an array with a certain order.
 * @param {*} member the member object to be updated, created with the Member constructor
 * @returns an array to be used in the update query
 */
function prepareForUpdate(member) {
  // TODO: Check for sanity...
  return [...prepareForInsert(member), member.memberId]
}
