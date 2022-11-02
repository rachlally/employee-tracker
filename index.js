//install packages
const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");

loadPrompts();

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

function getDepartments() {
    return db.promise().query("SELECT * FROM departments")
};

function getRoles() {
    return db.promise().query("SELECT * FROM roles")
};

function getEmployees() {
    return db.promise().query("SELECT * FROM employees")
};

function addRole() {
    getDepartments().then((departments) => {
        const depart = departments[0].map((dept) =>
        ({
            name: dept.name,
            id: dept.id
        }))
        console.log(depart)
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the role?",
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
            console.log(response.choice)
            const dept = depart.filter(dept => dept.name === response.choice)
            console.log(dept)
            db.query("INSERT INTO roles(title, salary, departments_id) VALUES (?, ?, ?)", [response.title, response.salary, dept[0].id], function (err, results) {
                loadPrompts();
            })
        });
    })
};


function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "Employee's first name?",
        },
        {
            type: "input",
            name: "last",
            message: "Employee's last name?",
        }
    ]).then((response) => {
        const employeeFirst = response.first;
        const employeeLast = response.last;
        console.log(employeeFirst, employeeLast);
        getRoles().then((roles) => {
            const rolesTable = roles[0].map((role) =>
            ({
                name: role.title,
                id: role.id
            }))

            inquirer.prompt([
                {
                    type: "list",
                    name: "choiceRole",
                    message: "What is their role?",
                    choices: rolesTable,
                }
            ]).then((response) => {
                const role = rolesTable.filter(role => role.title === response.choiceRole)
                console.log("Role Selected!");
                getEmployees().then((employees) => {
                    const employeesTable = employees[0].map((employee) =>
                    ({
                        name: employee.first_name,
                        name: employee.last_name,
                        id: employee.id
                    }))

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "choiceManager",
                            message: "Who is their manager?",
                            choices: employeesTable,
                        }
                    ]).then((response) => {
                        const employee = employeesTable.filter(employee => employee.id === response.choiceManager);
                        db.query("INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)", [employeeFirst, employeeLast, role, employee], function (err, results) {
                            loadPrompts();
                        })
                    });

                })
            })
        })

    })
};

function updateEmployee() {
    getEmployees().then((employees)=> {
        console.log(employees)
        const employeeArray = employees[0].map((employee)=>
        ({
            name: employee.first_name,
            id: employee.id
        }));
    getRoles().then((roles)=> {
        const rolesArray = roles[0].map((role)=>
        ({
            name: role.first_name,
            id: role.id
        }))
        inquirer.prompt([
            {
                type: "list",
                name: "choiceEmployee",
                message: "Which employee would you like to update?",
                choices: employeeArray
            },
            {
                type: "list",
                name: "choiceRole",
                message: "Which role are they in?",
                choices: rolesArray
            }
        ]).then((response)=> {
            const employee = employeeArray.filter(employee=>employee.name === response.choiceEmployee);
            const role = rolesArray.filter(role=>role.name === response.choiceRole);
            db.query("UPDATE employees SET roles_id = ? WHERE id = ?", [employee.id, role.id], function (err, results){
                loadPrompts();
            })

        })
    })
    
})
}


