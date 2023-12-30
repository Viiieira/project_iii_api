import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const EnergyModel = database.define(
	'energy',
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
		unit: {
			type: STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'Energy',
	}
);

export { EnergyModel };
