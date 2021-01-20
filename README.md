# employee-traker

## description

I built this database schema using workbench

## department

- id- INT PRIMARY KEY
- name - VARCHAR(30) to hold department name

## role:

- id- INT PRIMARY KEY
- title- VARCHAR(30) to hold role title
- salary - DECIMAL to hold role salary
- department_id- INT to hold reference to department role belongs to

## employee:

- id- INT PRIMARY KEY
- first_name- VARCHAR(30) to hold employee first name
- last_name- VARCHAR(30) to hold employee last name
- role_id- INT to hold reference to role employee has
- manager_id- INT to hold reference to another employee that manages the employee

### The command-line application should allow users to:

- Add departments, roles, employees

- View departments, roles, employees

- Update employee roles

## user story

As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business

## technology

- MYSQL
- Node.js
- INquirer

## links

[Github repository](https://github.com/mohamedahmed-1980/employee-traker.git)

[DIMO](https://drive.google.com/file/d/1wQTOqUz7YQ_DHi-Q0vo6OO8LKmXTVHxF/view?usp=sharing)
