-- First query
INSERT INTO Department (name)
VALUES ('SALES'),
       ('LEGAL'),
       ('FINANCE'),
       ('ENGINEERING');

-- Second query
INSERT INTO role (title, salary, Department_id)
VALUES ('Sales lead', 100000, 1),
       ('Salesman', 100000, 1),
       ('Lead Engineer', 140000, 2),
       ('Software Engineer', 110000, 2),
       ('Account manager', 160000, 3),
       ('Accountant', 90000, 3),
       ('Legal Team Lead', 200000, 4),
       ('Lawyer', 180000, 4);

-- Third query
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Travolta', 1, NULL),
       ('Juan', 'Camacho', 2, 1),
       ('Rodrigo', 'Faez', 3, NULL),
       ('Will', 'Rodriguez', 4, 3),
       ('Magic', 'Cash', 5, NULL),
       ('Jeremy', 'Miner', 6, 5),
       ('Robert', 'Roberson', 7, NULL),
       ('Felipe', 'Florez', 8, 7);
