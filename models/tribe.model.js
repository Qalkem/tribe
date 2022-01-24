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

Tribe.getAll = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM tribe LIMIT ?,?`, [
    helper.getOffset(page, process.env.LIST_PER_PAGE),
    process.env.LIST_PER_PAGE,
  ])
  const data = helper.emptyOrRows(rows)
  const meta = { page }

  return {
    data,
    meta,
  }

  // let query = 'SELECT * FROM tribe'
  // db.query(query, (err, res) => {
  //   if (err) {
  //     console.log('Error: ', err)
  //     result(null, err)
  //     return
  //   }

  //   console.log('Tribes: ', res)
  //   result(null, res)
  // })
}

module.exports = Tribe
