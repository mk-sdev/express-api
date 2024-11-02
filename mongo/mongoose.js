const mongoose = require('mongoose')
//* Najsampierw npm i mongoose

// Połączenie z MongoDB
const uri = 'mongodb://localhost:27017/mydbtest'; // URI bazy danych
mongoose.connect(uri);

// Definiowanie schematu użytkownika
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
})

// Tworzenie modelu na podstawie schematu
const User = mongoose.model('User', userSchema)

// Funkcja pobierająca dane z MongoDB
async function getDataFromMongoose(req) {
  try {
    // Pobieranie wszystkich dokumentów z kolekcji
    const data = await User.find() // find() zwraca wszystkie dokumenty
    return data
  } catch (err) {
    console.error('Error fetching data:', err)
    throw err // Rzuca błąd, jeśli wystąpił problem
  }
}

// Funkcja dodająca dane do MongoDB
async function postDataToMongoose(req) {
  try {
    // Pobranie danych z req.body
    const dataToInsert = req.body

    // Tworzenie nowego dokumentu
    const newUser = new User(dataToInsert)

    // Zapisanie dokumentu w bazie
    const result = await newUser.save()

    return result // Zwraca zapisany dokument
  } catch (err) {
    console.error('Error saving data:', err)
    throw err // Rzuca błąd, jeśli wystąpił problem
  }
}

// Eksportowanie funkcji
module.exports = { getDataFromMongoose, postDataToMongoose }
