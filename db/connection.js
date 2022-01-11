const mysql = require('mysql2');
require("dotenv").config();

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

  module.exports = db;