DROP DATABASE IF EXISTS emplyeeDB;
CREATE DATABASE emplyeeDB; 
USE emplyeeDB;

CREATE TABLE department ( 
id INTEGER auto_increment NOT NULL, 
name VARCHAR (255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role ( 
id INTEGER auto_increment NOT NULL,
title  VARCHAR(30) NOT NULL,
salary DECIMAL (6,2),
department_id  INTEGER ,
PRIMARY KEY (id)
);

CREATE TABLE employee ( 
id INTEGER auto_increment NOT NULL,
first_name  VARCHAR(30) NOT NULL,
last_name  VARCHAR(30) NOT NULL,
role_id  INTEGER, 
manager_id INTEGER ,
PRIMARY KEY (id)
);