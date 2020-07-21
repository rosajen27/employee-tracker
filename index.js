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

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    console.log("connected as id", connection.threadId + "\n");
    begin();
});

// begin prompts
function begin() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "View employees by deparment",
                "Update employee role",
                "Add employee",
                "Add role",
                "Add department",
            ]
        })