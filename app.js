const express = require('express')
// const mongoose = require('mongoose')
const app = express()
const port = 3000

const connectDB = require('./mongo/mongoose/config')
// connectDB() //połącz z bazą za pomoca mongoose

// Middleware do parsowania JSON
app.use(express.json())

// Przykładowa trasa
app.get('/', (req, res) => {
  res.send('Witamy w aplikacji Express z MongoDB!')
})
app.use('/', require('./router'))

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Aplikacja działa na porcie http://localhost:${port}`)
})
