const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require("console.table");

// Creates the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_manager',
  password: 'root1234'
});
connection.connect(function (err) {
  if (err) throw err;
  promptUser();
});


const promptUser = () => {
  inquirer.prompt([
    {
      name: 'choices',
      type: 'list',
      message: 'What would you like to do?:',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ]
    }
  ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === 'View All Departments') {
        viewAllDepartments();
      }

      if (choices === 'View All Roles') {
        viewAllRoles();
      }

      if (choices === 'View All Employees') {
        viewAllEmployees();
      }

      if (choices === 'Add a Department') {
        addDepartment();
      }

      if (choices === 'Add a Role') {
        addRole();
      }

      if (choices === 'Add an Employee') {
        addEmployee();
      }

      if (choices === 'Update an Employee Role') {
        updateEmployeeRole();
      }

      if (choices === 'Exit') {
        connection.end();
      }
    });
};

// view all departments: formatted table showing department names and department ids
const viewAllDepartments = () => {
  let sql = 'SELECT * FROM departments';
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

// view all roles: job title, role id, the department that role belongs to, and the salary for that role
const viewAllRoles = () => {
  let sql = 'SELECT * FROM employee_role ';
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};


//view all employees: employee ids, first names, last names, job titles, departments, salaries, and managers
const viewAllEmployees = () => {
  let sql = `SELECT employee.role_id, employee.first_name, employee.last_name, employee_role.title, departments.name AS departments, employee_role.salary, employee.manager_id
  FROM employee, employee_role, departments
  WHERE employee.role_id = employee_role.id
  AND employee_role.departments_id = departments.departments_id`
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

//add a department and that department is added to the database
const addDepartment = () => {
  inquirer.prompt({
    // Prompt user for name of department
    name: "deptName",
    type: "input",
    message: "Departments Name: "
  }).then((answer) => {

    // add department to the table
    connection.query(`INSERT INTO departments (name)VALUES ("${answer.deptName}");`, (err, res) => {
      if (err) return err;
      console.log(`!\n${answer.deptName} was added to Departments\n`);
      promptUser();
    });
  });
}

//add a role: name, salary, and departments for the role
const addRole = () => {
  // Prompt user for role information
  inquirer.prompt([
    {
      name: "title",
      message: "What new title would you like to add?"
    },
    {
      name: "salary",
      message: "What salary does this role have?"
    },
    {
      name: "departments_id",
      message: "What is the department id of the new role"
    }
  ]).then(({ title, salary, departments_id }) => {
    // add role
    connection.query("INSERT INTO employee_role SET ?", {
      title: title,
      salary: salary,
      departments_id: departments_id
    },
      (err) => {
        if (err) throw err;
        console.log(`!\n${title} was created!\n`);
        promptUser();
      })
  })
}

//add a employee: employee’s first name, last name, role, and manager
const addEmployee = () => {
  // Prompt user for employee information
  inquirer.prompt([
    {
      name: "first_name",
      message: "Enter the employees first name"
    },
    {
      name: "last_name",
      message: "Enter the employees last name"
    },
    {
      name: "role_id",
      message: "What is the new employees role id?"
    },
    {
      name: "manager_id",
      message: "What is the new employees managers id?"
    }
  ]).then(({ first_name, last_name, role_id, manager_id }) => {
    // add employee
    connection.query("INSERT INTO employee SET ?", {
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id
    },
      (err) => {
        if (err) throw err;
        console.log(`!\nYour new employee was added!\n`);
        promptUser();
      })
  })
}

// update employee role
const updateEmployeeRole = () => {
  connection.query('SELECT * FROM employee', function (err, result) {
    if (err) throw (err);
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",
          message: "Which employee's role is changing?",
          choices: function () {
            employeeArray = [];
            result.forEach(result => {
              employeeArray.push(
                result.last_name
              );
            })
            return employeeArray;
          }
        }
      ])
      .then(function (answer) {
        console.log(answer);
        const name = answer.employeeName;
        connection.query("SELECT * FROM employee_role", function (err, res) {
          if (err) throw (err);
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: function () {
                  rolesArray = [];
                  res.forEach(res => {
                    rolesArray.push(res.title)
                  })
                  return rolesArray;
                }
              }
            ]).then(function (rolesAnswer) {
              const role = rolesAnswer.role;
              console.log(rolesAnswer.role);
              connection.query('SELECT * FROM employee_role WHERE title = ?', [role], function (err, res) {
                if (err) throw (err);
                let roleId = res[0].id;
                let sql = "UPDATE employee SET role_id = ? WHERE last_name= ?";
                let values = [roleId, name]
                console.log(values);
                connection.query(sql, values,
                  function (err, res,) {
                    if (err) throw (err);
                    console.log(`You have updated ${name}'s role to ${role}.`)
                    promptUser();
                  })
              })
            })
        })
      })
  })
}


