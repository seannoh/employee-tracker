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
                "Add an employee",
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
    case "Add an employee":
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
        choices: departmentsArray,
        pageSize: 7,
        loop: false
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
        choices: mngrArray,
        pageSize: 7,
        loop: false
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
  const {deptName} = await inquirer.prompt(
    {
      name: "deptName",
      type: "input",
      message: "Please enter the name of the department to add:"
    }
  );
  const queryString = "INSERT INTO department(name) VALUE (?)";
  try {
    const data = await connection.query(queryString, deptName);
    console.log(`${deptName} department added`);
    prompt();
  } 
  catch(err) {
    throw err;
  }
}

// Add a role
async function addRole() {
  try {
    const deptQueryString = "SELECT * FROM department";
    const deptData = await connection.query(deptQueryString);
    const departmentsArray = deptData[0].map((dept) => {return {name: dept.name, value: dept.id}});
  
    const {title, salary, dept} = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Please enter the name of the role to add:"
      },
      {
        name: "salary",
        type: "input",
        message: "Please enter the salary of the role to add:"
      },
      {
        name: "dept",
        type: "list",
        message: "Please select a department to add the role to:",
        choices: departmentsArray,
        pageSize: 7,
        loop: false
      }
    ]);
    const queryString = "INSERT INTO role(title, salary, department_id) VALUE (?, ?, ?)";
    const data = await connection.query(queryString, [title, salary, dept]);
    console.log(`${title} role added`);
    prompt();
  } 
  catch(err) {
    throw err;
  }
}

// Add an employee
async function addEmployee() {
  try {
    const roleQueryString = "SELECT * FROM role";
    const roleData = await connection.query(roleQueryString);
    const roleArray = roleData[0].map((role) => {return {name: role.title, value: role.id}});

    const mngrQueryString = "SELECT e.id, r.title, CONCAT(e.first_name,' ',e.last_name) AS name FROM employee e LEFT JOIN role r ON e.role_id = r.id";
    const mngrData = await connection.query(mngrQueryString);
    const mngrArray = mngrData[0].map((mngr) => {return {name: `${mngr.name} (${mngr.title})`, value: mngr.id}});
    mngrArray.unshift({name: "No Manager", value: null})
  
    const {first_name, last_name, role, manager_id} = await inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "Please enter the first name of the employee:"
      },
      {
        name: "last_name",
        type: "input",
        message: "Please enter the last name of the employee:"
      },
      {
        name: "role",
        type: "list",
        message: "Please select a role for the employee:",
        choices: roleArray,
        pageSize: 7,
        loop: false
      },
      {
        name: "manager_id",
        type: "list",
        message: "Please select a manager for the employee:",
        choices: mngrArray,
        pageSize: 7,
        loop: false
      }
    ]);
    const queryString = "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)";
    const data = await connection.query(queryString, [first_name, last_name, role, manager_id]);
    console.log(`${first_name} ${last_name} employee added`);
    prompt();
  } 
  catch(err) {
    throw err;
  }
}

// Update an employee's role
async function updateEmployeeRole() {
  try {
    const empQueryString = "SELECT e.id, r.title, CONCAT(e.first_name,' ',e.last_name) AS name FROM employee e LEFT JOIN role r ON e.role_id = r.id";
    const empData = await connection.query(empQueryString);
    const empArray = empData[0].map((emp) => {return {name: `${emp.name} (${emp.title})`, value: emp.id}});

    const roleQueryString = "SELECT * FROM role";
    const roleData = await connection.query(roleQueryString);
    const roleArray = roleData[0].map((role) => {return {name: role.title, value: role.id}});

    const {employee_id, role_id} = await inquirer.prompt([
      {
        name: "employee_id",
        type: "list",
        message: "Please select an employee to modify:",
        choices: empArray,
        pageSize: 7,
        loop: false
      },
      {
        name: "role_id",
        type: "list",
        message: "Please select a new role for this employee:",
        choices: roleArray,
        pageSize: 7,
        loop: false
      }
    ]
    );

    const updateQueryString = "UPDATE employee SET role_id = ? WHERE id = ?";
    const data = await connection.query(updateQueryString, [role_id, employee_id]);
    console.log("Employee's role has been updated");
    prompt();
  }
  catch(err) {
    throw err;
  }
}

