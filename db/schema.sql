DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS employee;


CREATE TABLE departments (
  departments_id INT AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE employee_role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  departments_id INT NOT NULL,
  PRIMARY KEY (id),
  
);
CREATE TABLE employee(
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);