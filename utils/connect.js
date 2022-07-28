import inquirer from "inquirer";
import mysql from "mysql2/promise";
import {default as fs} from "fs";
import * as dotenv from 'dotenv';
dotenv.config();

async function connect() {
  if(!(process.env.DB_HOST !== undefined && process.env.DB_NAME !== undefined && 
    process.env.DB_USER !== undefined && process.env.DB_PASSWORD !== undefined)) {
    const login = await inquirer.prompt(
      [
        {
          name: "host",
          type: "input",
          message: "Enter your MySQL Server host (default localhost):",
          default: "localhost"
        },
        {
          name: "user",
          type: "input",
          message: "Enter your MySQL Server user (default root):",
          default: "root"
        },
        {
          name: "password",
          type: "password",
          message: "Enter your MySQL Server password:"
        },
      ]
    );
    const envVariables = `DB_HOST=${login.host}\nDB_NAME=employee_db\nDB_USER=${login.user}\nDB_PASSWORD=${login.password}`;
    fs.writeFileSync("./.env", envVariables);
    dotenv.config();
  }

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  await db.connect((err) => {
    if(err) {
      fs.writeFileSync("./.env", "");
      dotenv.config();
      throw err;
    }
  });

  return db;
}


export default connect;