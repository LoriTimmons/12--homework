const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

//  Catchall route  (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start Sever 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });