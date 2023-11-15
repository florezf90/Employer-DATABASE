const inquirer = require("inquirer");
const db = require("./config/connections");
require("console.table");

db.connect((err) => {
    if (err) throw err;
})
function init() {
  try { console.log('tryout');
      inquirer
      .prompt({
        type: "list",
        message: "What would you like to do??",
        name: "UserChoice",
        choices: [
          "View ALL Employees",
          "ADD Employee",
          "Update Employee role",
          "View All Roles",
          "ADD role",
          "View All departments",
          "Add department",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "Quit",
        ],
      })
      .then((answer) => {
        console.log(answer);
        switch (answer.UserChoice) {
          case "View ALL Employees":
            ViewAllEmployees();
            break;
          case "ADD Employee":
            AddEmployee();
            break;
          case "Update Employee role":
            Updatemployerole();
            break;
          case "View All Roles":
            ViewAllroles();
            break;
          case "ADD role":
            AddRole();
            break;
          case "View All departments":
            ViewAlldepartments();
            break;
          case "Add department":
            Addepartment();
            break;
          case "Delete Department":
            DeleteDepartment();
            break;
          case "Delete Role":
            DeleteRole();
            break;
          case "Delete Employee":
            Deletemployee();
            break;
          case "Quit":
            // Close the db connection and exit the application
            db.end();
            break;
        }
      });
  } catch (err) {
    console.log(err);
  }
}

// the following blocks of code will allow us to watch each table

function ViewAlldepartments() {
  let call = "SELECT * FROM department ORDER BY name;";
  db.query(call, function (err, result) {
    if (err) throw err;
    console.table("\nDepartments:", result);
    init();
  });
}

function ViewAllroles() {
  let call =
    "SELECT role.id, title, department.name as department, salary FROM role JOIN department ON role.department_id = department.id;";

  db.query(call, function (err, result) {
    if (err) throw err;
    console.table("\nRoles:", result);
    init();
  });
}

function ViewAllEmployees() {
  let call =
    'SELECT employee.id, employee,first_name, employee_lastname, role.title, department.name as department, role.salary, CONCAT(boss.first_name, " ", boss.last_name) AS manager FROM employee JOIN role ON employe.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee as boss ON employee.manager_id = boss.id;';
  db.query(call, function (err, result) {
    if (err) throw err;
    console.table("employees", result);
    init();
  });
}

// functions to add data

function Addepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the department Name?",
      name: "dpt",
    })
    .then((answer) => {
      let call = "INSERT INTO department (name) VALUES (?)";
      db.query(call, answer.dpt, function (err, result) {
        if (err) throw err;
        console.log(`\nIt has been Added ${answer.dpt} to the db.`);
        init();
      });
    });
}

function AddRole() {
  let call = "SELECT name FROM department;";

  db.query(call, function (err, result) {
    if (err) throw err;
    let DptName = [];
    result.forEach((department) => {
      DptName.push(department.name);
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the role?",
          name: "role",
        },
        {
          type: "input",
          message: "What about the bucks it pays (how much)?",
          name: "salary",
        },
        {
          type: "list",
          message: "What is the department it belongs to?",
          choices: DptName,
          name: "dept",
        },
      ])
      .then((answer) => {
        let call = "SELECT  id FROM department where name = ?;";
        db.query(call, answer.dept, function (err, result) {
          if (err) throw err;
          let DptID = result[0].id;
          let sql =
            "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);";
          db.query(
            sql,
            [answer.role, answer.salary, DptID],
            function (err, result) {
              if (err) throw err;
              console.log(
                `\nGreat!! Properly added ${answer.role} to the db.\n`
              );
              init();
            }
          );
        });
      });
  });
}

