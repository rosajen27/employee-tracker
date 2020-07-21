var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

const departments = ["Sales", "Engineering", "Finance", "Legal"];
const roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"];
const managers = ["John Doe", "Ashley Rodriguez", "Malia Brown", "Sarah Lourd", "Kevin Tupik"];

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
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
        .then(function (answer) {
            console.log(answer.options)
            switch (answer.options) {
                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View all departments":
                    viewAllDepartments();
                    break;

                case "View all roles":
                    viewAllRoles();
                    break;

                case "View employees by deparment":
                    viewEmployeesByDepartment();
                    break;

                case "Update employee role":
                    updateEmployeeRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add department":
                    addDepartment();
                    break;

            }
        });
}

// logs the actual query being run
console.log(query.sql);
}

function viewAllEmployees() {
    var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager `
    query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
    query += "LEFT JOIN department ON department.id = role.department_id ";
    query += "LEFT JOIN employee AS manager ON manager.id = employee.manager_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res)
        options()
    })
}