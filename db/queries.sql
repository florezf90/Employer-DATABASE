-- view  departments 

SELECT *
FROM department
ORDER BY name;


-- View  roles

SELECT role.id, title, department.name AS department, salary
FROM role
JOIN department
ON role.department_id = department.id;



-- view  employees 

SELECT employee.id, employee.first_name, employee.last_name, role.title, 
department.name AS department, role.salary, CONCAT(boss.first_name, '', boss.last_name) AS manager
FROM employee
JOIN role
ON employee.role.id = role.id
JOIN department
ON role.department_id = department.id
lEFT JOIN employee AS boss
ON employee.manager_id = boss.id;