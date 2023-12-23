import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

// users:
// Attributes: id (Primary Key), username, email, password, role, address, phone

const UserModel = database.define('user', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: STRING,
		allowNull: false,
		unique: true,
	},
	username: {
		type: STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: STRING,
		allowNull: false,
	},
	role: {
		type: STRING,
		allowNull: true,
	},
	address: {
		type: STRING,
		allowNull: true,
	},
	phone: {
		type: STRING,
		allowNull: true,
	},
});

// const B = sequelize.define('B', /* ... */);

// UserModel.hasOne(B); // UserModel HasOne B
// UserModel.belongsTo(B); // UserModel BelongsTo B
// UserModel.hasMany(B); // UserModel HasMany B
// UserModel.belongsToMany(B, { through: 'C' }); // UserModel BelongsToMany B through the junction table C
export { UserModel };
