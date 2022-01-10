const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require("dotenv").config();

// PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MySQL Connection 
const db = mysql.createConnection(
  {
  database: process.env.db_NAME,
  user: process.env.db_USER,
  password: process.env.db_PW,
  host: 'localhost',
  },
  console.log('Connected to the employee database.')
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

db.query('SELECT * FROM employee', (err, rows) => {
  console.log(rows);
});

//  Catchall route  (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start Sever 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });