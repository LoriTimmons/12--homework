DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Employees;

CREATE TABLE Department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE Roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE Employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30), 
  last_name VARCHAR(30),
  role_id INTEGER NOT NULL,
  manager_id INTEGER
);

