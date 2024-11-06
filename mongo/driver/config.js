// config.js
const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017' // URI bazy danych
const client = new MongoClient(uri)
const database = client.db('mydbtest') // nazwa bazy danych

module.exports = { client, database }
