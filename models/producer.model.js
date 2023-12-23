import { FLOAT, INTEGER } from 'sequelize';
import { database } from '../config/context/database.js';
import { UserModel } from './user.model.js';

/*
producers:
Attributes:
	idUser (Primary Key, Foreign Key referencing users),
	prodCapacity
*/
const ProducerModel = database.define('producer', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		primaryKey: true,
		references: {
			model: UserModel,
			key: 'id',
		},
	},
	productionCapacity: {
		type: FLOAT,
		allowNull: true,
	},
});

export { ProducerModel };
