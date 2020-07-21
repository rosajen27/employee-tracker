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

// functions
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

function viewAllDepartments() {
    var query = `SELECT department.id, department.name FROM department`
    connection.query(query, function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res)
        options()
    })
}

function viewAllRoles() {
    var query = `SELECT role.id, role.title, role.salary, department.name as department FROM role
                 LEFT JOIN department ON role.department_id = department.id`
    connection.query(query, function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res)
        options()
    })
}

function viewEmployeesByDepartment() {
    inquirer.prompt({
        name: "departments",
        type: "list",
        message: "Please select the department of the employee",
        choices: ["Sales",
            "Engineering",
            "Finance",
            "Legal",
            "HR"
        ]
    }).then(function (answer) {
        const department = answer.departments;
        var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary `
        query += `FROM employee LEFT JOIN role ON employee.role_id = role.id `;
        query += `LEFT JOIN department ON role.department_id = department.id WHERE department.name="${department}"`;
        connection.query(query, function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res)
            options()
        })
    })
}

function updateEmployeeRole() {
    connection.query("SELECT id, first_name, last_name FROM employee", function (err, result) {
        if (err) throw err;
        const employeeName = [];
        for (let i = 0; i < result.length; i++) {
            const choices = (result[i].first_name + " " + result[i].last_name);
            employeeName.push(choices);
        }
        inquirer.prompt([{
            name: "employee",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeName
        },
        {
            name: "newRole",
            type: "list",
            message: "What is the employee's new role?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Accountant",
                "Legal Team Lead",
                "Lawyer",
                "Lead Engineer"
            ]
        }
        ])
            .then(function (answer) {
                const employeeName = answer.employee;
                if (answer.newRole === "Sales Lead") {
                    var roleID = "1";
                } else if (answer.newRole === "Salesperson") {
                    var roleID = "2";
                } else if (answer.newRole === "Lead Engineer") {
                    var roleID = "3";
                } else if (answer.newRole === "Software Engineer") {
                    var roleID = "4";
                } else if (answer.newRole === "Accountant") {
                    var roleID = "5";
                } else if (answer.newRole === "Legal Team Lead") {
                    var roleID = "6";
                } else if (answer.newRole === "Lawyer") {
                    var roleID = "7";
                } else if (answer.newRole === "Lead Engineer") {
                    var roleID = "8";
                }
                connection.query(`UPDATE employee SET ? WHERE ?`, [{
                    role_id: answer.roleID
                },
                {
                    id: answer.id
                }
                ],
                    function (err,) {
                        if (err) throw err;
                        console.log("Successfully Updated Employee Role!")
                    })
            })
    })
}

function addEmployee() {
    inquirer.prompt([{
        name: "first",
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        name: "last",
        type: "input",
        message: "What is the employee's last name?"
    },
    {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: roles
    },
    {
        name: "manager",
        type: "list",
        message: "Who is the employee's manager?",
        choices: managers
    }
]).then(function(answer) {
    if (answer.role === "Sales Lead") {
        var roleid = "5"
    } else if (answer.role === "Salesperson") {
        var roleid = "6"
    } else if (answer.role === "Lead Engineer") {
        var roleid = "7"
    } else if (answer.role === "Software Engineer") {
        var roleid = "8"
    } else if (answer.role === "Accountant") {
        var roleid = "9"
    } else if (answer.role === "Legal Team Lead") {
        var roleid = "10"
    } else if (answer.role === "Lawyer") {
        var roleid = "11"
    };
    if (answer.manager === "John Doe") {
        var managerid = "1"
    } else if (answer.manager === "Ashley Rodriguez") {
        var managerid = "3"
    } else if (answer.manager === "Sarah Lourd") {
        var managerid = "6"
    } else if (answer.manager === "Mike Chan") {
        var managerid = "2"
    }
    connection.query(
        `INSERT INTO employee SET ?`, {
            first_name: answer.first,
            last_name: answer.last,
            role_id: roleid,
            manager_id: managerid,
        },
        function(err) {
            if (err) throw err;
            console.log("Employee Added Successfully!");
            viewAllEmployees();
        }
    )
})
}

function addRole(){
    inquirer.prompt([{
        name: "role",
        type: "input",
        message: "Which role would you like to add?"
    }, {
        name: "addrole",
        type: "list",
        message: "Into which department would you like to assign this role?",
        choices: departments
    }, {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
    }])
    .then(function(answer) {
        if (answer.addrole === "Sales") {
            var deparmentID = "1"
        } else if (answer.addrole === "Engineering") {
            var deparmentID = "2"
        } else if (answer.addrole === "Finance") {
            var deparmentID = "3"
        } else if (answer.addrole === "Legal") {
            var deparmentID = "4"
        }
        connection.query(
            `INSERT INTO role SET ?`, {
                title: answer.role,
                salary: answer.salary,
                department_id: deparmentID
            },
            function(err) {
                if (err) throw err;
                console.log("Role Created Successfully!");
                viewAllRoles();
            }
        );

    })
}

function addDepartment(){
    inquirer.prompt([{
        name: "adddepartment",
        type: "input",
        message: "Which department would you like to add?"
    }])
    .then(function(answer) {
        connection.query(
            `INSERT INTO department SET ?`, {
                name: answer.adddepartment,
            },
            function(err) {
                if (err) throw err;
                console.log("Department Created Successfully!");
                viewAllDepartments()
            }
        )
    })
}