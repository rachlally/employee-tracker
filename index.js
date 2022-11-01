//install packages
const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
// const Database = require("./db/index");

loadPrompts();

function loadPrompts(){
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
    ]).then(res=>{
        let choice = res.choice;
        switch(choice){
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
    db.query('SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM roles JOIN departments ON roles.departments_id = departments.id;', function (err, results) {
        console.table(results);
        loadPrompts();
    });
};

function viewEmployees(){
    db.query("SELECT employees.id AS ID, employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, departments.name AS Department, roles.salary AS Salary, manager.last_name AS Manager FROM employees JOIN roles on employees.roles_id = roles.id LEFT JOIN departments on roles.departments_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id", function (err, results) {
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
    ]).then((response)=> {
        db.query("INSERT INTO departments SET ?", {name:response.department}, function (err, results){
            console.table(results);
            loadPrompts();
        })
    });
};

function addRole() {
    // let depart = db.query("SELECT departments.name FROM departments");
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
        // {
        //     type: "list",
        //     name: "choice",
        //     message: "What department is this role in?",
        //     choices: depart,
        // }
    ]).then((response)=> {
        db.query("INSERT INTO roles SET ?", {title:response.title, salary:response.salary, departments_id:response.choice}, function (err, results){
            console.table(results);
            loadPrompts();
        })
    });
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
        },
        // {
        //     type: "list",
        //     name: "choice",
        //     message: "What is their role?",
        //     choice: 
        // },
        // {
        //     type: "list",
        //     name: "manager",
        //     message: "Who is their manager?",
        //     choice:
        // },
    ]).then((response) => {
        console.log(response)
        loadPrompts();
    })
};


// function updateEmployee() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "employeeChoice",
//             message: "Which employee would you like to update?",
//             choice: 
//         }
//     ])
// }



