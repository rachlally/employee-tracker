//Install packages
const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");

//Initialize program
loadPrompts();

//Program prompts
function loadPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "view_departments"
                },
                {
                    name: "View All Roles",
                    value: "view_roles"
                },
                {
                    name: "View All Employees",
                    value: "view_employees"
                },
                {
                    name: "Add Department",
                    value: "add_department"
                },
                {
                    name: "Add Role",
                    value: "add_role"
                },
                {
                    name: "Add Employee",
                    value: "add_employee"
                },
                {
                    name: "Update Employee Role",
                    value: "update_employee"
                },
                {
                    name: "End Program",
                    value: "end_program"
                }
            ]
        },
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case "view_departments":
                console.log("departments")
                viewDepartments();
                break;
            case "view_roles":
                console.log("roles")
                viewRoles();
                break;
            case "view_employees":
                console.log("employees")
                viewEmployees();
                break;
            case "add_department":
                console.log("add department")
                addDepartment();
                break;
            case "add_role":
                console.log("add role")
                addRole();
                break;
            case "add_employee":
                console.log("add employee")
                addEmployee();
                break;
            case "update_employee":
                console.log("update employee")
                updateEmployee();
                break;
            default:
                console.log("bye!")
                break;

        }
    })
};

//Viewable Tables with joining data
function viewDepartments() {
    db.query('SELECT departments.id AS ID, departments.name AS Department FROM departments', function (err, results) {
        console.table(results);
        loadPrompts();
    });
};

function viewRoles() {
    db.query('SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM roles JOIN departments ON roles.departments_id = departments.id', function (err, results) {
        console.table(results);
        loadPrompts();
    });
};

function viewEmployees() {
    db.query("SELECT employees.id AS ID, employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees JOIN roles on employees.roles_id = roles.id LEFT JOIN departments on roles.departments_id = departments.id LEFT JOIN employees manager on employees.manager_id = manager.id", function (err, results) {
        console.table(results);
        loadPrompts();
    });
};

//Return data from company_db
function getDepartments() {
    return db.promise().query("SELECT * FROM departments")
};

function getRoles() {
    return db.promise().query("SELECT * FROM roles")
};

function getEmployees() {
    return db.promise().query("SELECT * FROM employees")
};

//Functions to ADD to the database
function addDepartment() {

    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the Department?",
        },
    ]).then((response) => {
        db.query("INSERT INTO departments (name) VALUES (?)", [response.department], function (err, results) {
            console.log("Department Added");
            loadPrompts();
        })
    });
};

function addRole() {

    getDepartments().then((departments) => {
        const depart = departments[0].map((dept) =>
        ({
            name: dept.name,
            id: dept.id
        }));

        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the new role?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary?",
            },
            {
                type: "list",
                name: "choice",
                message: "What department is this role in?",
                choices: depart,
            }
        ]).then((response) => {
            const dept = depart.filter(dept => dept.name === response.choice)
            db.query("INSERT INTO roles(title, salary, departments_id) VALUES (?, ?, ?)", [response.title, response.salary, dept[0].id], function (err, results) {
                loadPrompts();
            })
        });
    })
};


function addEmployee() {

    getRoles().then((roles) => {
        let rolesTable = roles[0].map((role) =>
        ({
            name: role.title,
            value: role.id
        }));

    getEmployees().then((employees) => {
        let employeesTable = employees[0].map((employee) =>
        ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));

            inquirer.prompt([
                {
                    type: "input",
                    name: "new_first",
                    message: "Employee's first name?",
                },
                {
                    type: "input",
                    name: "new_last",
                    message: "Employee's last name?",
                },
                {
                    type: "list",
                    name: "new_role",
                    message: "What is their role?",
                    choices: rolesTable,
                },
                {
                    type: "list",
                    name: "new_manager",
                    message: "Who is their manager?",
                    choices: employeesTable,
                }
            ]).then((response) => {                
                db.query("INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)", [response.new_first, response.new_last, response.new_role, response.new_manager], function (err, results) {
                    loadPrompts();
                })
            });

        })
    })
};

function updateEmployee() {

    getEmployees().then((employees) => {
        let employeeArray = employees[0].map((employee) =>
        ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));

    getRoles().then((roles) => {
        let roleArray = roles[0].map((role) =>
        ({
            name: role.title,
            value: role.id
        }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_choice",
                    message: "Which employee would you like to update?",
                    choices: employeeArray
                },
                {
                    type: "list",
                    name: "role_choice",
                    message: "What is their role?",
                    choices: roleArray
                }
            ]).then((response) => {                
                db.query("UPDATE employees SET roles_id = ? WHERE id = ?", [response.role_choice, response.employee_choice], function (err, results) {
                    loadPrompts();
                })

            })
        })

    })
}


