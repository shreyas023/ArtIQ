// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'login_auth',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Insert user into the database
  const query = 'INSERT INTO login_register (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Registration failed: ' + err.message);
      res.status(500).send('Registration failed');
      return;
    }

    console.log('User registered:', result);
    res.status(200).send('Registration successful');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
