DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL
);

