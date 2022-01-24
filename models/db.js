const mysql = require('mysql')

module.exports.connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })
  .connect((error) => {
    if (error) throw error
    console.log('Successfully connected to the database.')
  })
