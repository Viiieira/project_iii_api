import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const TodoModel = database.define('todo', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	todoText: {
		type: STRING,
		allowNull: false,
		unique: true,
	},
});
export { TodoModel };
