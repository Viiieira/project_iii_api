import { ListingModel } from '../models/listing.model.js';
import { TransactionModel } from '../models/transaction.model.js';
import { UserModel } from '../models/user.model.js';

export const getAll = async (_req, res) => {
	const transactions = await TransactionModel.findAll();

	if (transactions.length == 0) {
		return res.json({ message: 'Transactions are empty.' });
	}

	return res.json(transactions);
};

export const getById = async (req, res) => {
	const { id } = req.params;

	// See if the Transaction exists By ID
	const transaction = await TransactionModel.findOne({
		where: { id },
	});
	if (!transaction) {
		return res.status(404).json({ error: 'No transaction was found.' });
	}

	return res.json(transaction);
};

export const getByListingId = async (req, res) => {
	const { listingID } = req.params;

	// See if the Transaction exists By ID
	const transaction = await TransactionModel.findOne({
		where: { listingID },
	});
	if (!transaction) {
		return res.status(404).json({ error: 'No transaction was found.' });
	}

	return res.json(transaction);
};

export const getByConsumerId = async (req, res) => {
	const { consumerID } = req.params;

	// See if the Transaction exists By ID
	const transaction = await TransactionModel.findOne({
		where: { consumerID },
	});
	if (!transaction) {
		return res.status(404).json({ error: 'No transaction was found.' });
	}

	return res.json(transaction);
};

export const enable = async (req, res) => {
	const { id } = req.params;

	// See if the transaction exists
	const transaction = await TransactionModel.findOne({
		where: { id },
	});
	if (!transaction) {
		return res.status(404).json({ error: 'No transaction was found.' });
	}

	transaction.enabled = true;
	transaction.save();

	return res.json(transaction);
};

export const disable = async (req, res) => {
	const { id } = req.params;

	// See if the transaction exists
	const transaction = await TransactionModel.findOne({
		where: { id },
	});
	if (!transaction) {
		return res.status(404).json({ error: 'No transaction was found.' });
	}

	transaction.enabled = false;
	transaction.save();

	return res.json(transaction);
};

export const update = async (req, res) => {
	const { id } = req.params;
	const { listingID, consumerID, amount, totalPrice } = req.body;

	// See if the transaction exists
	const transaction = await TransactionModel.findOne({
		where: { id },
	});
	if (!transaction) {
		return res.status(404).json({ error: 'No transaction was found.' });
	}

	// See if the Listing exists and its enabled
	const listingExists = await ListingModel.findOne({
		where: {
			id: listingID,
			enabled: true,
		},
	});
	if (!listingExists) {
		return res.status(500).json({
			error: 'Listing was not found.',
		});
	}

	// See if the Consumer exists (user + role consumer)
	const consumerExists = await UserModel.findOne({
		where: {
			id: consumerID,
			roleID: 3,
		},
	});
	if (!consumerExists) {
		return res.status(500).json({
			error: 'Consumer was not found.',
		});
	}

	if (amount < 0 || totalPrice < 0) {
		return res.status(500).json({
			error: 'Inser valid amounts',
		});
	}

	transaction.listingID = listingID;
	transaction.consumerID = listingID;
	transaction.amount = amount;
	transaction.totalPrice = totalPrice;
	transaction.save();

	return res.json(transaction);
};

export const create = async (req, res) => {
	const { listingID, consumerID, amount, totalPrice } = req.body;

	// See if this Listing exists
	// See if the Listing exists and its enabled
	const listingExists = await ListingModel.findOne({
		where: {
			id: listingID,
			enabled: true,
		},
	});
	if (!listingExists) {
		return res.status(500).json({
			error: 'Listing was not found.',
		});
	}

	// See if the Consumer exists (user + role consumer)
	const consumerExists = await UserModel.findOne({
		where: {
			id: consumerID,
			roleID: 3, // Consumer ID
		},
	});
	if (!consumerExists) {
		return res.status(500).json({
			error: 'Consumer was not found.',
		});
	}

	if (amount < 0 || totalPrice < 0) {
		return res.status(500).json({
			error: 'Inser valid amounts',
		});
	}

	const newTransaction = await TransactionModel.create({
		listingID,
		consumerID,
		amount,
		totalPrice,
		enabled: true,
	});
	return res.json(newTransaction);
};
