import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database';
import { TransactionModel } from './transaction.model.js';

const PaymentModel = database.define(
	'payment',
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		transactionID: {
			type: INTEGER,
			allowNull: false,
		},
		totalPrice: {
			type: FLOAT,
			allowNull: false,
		},
		method: {
			type: STRING,
			allowNull: false,
		},
		enabled: {
			type: BOOLEAN,
			allowNull: false,
			default: true,
		},
	},
	{
		tableName: 'Payment',
	}
);

TransactionModel.hasMany(PaymentModel, { foreignKey: 'transactionID' });

export { PaymentModel };
