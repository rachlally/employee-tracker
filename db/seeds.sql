USE company_db;

INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Marketing"),
    ("Engineering"),
    ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Director of Sales", 110000, 1),
    ("Field Sales", 75000, 1),
    ("Director of Marketing", 130000, 2),
    ("Assistant Marketer", 65000, 2),
    ("Head Engineer", 250000, 3),
    ("Junior Engineer", 80000, 3),
    ("CFO", 300000, 4),
    ("Accountant", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Pam", "Owens", 1, NULL),
    ("Doug", "Smalls", 2, 1),
    