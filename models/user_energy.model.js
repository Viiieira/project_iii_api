import { INTEGER } from 'sequelize';
import { database } from '../config/context/database.js';
import { EnergyModel } from './energy.model.js';
import { UserModel } from './user.model.js';

const UserEnergyModel = database.define(
	'userenergy',
	{
		userID: {
			type: INTEGER,
			primaryKey: true,
		},
		energyID: {
			type: INTEGER,
			primaryKey: true,
		},
	},
	{
		tableName: 'UserEnergy',
	}
);

UserModel.hasMany(UserEnergyModel, { foreignKey: 'userID' });
EnergyModel.hasMany(UserEnergyModel, { foreignKey: 'energyID' });

export { UserEnergyModel };
