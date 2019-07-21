const { Client } = require('pg')

const client = new Client({
    user: process.env.USER_DB,
    host: 'localhost',
    database: 'simplon_exercice',
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
})

client.connect()

module.exports = client