const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// Middleware do parsowania JSON
app.use(express.json())

// Przykładowa trasa
app.get('/', (req, res) => {
  res.send('Witamy w aplikacji Express z MongoDB!')
})

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Aplikacja działa na porcie http://localhost:${port}`)
})

/////////

const { getDataFromMongoDriver } = require('./mongo/driver.js')
const { getDataFromMongoose } = require('./mongo/mongoose.js')
const { getDataFromPostgres } = require('./postgres/driver.js')

// Pobieranie wszystkich użytkowników
app.get('/users', async (req, res) => {
  // Pobieranie parametru `data` z zapytania
  const { db } = req.query
  try {
    switch (db) {
      case 'mongo':
        const mongoData = await getDataFromMongoDriver(req)
        res.send(mongoData)
        break
      case 'mongoose':
        const mongooseData = await getDataFromMongoose(req)
        res.send(mongooseData)
        break
      default:
        const postgresData = await getDataFromPostgres(req)
        res.send(postgresData)
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

const { postDataToMongoDriver } = require('./mongo/driver.js')
const { postDataToMongoose } = require('./mongo/mongoose.js')
const { postDataToPostgres } = require('./postgres/driver.js')

app.post('/users', async (req, res) => {
  const { db } = req.query
  try {
    switch (db) {
      case 'mongo':
        const data = await postDataToMongoDriver(req)
        res.send(data)
        break
      default:
        const data_ = await postDataToMongoose(req)
        res.send(data_)
    }
  } catch (err) {
    res.status(500).send(err)
  }
})
