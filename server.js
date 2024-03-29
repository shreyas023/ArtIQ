const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

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
      res.redirect('/homepage.html');
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).send('Internal Server Error');
  }
});

const multer  = require('multer');
const upload = multer();

app.post('/teacher', upload.none(), async (req, res) => {
  console.log(req.body); // Log the request body to debug
  const { Name, Email, Class, Course_name, Message, Time, Price } = req.body;

  const query = 'INSERT INTO teacher (Name, Email, Class, Course_name, Message, Time, Price) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [Name, Email, Class, Course_name, Message, Time, Price], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.redirect('/homepage.html');
    }
  })
})

app.post('/payment',upload.none(), (req, res) => {
  console.log(req.body); // Log the request body to debug
  const { fname, card_type, card_number, expiry, cvv, pin, amount } = req.body;

  const query = 'INSERT INTO payment (fname, card_type, card_number, expiry, cvv, pin, amount) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [fname, card_type, card_number, expiry, cvv, pin, amount], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.redirect('/homepage.html?name='+fname);
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
