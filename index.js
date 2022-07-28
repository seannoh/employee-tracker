// DEPENDENCIES
import inquirer from "inquirer";
import mysql from "mysql2";
import cTable from "console.table";
import {default as fs} from "fs";
import connect from "./utils/connect.js";

// FUNCTION DEFINITIONS

// Initiate app
async function init() {
  await connect();

  const ascii = fs.readFileSync("./utils/welcomeASCII.txt","utf-8");
  console.log(ascii);

}

// Prompt user choices


// View all departments

// View all roles

// View all employees

// View employees by department

// View employees by manager

// Add a department

// Add a role

// Add a employee

// Update an employee's role

// Update an employee's mangaer

// Delete a department

// Delete a role

// Delete an employee

// View department budget


// FUNCTION CALLS
init();

