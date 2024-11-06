// controller.js
const { client, database } = require('./config')
const collection = database.collection('users') // nazwa kolekcji

// Funkcja pobierająca dane z MongoDB
async function getDataFromMongoDriver(req) {
  try {
    await client.connect()
    const data = await collection.find({}).toArray()
    return data
  } finally {
    await client.close()
  }
}

// Funkcja dodająca dane do MongoDB
async function postDataToMongoDriver(req) {
  try {
    await client.connect()
    const dataToInsert = req.body
    const result = await collection.insertOne(dataToInsert)
    return result
  } finally {
    await client.close()
  }
}

module.exports = { getDataFromMongoDriver, postDataToMongoDriver }
