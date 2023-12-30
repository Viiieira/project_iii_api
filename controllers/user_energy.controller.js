import { EnergyModel } from '../models/energy.model.js';
import { UserModel } from '../models/user.model.js';
import { UserEnergyModel } from '../models/user_energy.model.js';

export const createUserEnergy = async (req, res) => {
	const { userID, energyID } = req.params;

	// See if this user exists
	const userExists = await UserModel.findByPk(userID);
	if (!userExists) {
		return res.status(500).json({
			error: 'No user with this ID was found.',
		});
	}

	// See if this energy exists
	const energyExists = await EnergyModel.findByPk(energyID);
	if (!energyExists) {
		return res.status(500).json({
			error: 'No energy with this ID was found.',
		});
	}

	// See if the same combination has been already inserted
	const combinationExists = await UserEnergyModel.findOne({
		where: {
			userID,
			energyID,
		},
	});
	if (combinationExists) {
		return res.status(500).json({
			error: 'This has already been previously inserted.',
		});
	}

	// Insert the new record
	const newUserEnergy = await UserEnergyModel.create({ userID, energyID });
	newUserEnergy.save();

	return res.json({
		api: 'createUserEnergy',
		newUserEnergy,
	});
};

export const deleteUserEnergy = async (req, res) => {
	const { userID, energyID } = req.params;

	// See if the combination doesnt exist
	const deleteRecord = await UserEnergyModel.findOne({
		where: {
			userID,
			energyID,
		},
	});
	if (!deleteRecord) {
		return res.status(500).json({
			error: 'This User Energy doesnt exist.',
		});
	}

	await deleteRecord.destroy();

	return res.json({
		message: 'The User Energy were succesfully deleted.',
	});
};

export const deleteUserEnergyByUserId = async (req, res) => {
	try {
		const { userID } = req.params;

		// See if this user has energy preferences
		const userExists = await UserEnergyModel.findAll({
			where: {
				userID,
			},
		});
		if (userExists.length == 0) {
			return res.status(500).json({
				error: 'This user doesnt have any energy preferences.',
			});
		}

		await UserEnergyModel.destroy({
			where: {
				userID,
			},
		});

		return res.json({
			message: 'All the energy preferences were deleted for the user.',
		});
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const getAllUserEnergy = async (_req, res) => {
	const userEnergies = await UserEnergyModel.findAll();

	if (userEnergies.length == 0) {
		return res.json({ message: 'There are no records' });
	}
	return res.json(userEnergies);
};

export const getByUserID = async (req, res) => {
	const { userID } = req.params;

	// See if this user has energy preferences
	const userEnergies = await UserEnergyModel.findAll({ where: { userID } });
	if (userEnergies.length == 0) {
		return res.json({
			message: 'This user doesnt have any energy preferences.',
		});
	}

	return res.json(userEnergies);
};

export const getByEnergyID = async (req, res) => {
	const { energyID } = req.params;

	// See if this user has energy preferences
	const userEnergies = await UserEnergyModel.findAll({ where: { energyID } });
	if (userEnergies.length == 0) {
		return res.json({
			message: 'There are no users with this energy preference.',
		});
	}

	return res.json(userEnergies);
};
