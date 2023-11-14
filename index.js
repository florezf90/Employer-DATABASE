const inquirer = require('inquirer');
require('console.table');
const DB = require('./connection/connections');
const DataBase = require('./connection/connections');


function init() {
inquirer.prompt({
type: 'list',
message: 'What would you like to do??', 
name: 'UserChoice', 
choices: ['View ALL Employees', 'ADD Employee', "Update Employee role", 'View All Roles', 'ADD role', "View All departments", 'Add department', 'Delete Department', 'Delete Role', "Delete Employee", 'Quit' ],

}).then( answer => {
switch (answer.UserChoice) {
    case 'View ALL Employees':
        ViewAllEmployees();
        break;
    case 'ADD Employee':
        AddEmployee();
        break;
    case 'Update Employee role':
        Updatemployerole();
        break;
    case 'View All Roles':
        ViewAllroles();
        break;
    case "ADD role":
        AddRole();
        break;
    case 'View All departments':
        ViewAlldepartments();
        break;
    case 'Add department':
        Addepartment();
        break;
    case 'Delete Department':
        DeleteDepartment();
        break;
    case "Delete Role":
        DeleteRole();
        break;
    case 'Delete Employee':
        Deletemployee();
        break;
    case 'Quit':
        DataBase.end();
        break;
  }
});
};


// the following blocks of code will allow us to watch each table

function ViewAlldepartments () {
    let call  = 'SELECT * FROM department ORDER BY name;';
    DataBase.query(call, function (err, result) {
        if (err) throw err;
        console.table('\nDepartments:', result);
         init(); 
    });

};

function ViewAllroles () {
let call = 'SELECT role.id, title, department.name as department, salary FROM role JOIN department ON role.department_id = department.id;'

DataBase.query(call, function (err, result) {
if (err) throw err;
console.table('\nRoles:', result);
init();
});
};



function ViewAllEmployees() {
let call = 'SELECT employee.id, employee,first_name, employee_lastname, role.title, department.name as department, role.salary, CONCAT(boss.first_name, " ", boss.last_name) AS manager FROM employee JOIN role ON employe.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee as boss ON employee.manager_id = boss.id;';
DataBase.query(call,function (err, result) {
if (err) throw err;
console.table('employees', result);
init();

});
};



init();