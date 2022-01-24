const db = require('./db')
const helper = require('../helper')

module.exports.getMultiple = async function (page = 1) {
  const offset = helper.getOffset(page, process.env.LIST_PER_PAGE)
  const rows = await db.query(`SELECT * FROM tribe LIMIT ?,?`, [offset, process.env.LIST_PER_PAGE])
  const data = helper.emptyOrRows(rows)
  const meta = { page }

  return {
    data,
    meta,
  }
}
