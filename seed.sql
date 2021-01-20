INSERT INTO department(name)
VALUES
    ("managemnt"),
    ("database"),
    ("develpment"),
    ("markting");

INSERT INTO role(title, salary, department_id)
VALUES
    ("sales manager", 1000, 2),
    ("staff", 800, 1),
    ("Engineer", 1500, 1),
    ("Software developer", 120, 3),
    ("lawyer", 1200, 4)
    

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("mohamed", "hassan", 1, NULL),
    ("salim", "khadeer", 2, 1),
    ("rami", "shikh", 3, NULL),
    ("marwa", "adel", 4, 3),
    ("hend", "kamed", 5, NULL),
    ("shimaa", "khlil", 6, NULL),
    ("mohi", "shaker", 7, 6);