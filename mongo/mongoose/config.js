const mongoose = require('mongoose')
//* Najsampierw npm i mongoose

// Połączenie z MongoDB
const uri = 'mongodb://localhost:27017/mydbtest' // URI bazy danych
mongoose.connect(uri)

// Łączymy się z bazą danych MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri) // Usuń opcje useNewUrlParser i useUnifiedTopology
    console.log('Połączono z MongoDB')
  } catch (err) {
    console.error('Błąd połączenia z MongoDB', err)
    process.exit(1) // Zakończ aplikację przy błędzie
  }
}

module.exports = connectDB
