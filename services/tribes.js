const db = require('./db')
const helper = require('../helper')

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, process.env.listPerPage)
  const rows = await db.query(
    `SELECT * 
    FROM tribe LIMIT ?,?`,
    [offset, process.env.listPerPage]
  )
  const data = helper.emptyOrRows(rows)
  const meta = { page }

  return {
    data,
    meta,
  }
}

module.exports = {
  getMultiple,
}
