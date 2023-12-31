import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const UserRoleModel = database.define(
	'userrole',
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'UserRole',
	}
);

export { UserRoleModel };
