import { BOOLEAN, FLOAT, INTEGER } from 'sequelize';
import { database } from '../config/context/database.js';
import { ListingModel } from './listing.model.js';
import { UserModel } from './user.model.js';

const TransactionModel = database.define(
	'transaction',
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		listingID: {
			type: INTEGER,
			allowNull: false,
		},
		consumerID: {
			type: INTEGER,
			allowNull: false,
		},
		amount: {
			type: FLOAT,
			allowNull: false,
		},
		enabled: {
			type: BOOLEAN,
			default: true,
		},
	},
	{
		tableName: 'Transaction',
	}
);

ListingModel.hasMany(TransactionModel, { foreignKey: 'listingID' });
UserModel.hasMany(TransactionModel, { foreignKey: 'consumerID' });

export { TransactionModel };
