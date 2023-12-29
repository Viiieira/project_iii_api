import { BOOLEAN, INTEGER, STRING, Sequelize } from 'sequelize';
import { database } from '../config/context/database.js';
import { UserRoleModel } from './user_role.model.js';

const UserModel = database.define('user', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	roleID: {
		type: INTEGER,
		allowNull: false,
		references: {
			model: 'userroles',
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
});

UserModel.belongsTo(UserRoleModel, { foreignKey: 'roleID', targetKey: 'id' });

// const B = sequelize.define('B', /* ... */);

// UserModel.hasOne(B); // UserModel HasOne B
// UserModel.belongsTo(B); // UserModel BelongsTo B
// UserModel.hasMany(B); // UserModel HasMany B
// UserModel.belongsToMany(B, { through: 'C' }); // UserModel BelongsToMany B through the junction table C
export { UserModel };
