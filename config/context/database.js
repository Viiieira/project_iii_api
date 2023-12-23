import Sequelize from 'sequelize';

// CREATE DATABASE projeto3;
// CREATE USER 'projeto3'@'%' IDENTIFIED BY 'projeto3';
// GRANT ALL PRIVILEGES ON *.* TO 'projeto3'@'%' WITH GRANT OPTION;
// FLUSH PRIVILEGES;

const database = new Sequelize({
	host: 'localhost',
	port: 3306,
	username: 'projeto3',
	password: 'projeto3',
	database: 'projeto3',
	dialect: 'mysql', //mysql, postgres, sqlite, mariadb and mssql,
});

export { database };
