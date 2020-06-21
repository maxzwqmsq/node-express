//进入mysql数据库
mysql -u root -p




//创建表格 max_tbl
 CREATE TABLE max_tbl(
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(100) NOT NULL,
   author VARCHAR(40) NOT NULL,
   date DATE,
   PRIMARY KEY ( id )
   )ENGINE=InnoDB DEFAULT CHARSET=utf8;

//向max_tbl表中插入数据
INSERT INTO max_tbl 
(title, author, date)
VALUES
("max_tbl的第一条数据", "马爱鑫", NOW());

INSERT INTO max_tbl 
(title, author, date)
VALUES
("max_tbl的第二条数据", "马爱鑫", NOW())


//查询数据

select * from max_tbl;


//mysql 版本8 过高 导致node无法连接数据库
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
Solution：ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';