const { Client } = require('pg')

// Create a connection to the database
const connection = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  port: 5432,
})
connection.connect()

module.exports = connection;