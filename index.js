const express = require('express');
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');

const consoleTable = require('console.table');
// const Department = require('./lib/Department');
// const Employee = require('./lib/Employee');
// const Role = require('./lib/Role');


// // rout test 
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World'
//   });
// });

// // query selector - test
// db.query('SELECT * FROM Roles', (err, rows) => {
//   console.log(rows);
// });

// Start's application once connection is established.
db.connect(function (err){
  if (err) throw err;
  startMenu();
})

// Welcome Message
console.table(
  "EMPLOYEE TRACKER"
)

const startMenu = async() => {
  try {
    let answer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit'
        ]
    });
    switch (answer.action) {
      case 'View Employees':
          viewEmployee();
          break;

      case 'View Departments':
          viewDepartment();
          break;

      case 'View Roles':
          viewRole();
          break;

      case 'Add Employees':
          employeeAdd();
          break
      case 'Add Department':
          departmentAdd();
          break

      case 'Add Roles':
          roleAdd();
          break

      case 'Update Employee Role':
          employeeUpdate();
          break

      case 'Quit':
          db.end();
          break;
  };
} catch (err) {
  console.log(err);
  startMenu();
};
}

function viewDepartment () {

db.query('SELECT * FROM department', (err, results) => {
  console.table(results);
  startMenu();
});
}

function viewRole () {
  db.query('SELECT * FROM role', (err, results) => {
    console.table(results);
    startMenu();
  });
}

function viewEmployee() {
  db.query('SELECT * FROM employee', (err, results) => {
    console.table(results);
    startMenu();
  });
}

function departmentAdd() {
  inquirer.prompt (
    {
      type:"input",
      name: "departmentName",
      message: "What department would you like to add?"
    }
  ).then ((answer)=> {
    db.query(`INSERT INTO department (name) VALUES('${answer.departmentName}')`, (err) => {
      if(err) throw err;
      console.log("Department created!");
      startMenu();
  })
  })
}


function roleAdd() {
  inquirer.prompt (
    {
      type:"input",
      name: "roleName",
      message: "What role would you like to add?"
    },
    {
      type:"input",
      name: "salary",
      message: "What salary would you like to add?"
    },
    {
      type:"list",
      name: "salary",
      message: "What department id is this role associated with?"
    },
)}


// add a role 
// add employee 
// update employee role 
// Follow the same s for the role 
