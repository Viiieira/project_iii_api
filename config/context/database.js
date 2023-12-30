import dotenv from 'dotenv';
import Sequelize from 'sequelize';

// CREATE DATABASE projeto3;
// CREATE USER 'projeto3'@'%' IDENTIFIED BY 'projeto3';
// GRANT ALL PRIVILEGES ON *.* TO 'projeto3'@'%' WITH GRANT OPTION;
// FLUSH PRIVILEGES;

// docker run -d --name mysql_project_iii -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_USER=vieira -e MYSQL_PASSWORD=1234 -e MYSQL_DATABASE=project_iii_db -p 3306:3306 mysql

// Load environment variables from .env file
dotenv.config();

const database = new Sequelize({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	username: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_NAME,
	dialect: 'mysql',
});

export { database };
