USE company_db;

INSERT INTO departments (name)
VALUES 
    ("Sales"),
    ("Marketing"),
    ("Engineering"),
    ("Finance");

INSERT INTO roles (title, salary, departments_id)
VALUES
    ("Director of Sales", 110000, 1),
    ("Salesperson", 75000, 1),

    ("Director of Marketing", 130000, 2),
    ("Assistant Marketer", 65000, 2),

    ("Head Engineer", 250000, 3),
    ("Junior Engineer", 80000, 3),
    
    ("Account Manager", 300000, 4),
    ("Accountant", 150000, 4);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
    ("Pam", "Owens", 1, NULL),
    ("Doug", "Smalls", 2, 1),
    ("Gina", "Visalli", 3, NULL),
    ("Matt", "King", 4, 3),
    ("Donald", "Wright", 5, NULL),
    ("Ted", "Lasso", 6, 5),
    ("Suzy", "Greenberg", 7, NULL),
    ("Tela", "Wilson", 8, 7);