// Update an employee's manager
async function updateEmployeeMngr() {
  try {
    const empQueryString = "SELECT e.id, r.title, CONCAT(e.first_name,' ',e.last_name) AS name FROM employee e LEFT JOIN role r ON e.role_id = r.id";
    const empData = await connection.query(empQueryString);
    const empArray = empData[0].map((emp) => {return {name: `${emp.name} (${emp.title})`, value: emp.id}});

    const {employee_id} = await inquirer.prompt(
      {
        name: "employee_id",
        type: "list",
        message: "Please select an employee to modify:",
        choices: empArray,
        pageSize: 7,
        loop: false
      },
    );

    const mngrArray = empArray.filter((emp) => {
      return (emp.value !== employee_id);
    });
    mngrArray.unshift({name: "No Manager", value: null})

    const {mngr_id} = await inquirer.prompt(
      {
        name: "mngr_id",
        type: "list",
        message: "Please select a new manager for this employee:",
        choices: mngrArray,
        pageSize: 7,
        loop: false
      }
    );
    const updateQueryString = "UPDATE employee SET manager_id = ? WHERE id = ?";
    const data = await connection.query(updateQueryString, [mngr_id, employee_id]);
    console.log("Employee's manager has been updated");
    prompt();
  }
  catch(err) {
    throw err;
  }
}

// Delete a department
async function deleteDepartment() {
  try {
    const deptQueryString = "SELECT * FROM department";
    const deptData = await connection.query(deptQueryString);
    const deptArray = deptData[0].map((dept) => {return {name: dept.name, value: dept.id}});

    const {department_id} = await inquirer.prompt(
      {
        name: "department_id",
        type: "list",
        message: "Please select a department to delete:",
        choices: deptArray,
        pageSize: 7,
        loop: false
      }
    );

    const deleteQueryString = "DELETE FROM department WHERE id = ?";
    const data = await connection.query(deleteQueryString, department_id);
    console.log("Department has been deleted");
    prompt();
  }
  catch(err) {
    throw err;
  }
}

// Delete a role
async function deleteRole() {
  try {
    const roleQueryString = "SELECT * FROM role";
    const roleData = await connection.query(roleQueryString);
    const roleArray = roleData[0].map((role) => {return {name: role.title, value: role.id}});

    const {role_id} = await inquirer.prompt(
      {
        name: "role_id",
        type: "list",
        message: "Please select a department to delete:",
        choices: roleArray,
        pageSize: 7,
        loop: false
      }
    );

    const deleteQueryString = "DELETE FROM role WHERE id = ?";
    const data = await connection.query(deleteQueryString, role_id);
    console.log("Role has been deleted");
    prompt();
  }
  catch(err) {
    throw err;
  }
}

// Delete an employee
async function deleteEmployee() {
  try {
    const empQueryString = "SELECT e.id, r.title, CONCAT(e.first_name,' ',e.last_name) AS name FROM employee e LEFT JOIN role r ON e.role_id = r.id";
    const empData = await connection.query(empQueryString);
    const empArray = empData[0].map((emp) => {return {name: `${emp.name} (${emp.title})`, value: emp.id}});

    const {emp_id} = await inquirer.prompt(
      {
        name: "emp_id",
        type: "list",
        message: "Please select an employee to remove:",
        choices: empArray,
        pageSize: 7,
        loop: false
      }
    );

    const deleteQueryString = "DELETE FROM employee WHERE id = ?";
    const data = await connection.query(deleteQueryString, emp_id);
    console.log("Employee has been removed");
    prompt();
  }
  catch(err) {
    throw err;
  }
}

// View department budget
async function viewBudget() {
  try {
    
  }
  catch(err) {

  }
}


// FUNCTION CALLS
init();

