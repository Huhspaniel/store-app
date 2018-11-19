INSERT INTO Departments (name) VALUES ('Electronics');
INSERT INTO Departments (name) VALUES ('Books');
INSERT INTO Departments (name) VALUES ('Video Games');
INSERT INTO Departments (name) VALUES ('Movies');
INSERT INTO Departments (name) VALUES ('Furniture');
INSERT INTO Departments (name) VALUES ('Musical Instruments');

INSERT INTO ProductOwners (name, type) VALUES ('Apple', 'corporation');
INSERT INTO ProductOwners (name, type) VALUES ('J.R.R. Tolkien', 'author');
INSERT INTO ProductOwners (name, type) VALUES ('Microsoft', 'corporation');
INSERT INTO ProductOwners (name, type) VALUES ('Peter Jackson', 'director');
INSERT INTO ProductOwners (name, type) VALUES ('IKEA', 'corporation');
INSERT INTO ProductOwners (name, type) VALUES ('Andy Wachowski', 'director');
INSERT INTO ProductOwners (name, type) VALUES ('Larry Wachowski', 'director');
INSERT INTO ProductOwners (name, type) VALUES ('Activision', 'corporation');

INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, img) VALUES ('iPhone X, Fully Unlocked, 64 GB', 1070, 100, 1, 'https://images-na.ssl-images-amazon.com/images/I/51qibZNVexL._SL1050_.jpg');
INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, img) VALUES ('iPhone 6, GSM Unlocked, 64 GB', 199.99, 500, 1, 'https://images-na.ssl-images-amazon.com/images/I/51bvItLxhqL.jpg');
INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, img) VALUES ('Xbox One X 1TB Console', 470, 200, 3, 'https://images-na.ssl-images-amazon.com/images/I/61ux1cU49XL._AC_.jpg');
INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, platform, img) VALUES ('Call of Duty: Black Ops 4', 60, 500, 3, 'Xbox','https://images-na.ssl-images-amazon.com/images/I/812vQ9aeXML._AC_SL1500_.jpg');
INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, img) VALUES ('4 Film Favorites: The Matrix Collection', 12.99, 600, 4, 'https://images-na.ssl-images-amazon.com/images/I/61jv6LrpiqL.jpg');
INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, img) VALUES ('The Lord of the Rings', 55, 400, 4);
INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, img) VALUES ('The Lord of the Rings', 10, 600, 2);
INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, img) VALUES ('Nord Stage 3', 4500, 600, 6);
INSERT INTO Products (product_name, price, stock_quantity, DepartmentId, img) VALUES ('JUNO DS-88', 1000, 100, 6);