import dotenv from 'dotenv';
import Sequelize from 'sequelize';

// CREATE DATABASE projeto3;
// CREATE USER 'projeto3'@'%' IDENTIFIED BY 'projeto3';
// GRANT ALL PRIVILEGES ON *.* TO 'projeto3'@'%' WITH GRANT OPTION;
// FLUSH PRIVILEGES;

// Load environment variables from .env file
dotenv.config();

const database = new Sequelize({
	host: process.env.DB_HOST || 'node_db',
	port: process.env.DB_PORT || 3306,
	username: process.env.DB_USERNAME || 'vieira',
	password: process.env.DB_PASSWORD || '12345',
	database: process.env.DB_NAME || 'projeto3',
	dialect: 'mysql',
});

export { database };
