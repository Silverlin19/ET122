
INSERT INTO departments (name)
VALUES ("Sales"),
  ("Finance"),
  ("Engineering"),
  ("Legal");
INSERT INTO employee_role (title, salary, departments_id)
VALUES ("Salesperson", 80000, 1),
  ("Sales Lead", 100000, 1),
  ("Lead Engineering", 150000, 3),
  ("Software Engineering", 120000, 3),
  ("Accountant", 125000, 2),
  ("Lawyer", 190000, 4),
  ("Legal Team Lead", 250000, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brett", "Bendickson", 1, NULL),
  ("Kevin", "Malone", 3, 1),
  ("Leslie", "Knope", 4, 2),
  ("Waverly", "Provost", 2, 3),
  ("Lea", "Smith", 2, 3),
  ("Travis", "Barker", 3, 1),
  ("Jim", "Halpert", 1, NULL),
  ("April", "Ludgate", 4, 2),
  ("Pam", "Beasely", 3, 1),
  ("Andy", "Dwyer", 5, NULL);