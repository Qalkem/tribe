const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new members that checks if the passed object adheres the format
 * we need and throws errors if it doesn't
 * @param {*} member an object containing the necessary fields to make a new member
 */
const member = function (member) {
  // TODO: Check for sanity...
  this.memberId = member.memberId
  this.squadId = member.squadId
  this.name = member.name
  this.prefix = member.prefix
  this.surname = member.surname
  this.description = member.description
  this.avatar = member.avatar
  this.url = member.url
  this.githubHandle = member.githubHandle
  this.nickname = member.nickname
  this.bio = member.bio
  this.type = member.type
}

/**
 * Add a new member to the database
 * @param {*} member a new member object created with the member constructor
 * @returns an object containing the inserted member with the newly inserted memberId
 */
member.create = async function (member) {
  const rows = await db.query(
    `INSERT INTO member SET name = ?, prefix = ?, surname = ?, description = ?, avatar = ?, url = ?, nickname = ?, githubHandle = ?, bio = ?, type = ?, squadId = ?`,
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
 *
 * @param {*} memberId
 * @param {*} member
 * @returns
 */
member.updateById = async function (memberId, member) {
  const rows = await db.query(
    `UPDATE member SET name = ?, prefix = ?, surname = ?, description = ?, avatar = ?, url = ?, nickname = ?, githubHandle = ?, bio = ?, type = ?, squadId = ?, WHERE memberId = ?`,
    [
      member.name,
      member.prefix,
      member.surname,
      member.description,
      member.avatar,
      member.url,
      member.nickname,
      member.githubHandle,
      member.bio,
      member.type,
      member.squadId,
      memberId,
    ]
  )
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

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

member.remove = async function (memberId) {}
member.removeAll = async function () {}

/**
 * Prepares a passed member object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} member a new member object created with the member constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(member) {
  return [
    member.name,
    member.prefix,
    member.surname,
    member.description,
    member.avatar,
    member.url,
    member.squadId,
    member.nickname,
    member.githubHandle,
    member.bio,
    member.type,
    member.squadId,
  ]
}

module.exports = member
