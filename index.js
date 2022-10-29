const inquirer = require("inquirer");
const db = require("./db");
require ("console.table")
//install packages

loadPrompts();
function loadPrompts(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "view_employees"
                },
            ]
        },
    ]).then(res=>{
        let choice = res.choice;
        switch(choice){
            case "view_employees":
                viewEmployees();
                break;
        }
    })
}

function viewEmployees (){
    db.findAllEmployees()
        .then(([rows])=>{
            let employees = rows;
            console.table(employees);
        })
        .then(()=>loadPrompts());
}