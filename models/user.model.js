import { BOOLEAN, INTEGER, STRING, Sequelize } from 'sequelize';
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
			references: {
				model: 'UserRole',
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
			},
		},
		username: {
			type: STRING,
			allowNull: false,
			unique: 'unique_username',
		},
		email: {
			type: STRING,
			allowNull: false,
			unique: 'unique_email',
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

UserModel.belongsTo(UserRoleModel, { foreignKey: 'roleID' });

export { UserModel };
