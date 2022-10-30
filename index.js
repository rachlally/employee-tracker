//install packages
const inquirer = require("inquirer");
const db = require("./db");
const cTable = require("console.table");
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// function viewDepartments()

// function viewRoles()

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the Department?",
        },
    ]).then((response) => {
        console.log(response)
        loadPrompts();
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the Role?",
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
        //     choices: []
        // }
    ]).then((response) => {
        console.log(response)
        loadPrompts();
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

function viewEmployees (){
    db.findAllEmployees()
        .then(([rows])=>{
            let employees = rows;
            console.table(employees);
        })
        .then(()=>loadPrompts());
}

