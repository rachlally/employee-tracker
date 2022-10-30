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
    INDEX dep_ind (departments_id),
    CONSTRAINT fk_departments FOREIGN KEY (departments_id) REFERENCES departments (id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    INDEX roles_ind (roles_id),
    CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roleS (id) ON DELETE CASCADE, 
    manager_id INT,
    INDEX mang_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees (id) ON DELETE SET NULL
);