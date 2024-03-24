const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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
app.post('/register', async (req, res) => {
  console.log(req.body); // Log the request body to debug
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = 'INSERT INTO login_register (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Registration failed: ' + err.message);
        return res.status(500).send('Registration failed');
      }

      console.log('User registered:', result);
      console.log('sab theek toh hai');
      res.redirect('/home.html');
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check user in the database
  const query = 'SELECT * FROM login_register WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Login failed: ' + err.message);
      res.status(500).send('Login failed');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('User not found');
      return;
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.redirect('/home.html');
    } else {
      res.status(401).send('Password is incorrect');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
