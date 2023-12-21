1) I created user admin with password admin.

2) And then i create database name expense_tracker using below command.
	CREATE TABLE expense_tracker;

3) Then i connect database with user using 
\c expense_tracker

4) Then i create table using below command.
	CREATE TABLE expenses (
	  id SERIAL PRIMARY KEY,
	  description VARCHAR(255) NOT NULL,
	  amount DECIMAL(10, 2) NOT NULL,
	  type VARCHAR(10) NOT NULL,
	  date DATE NOT NULL
	);
