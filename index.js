var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

const departments = ["Sales", "Engineering", "Finance", "Legal"];
const roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"];
const managers = ["John Doe", "Ashley Rodriguez", "Malia Brown", "Sarah Lourd", "Kevin Tupik"];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_DB"
});



inquirer.prompt([/* Pass your questions in here */], function( answers ) {
    // Use user feedback for... whatever!!
});