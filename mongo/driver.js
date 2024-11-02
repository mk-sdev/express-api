const { MongoClient } = require('mongodb')
//* Najsampierw npm i mongodb

const uri = 'mongodb://localhost:27017' // URI
const client = new MongoClient(uri)
const database = client.db('mydbtest') // nazwa bazy danych
const collection = database.collection('users') // nazwa kolekcji

// Funkcja pobierająca dane z MongoDB
async function getDataFromMongoDriver(req) {
  try {
    await client.connect()

    // Przykład: pobieranie wszystkich dokumentów z kolekcji
    const data = await collection.find({}).toArray()
    return data
  } finally {
    await client.close()
  }
}

async function postDataToMongoDriver(req) {
  try {
    await client.connect()

    // Pobranie danych z req.body
    const dataToInsert = req.body

    // Wstawienie dokumentu do kolekcji
    const result = await collection.insertOne(dataToInsert)

    return result // Zwraca wynik operacji (można np. odesłać w odpowiedzi API)
  } finally {
    await client.close()
  }
}

module.exports = { getDataFromMongoDriver, postDataToMongoDriver }
