import { PaymentModel } from '../models/payment.model.js';

export const getAll = async (_req, res) => {
	const payments = await PaymentModel.findAll();

	if (payments.length == 0) {
		return res.json({
			message: 'No payments were found.',
		});
	}

	return res.json(payments);
};

export const getById = async (req, res) => {
	const { id } = req.params;

	const payment = await PaymentModel.findByPk(id);
	if (!payment) {
		return res.status(404).json({
			error: 'No payment was found.',
		});
	}

	return res.json(payment);
};

export const getByTransactionId = async (req, res) => {
	const { transactionID } = req.params;

	const payment = await PaymentModel.findOne({
		where: {
			transactionID,
		},
	});
	if (!payment) {
		return res.status(404).json({
			error: 'No payment was found.',
		});
	}

	return res.json(payment);
};

export const disable = async (req, res) => {
	const { id } = req.params;

	const payment = await PaymentModel.findByPk(id);
	if (!payment) {
		return res.status(404).json({
			error: 'No payment was found.',
		});
	}

	payment.enabled = false;
	payment.save();

	return res.json(payment);
};

export const enable = async (req, res) => {
	const { id } = req.params;

	const payment = await PaymentModel.findByPk(id);
	if (!payment) {
		return res.status(404).json({
			error: 'No payment was found.',
		});
	}

	payment.enabled = true;
	payment.save();

	return res.json(payment);
};

// TODO: Test all the endpoints for the Payment
