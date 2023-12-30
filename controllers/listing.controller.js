import { EnergyModel } from '../models/energy.model.js';
import { ListingModel } from '../models/listing.model.js';
import { UserModel } from '../models/user.model.js';

export const getAll = async (_req, res) => {
	const listings = await ListingModel.findAll();

	if (listings.length === 0) {
		return res.json({ message: 'There are no listings.' });
	}

	return res.json(listings);
};

export const getById = async (req, res) => {
	const { id } = req.params;

	// See if the ID exists
	const listing = await ListingModel.findByPk(id);
	if (!listing) {
		return res.status(404).json({
			error: 'No listing was found.',
		});
	}

	return res.json(listing);
};

export const getByProducerId = async (req, res) => {
	const { producerID } = req.params;

	// See if the ProducerID exists (ID exists and has producer role)
	const listing = await ListingModel.findOne({
		where: {
			producerID,
		},
	});
	if (!listing) {
		return res.status(404).json({
			error: 'No listing was found.',
		});
	}

	return res.json(listing);
};

export const getByEnergyId = async (req, res) => {
	const { energyID } = req.params;

	// See if the ProducerID exists (ID exists and has producer role)
	const listing = await ListingModel.findOne({
		where: {
			energyID,
		},
	});
	if (!listing) {
		return res.status(404).json({
			error: 'No listing was found.',
		});
	}

	return res.json(listing);
};

export const create = async (req, res) => {
	const { producerID, energyID, amount, pricePerUnit } = req.body;

	console.log({ producerID, energyID, amount, pricePerUnit });
	// See if the Producer exists
	const producerExists = await UserModel.findOne({
		where: {
			id: producerID,
			roleID: 2,
		},
	});
	if (!producerExists) {
		return res.status(500).json({
			error: 'This producer doesnt exist',
		});
	}

	// See if the Energy type exists
	const energyExists = await EnergyModel.findOne({
		where: {
			id: energyID,
		},
	});
	if (!energyExists) {
		return res.status(500).json({
			error: 'This energy doesnt exist',
		});
	}

	// See if the amount and pricePerUnit are valid
	if (amount < 0 || pricePerUnit < 0) {
		return res.status(500).json({
			message: 'Insert valid amounts.',
		});
	}

	const newListing = await ListingModel.create({
		producerID,
		energyID,
		amount,
		pricePerUnit,
	});

	return res.json(newListing);
};

export const update = async (req, res) => {
	const { id } = req.params;
	const { producerID, energyID, amount, pricePerUnit } = req.body;

	// See if the listing exists
	const listing = await ListingModel.findByPk(id);
	if (!listing) {
		return res.json({ error: 'No listing was found.' });
	}

	// See if the producer exists
	const producerExists = await UserModel.findOne({
		where: {
			id: producerID,
			roleID: 2,
		},
	});
	if (!producerExists) {
		return res.status(500).json({
			error: 'No producer was found.',
		});
	}

	// See if the energy id exists
	const energyExists = await EnergyModel.findByPk(energyID);
	if (!energyExists) {
		return res.status(500).json({
			error: 'No energy was found',
		});
	}

	// See if the float values are valid
	if (amount < 0 || pricePerUnit < 0) {
		return res.status(500).json({
			error: 'Please input valid values',
		});
	}

	// Update the listing
	listing.producerID = producerID;
	listing.energyID = energyID;
	listing.amount = amount;
	listing.pricePerUnit = pricePerUnit;
	listing.save();

	return res.json(listing);
};

export const enableListing = async (req, res) => {
	const { id } = req.params;

	// See if the listing exists
	const listing = await ListingModel.findByPk(id);
	if (!listing) {
		return res.status(404).json({
			error: 'No listing was found.',
		});
	}

	// Enable it
	listing.enabled = true;
	listing.save();

	return res.json(listing);
};

export const disableListing = async (req, res) => {
	const { id } = req.params;

	// See if the listing exists
	const listing = await ListingModel.findByPk(id);
	if (!listing) {
		return res.status(404).json({
			error: 'No listing was found.',
		});
	}

	// Disable it
	listing.enabled = false;
	listing.save();

	return res.json(listing);
};

export const deleteListing = async (req, res) => {
	const { id } = req.params;

	// See if the listing exists
	const listing = await ListingModel.findByPk(id);
	if (!listing) {
		return res.status(404).json({
			error: 'No listing was found.',
		});
	}

	await listing.destroy();

	return res.json({
		message: 'Listing was successfully deleted',
	});
};
