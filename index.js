// DEPENDENCIES
import inquirer from "inquirer";
import mysql from "mysql2/promise";
import cTable from "console.table";
import {default as fs} from "fs";
import connect from "./utils/connect.js";

// GLOBAL VARIABLES

var connection;

// FUNCTION DEFINITIONS

// Initiate app
async function init() {
  connection = await connect();
  const ascii = fs.readFileSync("./utils/welcomeASCII.txt","utf-8");
  console.log(ascii);
  prompt();
}

// Prompt user choices
async function prompt() {
  const {prompt} = await inquirer.prompt([
    {
      name: "prompt",
      type: "list",
      message: "What would you like to do?",
      choices: ["Quit",
                new inquirer.Separator(),
                "View all departments",
                "View all roles",
                "View all employees",
                "View employees by department",
                "View employees by manager",
                new inquirer.Separator(),
                "Add a department",
                "Add a role",
                "Add a employee",
                new inquirer.Separator(),
                "Update an employee's role",
                "Update an employee's manager",
                new inquirer.Separator(),
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                new inquirer.Separator(),
                "View department budget"
              ],
      pageSize: 7,
      loop: false
    }
  ]);
  switch(prompt) {
    case "Quit":
      quit();
      break;
    case "View all departments":
      viewDepartments();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "View all employees":
      viewEmployees();
      break;
    case "View employees by department":
      viewEmployeesByDept();
      break;
    case "View employees by manager":
      viewEmployeesByMngr();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add a employee":
      addEmployee();
      break;
    case "Update an employee's role":
      updateEmployeeRole();
      break;
    case "Update an employee's manager":
      updateEmployeeMngr();
      break;
    case "Delete a department":
      deleteDepartment();
      break;
    case "Delete a role":
      deleteRole();
      break;
    case "Delete an employee":
      deleteEmployee();
      break;
    case "View department budget":
      viewBudget();
      break;
    default:
      quit();
      break;
  }
}

// Quit
function quit() {
  console.log("Bye");
  connection.end();
}

// View all departments
async function viewDepartments() {
  const queryString = "SELECT id AS 'ID', name AS 'Department Name' FROM department";
  try {
    const data = await connection.query(queryString);
    console.table(data[0])
    prompt();
  } 
  catch(err) {
    throw err;
  }

}

// View all roles
async function viewRoles() {
  const queryString = `SELECT r.id AS 'ID', r.title AS 'Title', r.salary AS 'Salary', d.name AS 'Department Name' FROM role r 
                       JOIN department d ON r.department_id = d.id`;
  try {
    const data = await connection.query(queryString);
    console.table(data[0])
    prompt();
  } 
  catch(err) {
    throw err;
  }
}

// View all employees
async function viewEmployees() {
  const queryString = `SELECT e.id AS 'ID', 
                       CONCAT(e.first_name,' ',e.last_name) AS 'Employee Name',  
                       r.title AS 'Role', 
                       d.name AS 'Department', 
                       r.salary AS 'Salary', 
                       IFNULL(CONCAT(m.first_name,' ',m.last_name),'No Manager') AS 'Manager'
  FROM employee e 
  LEFT JOIN employee m ON e.manager_id = m.id
  JOIN role r ON e.role_id = r.id 
  JOIN department d ON r.department_id = d.id`;
  try {
    const data = await connection.query(queryString);
    console.table(data[0])
    prompt();
  } 
  catch(err) {
    throw err;
  }
}

// View employees by department
async function viewEmployeesByDept() {
  try {
    const deptQueryString = "SELECT * FROM department";
    const deptData = await connection.query(deptQueryString);
    const departmentsArray = deptData[0].map((dept) => {return {name: dept.name, value: dept.id}});
    const {department_id} = await inquirer.prompt(
      {
        name: "department_id",
        type: "list",
        message: "Select a department:",
        choices: departmentsArray
      }
    );
    
    const empQueryString = `SELECT e.id AS 'ID', 
                         CONCAT(e.first_name,' ',e.last_name) AS 'Employee Name',  
                         r.title AS 'Role', 
                         d.name AS 'Department', 
                         r.salary AS 'Salary', 
                         IFNULL(CONCAT(m.first_name,' ',m.last_name),'No Manager') AS 'Manager'
    FROM employee e 
    LEFT JOIN employee m ON e.manager_id = m.id
    JOIN role r ON e.role_id = r.id 
    JOIN department d ON r.department_id = d.id
    WHERE d.id = ?`;
    const empData = await connection.query(empQueryString, department_id);
    console.table(empData[0])
    prompt();
  } 
  catch(err) {
    throw err;
  }
}

// View employees by manager
async function viewEmployeesByMngr() {
  try {
    const mngrQueryString = "SELECT e.id, CONCAT(e.first_name,' ',e.last_name) AS name FROM employee e WHERE e.manager_id IS NULL";
    const mngrData = await connection.query(mngrQueryString);
    const mngrArray = mngrData[0].map((mngr) => {return {name: mngr.name, value: mngr.id}});
    const {mngr_id} = await inquirer.prompt(
      {
        name: "mngr_id",
        type: "list",
        message: "Select a manager:",
        choices: mngrArray
      }
    );
    
    const empQueryString = `SELECT e.id AS 'ID', 
                         CONCAT(e.first_name,' ',e.last_name) AS 'Employee Name',  
                         r.title AS 'Role', 
                         d.name AS 'Department', 
                         r.salary AS 'Salary', 
                         IFNULL(CONCAT(m.first_name,' ',m.last_name),'No Manager') AS 'Manager'
    FROM employee e 
    LEFT JOIN employee m ON e.manager_id = m.id
    JOIN role r ON e.role_id = r.id 
    JOIN department d ON r.department_id = d.id
    WHERE e.manager_id = ?`;
    const empData = await connection.query(empQueryString, mngr_id);
    console.table(empData[0])
    prompt();
  } 
  catch(err) {
    throw err;
  }
}

// Add a department
async function addDepartment() {
  // stub

  prompt();
}

// Add a role
async function addRole() {
  // stub

  prompt();
}

// Add a employee
async function addEmployee() {
  // stub

  prompt();
}

// Update an employee's role
async function updateEmployeeRole() {
  // stub

  prompt();
}

// Update an employee's manager
async function updateEmployeeMngr() {
  // stub

  prompt();
}

// Delete a department
async function deleteDepartment() {
  // stub

  prompt();
}

// Delete a role
async function deleteRole() {
  // stub

  prompt();
}

// Delete an employee
async function deleteEmployee() {
  // stub

  prompt();
}

// View department budget
async function viewBudget() {
  // stub

  prompt();
}


// FUNCTION CALLS
init();

