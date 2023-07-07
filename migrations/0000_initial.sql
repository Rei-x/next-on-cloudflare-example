-- Migration number: 0000 	 2023-07-07T11:02:32.133Z

-- sqlite 
-- create table NOTES

DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');
