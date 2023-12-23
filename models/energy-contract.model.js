// import { INTEGER, STRING } from 'sequelize';
import { DATE, INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const EnergyContractModel = database.define('energyContract', {
	//     ID          string `json:"id"`
	id: {
		type: INTEGER,
		autoIncrement: true,
		unique: true,
	},
	//     EndAt       string `json:"endAt,omitempty" metadata:"endAt,optional"`
	endAt: {
		type: DATE,
		allowNull: false,
	},
	//     Client      string `json:"client"`
	idClient: {
		type: INTEGER,
		allowNull: false,
	},
	//     Supplier    string `json:"supplier"`
	idSupplier: {
		type: INTEGER,
		allowNull: false,
	},
	//     FullAddress string `json:"fullAddress"`
	fullAddress: {
		type: STRING,
		allowNull: false,
	},
	//     Type        string `json:"type"` //daily, fixed
	idType: {
		type: INTEGER,
		allowNull: false,
	},
	//     Potency     string `json:"potency"`
	//     Notes       string `json:"notes,omitempty" metadata:"notes,optional"`
});

export { EnergyContractModel };

/*
users:
Attributes: id (Primary Key), username, email, password, role, address, phone, profile_pic

producers:
Attributes: idUser (Primary Key, Foreign Key referencing User), prodCapacity

consumers:
Attributes: idUser (Primary Key, Foreign key referencing User)

prosumers:
Attributes: idUser (Primary Key, Foreign key referencing User)

energyTypes:
Attributes: id (Primary Key), designation, unit

energyListings:
Attributes: id (Primary Key), producerID (Foreign Key referencing ), startAt, endAt, type (Foreign Key referencing energyTypes), availableCapacity, pricePerUnit, startAt, endAt, status

energyTransactions:
Attributes: id(Primary Key), listingID (Foreign Key referencing energyListings), consumerID (Foreign Key referencing consumers), quantity, totalPrice, transactionDt, status.

payments:
Attributes: id (Primary Key), transactionID(Foreign Key referencing energyTransactions), amount, paymentDt, status.

*/
