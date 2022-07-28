// DEPENDENCIES
import inquirer from "inquirer";
import mysql from "mysql2";
import cTable from "console.table";
import {default as fs} from "fs";
import connect from "./utils/connect.js";

// FUNCTION DEFINITIONS

function init() {
  //connect();
  fs.readFile("./utils/welcomeASCII.txt","utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);
  })


}


// FUNCTION CALLS
init();

