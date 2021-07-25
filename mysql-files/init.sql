CREATE USER 'root'@'%' IDENTIFIED BY 'Rahul@123';
-- ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Rahul@123';
GRANT ALL ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;