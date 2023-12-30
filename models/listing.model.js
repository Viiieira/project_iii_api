import { BOOLEAN, FLOAT, INTEGER } from 'sequelize';
import { database } from '../config/context/database.js';
import { EnergyModel } from './energy.model.js';
import { UserModel } from './user.model.js';

const ListingModel = database.define(
	'listing',
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		producerID: {
			type: INTEGER,
			allowNull: false,
		},
		energyID: {
			type: INTEGER,
			allowNull: false,
		},
		amount: {
			type: FLOAT,
			allowNull: false,
		},
		pricePerUnit: {
			type: FLOAT,
			allowNull: false,
		},
		enabled: {
			type: BOOLEAN,
			default: true,
		},
	},
	{
		tableName: 'Listing',
	}
);

UserModel.hasMany(ListingModel, { foreignKey: 'producerID' });
EnergyModel.hasMany(ListingModel, { foreignKey: 'energyID' });

export { ListingModel };