function AddEmployee() {
  let call = "SELECT title FROM role";
  db.query(call, function (err, result) {
    if (err) throw err;
    let emploRole = [];
    result.forEach((role) => {
      emploRole.push(role.title);
    });
    let call =
      'SELECT CONCAT(first_name, " ", last_name) as manager FROM employee;';
    db.query(call, function (err, result) {
      if (err) throw err;
      let managerName = [];
      result.forEach((name) => {
        managerName.push(name.manager);
      });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employee(s) first name??",
            name: "Name",
          },
          {
            type: "input",
            message: "what is the employee(s) last name?",
            name: "LastName",
          },
          {
            type: "list",
            message: "what is the employee(s) role?",
            choices: emploRole,
            name: "role",
          },
          {
            type: "list",
            message: "who is the employee(s) manager?",
            choices: managerName,
            name: "manager",
          },
        ])
        .then((answer) => {
          let call = "SELECT id FROM role WHERE title = ?;";
          db.query(call, answer.role, function (err, result) {
            if (err) throw err;
            let roleID = result[0].id;
            let MngrName = answer.manager.split(" ");
            let call =
              "SELECT id FROM employee WHERE first_name = ? AND last_name = ?;";

            db.query(
              call,
              [MngrName[0], MngrName[1]],
              function (err, result) {
                if (err) throw err;
                managerID = result[0].id;
                let call =
                  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);";

                db.query(
                  call,
                  [answer.name, answer.LastName, roleID, , managerID],
                  function (err, result) {
                    if (err) throw err;
                    console.log(
                      `\n Properly Added ${answer.name} ${answer.LastName} to the db.\n`
                    );
                    init();
                  }
                );
              }
            );
          });
        });
    });
  });
}

//  Code used to update the db

function Updatemployerole() {
  let call = "SELECT title FROM role;";
  db.query(call, function (err, result) {
    if (err) throw err;
    let emploRole = [];
    result.forEach((role) => {
      emploRole.push(role.title);
    });

    let call =
      'SELECT CONCAT(first_name, " ", last_name) as employee FROM employee;';
    db.query(call, (err, result) => {
      if (err) throw err;
      let EnpName = [];
      result.forEach((name) => {
        EnpName.push(name.employee);
      });
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee(s) role do you want to update??",
            choices: EnpName,
            name: "EnPName",
          },
          {
            type: "list",
            message:
              "What role do you want to asing to the selected employee??",
            choices: emploRole,
            name: "enploRole",
          },
        ])
        .then((answer) => {
          let call = "SELECT id FROM role WHERE title = ?;";
          db.query(call, answer.emploRole, function (err, result) {
            if (err) throw err;
            let RoleID = result[0].id;
            const empName = answer.EnpName.split(" ");
            let call =
              "SELECT id FROM employee WHERE first_name = ? AND last_name = ?;";

            db.query(
              call,
              [empName[0], empName[1]],
              function (err, result) {
                if (err) throw err;
                let empID = result[0].id;
                let call = "UPDATE employee SET role_id = ? WHERE id = ?;";
                db.query(call, [RoleID, empID], function (err, result) {
                  if (err) throw err;
                  console.log("updated properly the employee(s) role");
                  init();
                });
              }
            );
          });
        });
    });
  });
}

function DeleteDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you want to delete?",
      name: "dept",
    })
    .then((answer) => {
      let call = "DELETE FROM department WHERE name = ?;";

      db.query(call, answer.dept, function (err, result) {
        if (err) throw err;
        console.log(`\n${answer.dept} has been deleted.\n`);
        init();
      });
    });
}

function DeleteRole() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the role you want to delete?",
      name: "title",
    })
    .then((answer) => {
      let sql = "DELETE FROM role WHERE title = ?;";

      db.query(call, answer.title, function (err, result) {
        if (err) throw err;
        console.log(`\n${answer.title} has been deleted.\n`);
        init();
      });
    });
}

function Deletemployee() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the id number for the employee you want to delete?",
      name: "id",
    })
    .then((answer) => {
      let call = "DELETE FROM employee WHERE id = ?;";

      db.query(call, answer.id, function (err, result) {
        if (err) throw err;
        console.log(`\nEmployee ID ${answer.id} has been deleted.\n`);
        init();
      });
    });
}

init();
