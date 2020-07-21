USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe", 5, 3),
("Mike", "Chan", 6, 1),
("Ashley", "Rodriguez", 7, null),
("Kevin", "Tupik", 5, 3),
("Malia", "Brown", 9, null),
("Sarah", "Lourd", 10, null),
("Tom", "Allen", 11, 7),
("Christian", "Eckenrode", 7, 2);

INSERT INTO department (id, name)
VALUES
(1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES
(5, "Sales Lead", 100000.00, 1),
(6, "Salesperson", 80000.00, 1),
(7, "Lead Engineer", 150000.00, 2),
(8, "Software Engineer", 120000.00, 2),
(9, "Accountant", 125000.00, 3),
(10, "Legal Team Lead", 250000.00, 4),
(11, "Lawyer", 190000.00, 4);