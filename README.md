# Employee Tracker

[![MIT License](https://img.shields.io/badge/License-MIT-green)](#license)

A CLI application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Description 
This application is a command line application content management system which allows the user to manage a database of company information including departments, roles, and employees. It is written in JavaScript and SQL and runs on Node.js in conjunction with MySQL Server. The Node package Inquirer is used to generate the CLI and the mysql2 package is used to communicate with a local MySQL server. The dotenv package is also used to generate environmental variables.

## Technologies Used

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)

## Installation
  1. Upload all files or fork this repository to a server with a Node.js runtime environment and a MySQL Server. 
  2. Run `npm -i` from the root directory to install dependencies for this app. 
  3. From the root directory, open MySQL Shell and run `source ./db/schema.sql;` to create the database schema.
      - Optionally run `source ./db/schema.sql;` to populate the database with sample data.
  4. Run `npm start` to start the app in the command line.
  5. For the first time running, follow the prompts to enter your MySQL login info.
  
## Usage 
Run `npm start` to start the app in the command line.

Follow the prompts in the application to use the content management system.

![preview](./assets/preview.gif)

## Credits
This application was built with the support of the resources and staff of the UCB Full Stack Full Time Coding Bootcamp Summer 2022. 

### References
ASCII art generated at:
- https://fsymbols.com/generators/carty/

## License
<details>
  <summary><b>MIT License</b></summary>

```
MIT License

Copyright (c) 2022 seannoh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
      
</details>

## Contributing
This project isn't currently acccepting contributions.

## Questions
- View my Github [profile](https://github.com/seannoh)
- Contact me at my [email](mailto:seanoh@ucsb.edu)





