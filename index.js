const express = require("express");
const db = require("./db/connection");
// const apiRoutes = require('./routes/apiRoutes');
const inquirer = require("inquirer");

const consoleTable = require("console.table");

// Start's application once connection is established.
db.connect(function (err) {
  if (err) throw err;
  startMenu();
});

// Welcome Message
console.table("EMPLOYEE TRACKER");

const startMenu = async () => {
  try {
    let answer = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Quit",
      ],
    });
    switch (answer.action) {
      case "View Employees":
        viewEmployee();
        break;

      case "View Departments":
        viewDepartment();
        break;

      case "View Roles":
        viewRole();
        break;

      case "Add Employee":
        employeeAdd();
        break;
      case "Add Department":
        departmentAdd();
        break;

      case "Add Role":
        roleAdd();
        break;

      case "Update Employee Role":
        employeeUpdate();
        break;

      case "Quit":
        db.end();
        break;
    }
  } catch (err) {
    console.log(err);
    startMenu();
  }
};

function viewDepartment() {
  db.query("SELECT * FROM department", (err, results) => {
    console.table(results);
    startMenu();
  });
}

function viewRole() {
  db.query("SELECT * FROM role", (err, results) => {
    console.table(results);
    startMenu();
  });
}

function viewEmployee() {
  db.query("SELECT * FROM employee", (err, results) => {
    console.table(results);
    startMenu();
  });
}

function departmentAdd() {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "What department would you like to add?",
    })
    .then((answer) => {
      db.query(
        `INSERT INTO department (name) VALUES('${answer.departmentName}')`,
        (err) => {
          if (err) throw err;
          console.log("Department created!");
          startMenu();
        }
      );
    });
}

function roleAdd() {
  db.query("SELECT * FROM department", (err, results) => {
    var departmentChoices = results.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    console.log(departmentChoices);

    const answers = inquirer
      .prompt([
        {
          type: "input",
          name: "titleName",
          message: "What title would you like to add?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this role?",
        },
        {
          type: "list",
          name: "departmentId",
          message: "What department does this role belong to?",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES(
        '${answers.titleName}', ${answers.salary}, ${answers.departmentId})`,
          (err) => {
            if (err) throw err;
            console.log("Role created!");
            startMenu();
          }
        );
      });
  });
}

// first_name, last_name, role_id, manager_id
function employeeAdd() {
  db.query("SELECT * FROM role", (err, results) => {
    var roleChoices = results.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    db.query("SELECT * FROM employee", (err, results) => {
      var managerChoices = results.map((manager) => ({
        name: manager.first_name,
        value: manager.id,
      }));
  inquirer.prompt ([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the employee?",
    },
    {
      type: "list",
      name: "roleId",
      message: "What role is this employee",
      choices: roleChoices
    },
    {
      type: "list",
      name: "managerId",
      message: "Who is the manager of this employee",
      choices: managerChoices
    },
  ]).then((answers) => {
    console.log(answers);
    db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(
    '${answers.first_name}', '${answers.last_name}', ${answers.roleId}, ${answers.managerId})`,
      (err) => {
        if (err) throw err;
        console.log("Employee created!");
        startMenu();
      })
    })
    })
  })
}

// Update employee 
function  employeeUpdate() {
  db.query("SELECT * FROM role", (err, results) => {
    var roleChoices = results.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    db.query("SELECT * FROM employee", (err, results) => {
      var employeeChoices = results.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      console.log(employeeChoices);
      inquirer.prompt ([
        {
      type: "list",
      name: "employeeId",
      message: "Which employee are you updating?",
      choices: employeeChoices
    },
    {
      type: "list",
      name: "roleId",
      message: "What is the new role?",
      choices: roleChoices
    },
  ]).then((answers) => {
    console.log("answers", answers);
    db.query(
      "UPDATE employee SET role_id = ? WHERE id = ?", [answers.roleId, answers.employeeId],
      (err) => {
        if (err) throw err;
        console.log("This employee was updated!");
        startMenu();
      })
    })
    })
  })
}


