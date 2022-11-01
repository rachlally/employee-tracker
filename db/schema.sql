DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    departments_id INT NOT NULL,
    FOREIGN KEY (departments_id) 
    REFERENCES departments (id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    FOREIGN KEY (roles_id) 
    REFERENCES roles (id) ON DELETE CASCADE, 
    manager_id INT,
    FOREIGN KEY (manager_id) 
    REFERENCES employees (id) ON DELETE SET NULL
);