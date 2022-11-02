

// function getRoles(){
//     return db.promise().query("SELECT * FROM roles")
// };

// function addEmployee(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "first",
//             message: "Employee's first name?",
//         },
//         {
//             type: "input",
//             name: "last",
//             message: "Employee's last name?",
//         }
//     ]).then((response)=>{
//         let employeeFirst = response.first;
//         let employeeLast = response.last;
//         getRoles().then((roles)=> {
//             const rolesTable = roles[0].map((role)=>
//             ({
//                 title: role.title,
//                 id: role.id
//             }))
//             inquirer.prompt([
//                 {
//                     type: "list",
//                     name: "choiceRole",
//                     message: "What is their role?",
//                     choice: rolesTable,
//                 }
//             ]).then((response)=>{
//                 let roleChoice = response.choiceRole;
//                 getEmployees().then((employees)=> {
//                     const employeesTable = employees[0].map((employee)=>
//                     ({
//                         id: employee.id,
//                         first_name: employee.first_name,
//                         last_name: employee.last_name,

//                     }))
//                     inquirer.prompt([
//                         {
//                             type: "list",
//                             name: "choiceManager",
//                             message: "Who is their manager?",
//                             choice: employeesTable,
//                         }
//                     ]).then((response)=>{
//                         let managerChoice = response.choiceManager;
//                         db.query("INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)", [employeeFirst, employeeLast, roleChoice, managerChoice], function (err,results){
//                             loadPrompts();
//                         })
//                     })

//                 })
//             })

//         })
//     })
// };



           
     