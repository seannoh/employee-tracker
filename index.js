// DEPENDENCIES
import inquirer from "inquirer";
import mysql from "mysql2";
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
      break;
    case "View all roles":
      break;
    case "View all employees":
      break;
    case "View employees by department":
      break;
    case "View employees by manager":
      break;
    case "Add a department":
      break;
    case "Add a role":
      break;
    case "Add a employee":
      break;
    case "Update an employee's role":
      break;
    case "Update an employee's manager":
      break;
    case "Delete a department":
      break;
    case "Delete a role":
      break;
    case "Delete an employee":
      break;
    case "View department budget":
      break;
    default:
      break;
  }
}

// Quit
function quit() {
  console.log("Bye");
  connection.end();
}

// View all departments

// View all roles

// View all employees

// View employees by department

// View employees by manager

// Add a department

// Add a role

// Add a employee

// Update an employee's role

// Update an employee's manager

// Delete a department

// Delete a role

// Delete an employee

// View department budget


// FUNCTION CALLS
init();

