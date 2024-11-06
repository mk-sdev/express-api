const express = require('express')
const router = express.Router()
const { getDataFromMongoDriver } = require('./mongo/driver/controller.js')
const { getDataFromMongoose } = require('./mongo/mongoose/controller.js')
const { getDataFromPostgres } = require('./postgres/driver.js')

router.get('/users', async (req, res) => {
  // Pobieranie parametru `data` z zapytania
  const { db } = req.query
  try {
    switch (db) {
      case 'mongo-driver':
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

const { postDataToMongoDriver } = require('./mongo/driver/controller.js')
const { postDataToMongoose } = require('./mongo/mongoose/controller.js')
const { postDataToPostgres } = require('./postgres/driver.js')

router.post('/', async (req, res) => {
  const { db } = req.query
  try {
    switch (db) {
      case 'mongo-driver':
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

module.exports = router
