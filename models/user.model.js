import { BOOLEAN, INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';
import { UserRoleModel } from './user_role.model.js';

const UserModel = database.define(
	'user',
	{
		id: {
			type: INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		roleID: {
			type: INTEGER,
			allowNull: false,
		},
		username: {
			type: STRING,
			allowNull: false,
		},
		email: {
			type: STRING,
			allowNull: false,
		},
		password: {
			type: STRING,
			allowNull: false,
		},
		address: {
			type: STRING,
			allowNull: true,
		},
		phone: {
			type: STRING,
			allowNull: true,
		},
		enabled: {
			type: BOOLEAN,
			allowNull: true,
			defaultValue: true,
		},
	},
	{
		tableName: 'User',
	}
);

UserRoleModel.hasMany(UserModel, { foreignKey: 'roleID' });

export { UserModel };
