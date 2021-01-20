var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "emplyeeDB"
  });
  connection.connect(err=>{
    if (err) throw err
    console.log('connected')
    start();
  })
  // function which prompts the use what he liks to do 
function start() {
  inquirer
    .prompt({
      name: "initialQuestion",
      type: "list",
      message: "what Would you like to do?",
      choices: [
        "VIEW DEPARTMENT",
        "VIEW EMPLOYEE", 
        "VIEW ROLES",
        "ADD DEPARTMENT",
        "ADD EMPLOYEES",
        "ADD ROLE",
        "UPDATE EMPLOYEE ROLE",
        "EXIT"
      ]
    })
    .then(function(answer) {
      // based on user answer the function will be called
        if (answer.initialQuestion === "VIEW DEPARTMENT") {
          viewDepartment();
        }
      else if(answer.initialQuestion === "VIEW EMPLOYEE") {
          viewEmployee();
        } 
        else if(answer.initialQuestion === "VIEW ROLES") {
          viewRoles();
        }
         else if(answer.initialQuestion === "ADD DEPARTMENT") {
          addDepartment();
        } 
        else if(answer.initialQuestion === "ADD EMPLOYEES") {
          addEmployees();
        }
        else if(answer.initialQuestion === "ADD ROLE") {
          addRole();
        }
        else if(answer.initialQuestion === "UPDATE EMPLOYEE ROLE") {
          updateRoles();
            }
        else{
          connection.end();
        }
      });
}

// view department
function viewDepartment(){
connection.query("SELECT * FROM department", (err,res)=>{
  if (err) throw err
  console.log('this is all departemt')
  console.table(res);
  start();
})
}

// view employee
function viewEmployee(){
  connection.query("SELECT * FROM employee", (err,res)=>{
    if (err) throw err
    console.table(res)
    start()
  })
}

// view roles
function viewRoles(){
  connection.query("SELECT * FROM role", (err,res)=>{
    if (err) throw err;
    console.log(`this all roles`)
    console.table(res)
    start()
  })
}
// update role
function updateRoles(){

  const sql = "select * from Employee";
  const sql2 = "select * from role";

  connection.query(sql,function(err,emps){
    connection.query(sql2,function(err,roles){

  inquirer
  .prompt([
  {
    name: 'Employee',
    type: 'rawlist',
    choices: ()=>{
      let choices =[];
      for(let i=0; i< emps.length; i++){
        choices.push(emps[i].first_name + " " + emps[i].last_name);
      }
      return choices;
    },
    message: "Choose Employee to update"
  },
  {
      name: 'newRole',
      type: 'rawlist',
      choices: ()=>{
        let choices =[];
        for(let i=0; i<roles.length; i++){
          choices.push(roles[i].title);
        }
        return choices;
      },
      message: "Choose New role for employee"
    }
  ]).then(function(answer){
    
    connection.query("Update Employee SET ? where ?",
    [{
      role_id : roles.find(x => x.title == answer.newRole).id
    },
    {
      id: emps.find(x=>(x.first_name + " " + x.last_name) == answer.Employee).id
    }]
    )
    console.table(answer)
    start()

  })

  })
})

}

// add department
function addDepartment(){
   inquirer
  .prompt([
   {
     name : "addDepartment",
     type:"input",
     message: "Insert The Department Name"
   }
  ])
  .then(function(answer){
    connection.query("INSERT INTO department SET ?",
    {
      name : answer.addDepartment
    }
    )
    console.table(answer)
    start()

  })
}

// add employees
function addEmployees(){
  connection.query("select * from role", function(err, roles){

    inquirer
    .prompt([
     {
       name : "EmployeeFirstName",
       type:"input",
       message: "Insert The Employyes's First Name"
     },
     {
       name : "EmployeeLastName",
       type:"input",
       message: "Insert The Employyes's Last Name"
     },
     {
       name : "EmployeeRoleName",
       type:"rawlist",
       choices: ()=>{
          let choice = [];
          for(let i=0;i < roles.length;i++){
            choice.push(roles[i].title);
          }
          return choice;
       },
       message: "Insert The Employyes's Role"
     },
     {
       name : "EmployeeManagerId",
       type:"input",
       message: "Insert The Manager Id",
       validation : function(value){ 
         if(isNaN(value) === false){
           return true;
         }
         return false
       }
     }
   
    ])
    .then(function(answer){
      connection.query("INSERT INTO employee SET ?",
      {
        first_name : answer.EmployeeFirstName,
        last_name : answer.EmployeeLastName,
        role_id : roles.find(x => x.title == answer.EmployeeRoleName).id,
        manager_id : answer.EmployeeManagerId,
      }
      )
      console.table(answer)
      start()
   
    })
  });
}

// add roles
function addRole(){
  // const sql = "select * from department";
  connection.query("select * from department", function(err, depts){

    inquirer
    .prompt([
     {
       name : "addRoleTitle",
       type:"input",
       message: "what is the role title?"
     },
     {
      name : "addRoleSalary",
      type:"input",
      message: "what is the salary?"
    },
    {
      name : "departmentId",
      type:"rawlist",
      choices: function(){
        let choices = [];
        for(let i=0;i< depts.length;i++)
        {
          choices.push(depts[i].name);
        }
        return choices;
      },
      message: "what is the Departemnt ?"
    }
    ])
    .then(function(answer){
      connection.query("INSERT INTO role SET ?",
      {
        title : answer.addRoleTitle,
        salary : answer.addRoleSalary,
        department_id : depts.find(x=>x.name == answer.departmentId).id,
      }
      )
      console.table(answer)
      start()
    })
  })
  
}