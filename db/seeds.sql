INSERT INTO department (name)
VALUES
('kitchen'),
('Front_House'),
('Back_House');

INSERT INTO role (title, salary, department_id)
VALUES
('cook', 30000, 1),
('dish washer', 20000, 2),
('host', 25000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Lori', 'Timmons', 1, NULL),
('Mike', 'Timmons', 3, NULL),
('Andi', 'Timmons', 3, 1),
('Ryan', 'Timmons', 2, 2),
('Kyle', 'Timmons', 3, NULL),
('Eddy', 'Timmons', 1, NULL);
