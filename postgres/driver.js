const { Client } = require('pg')

// Konfiguracja połączenia z bazą danych
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'your_username', // Zastąp swoim użytkownikiem PostgreSQL
  password: 'your_password', // Zastąp swoim hasłem PostgreSQL
  database: 'mydbtest', // Nazwa bazy danych
})

// Funkcja pobierająca dane z PostgreSQL
async function getDataFromPostgres(req) {
  try {
    await client.connect() // Nawiązanie połączenia
    const result = await client.query('SELECT * FROM users') // Pobieranie wszystkich użytkowników
    return result.rows // Zwraca wiersze wyników
  } catch (err) {
    console.error('Error fetching data:', err)
    throw err // Rzuca błąd, jeśli wystąpił problem
  } finally {
    await client.end() // Zamknięcie połączenia
  }
}

// Funkcja dodająca dane do PostgreSQL
async function postDataToPostgres(req) {
  try {
    await client.connect() // Nawiązanie połączenia

    // Pobranie danych z req.body
    const { name, email } = req.body

    // Wstawienie nowego użytkownika do bazy danych
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *' // Zapytanie do bazy danych
    const values = [name, email] // Wartości do wstawienia
    const result = await client.query(query, values) // Wykonanie zapytania

    return result.rows[0] // Zwraca wstawiony wiersz
  } catch (err) {
    console.error('Error saving data:', err)
    throw err // Rzuca błąd, jeśli wystąpił problem
  } finally {
    await client.end() // Zamknięcie połączenia
  }
}

// Eksportowanie funkcji
module.exports = { getDataFromPostgres, postDataToPostgres }
