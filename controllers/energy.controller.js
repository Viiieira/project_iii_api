import { EnergyModel } from '../models/energy.model.js';

export const create = async (req, res) => {
	const { name, unit } = req.body;

	// See if this Energy name already exists
	const energyExists = await EnergyModel.findOne({
		where: { name },
	});
	if (energyExists) {
		return res.status(500).json({
			api: 'createEnergy',
			error: 'This Energy type already exists',
		});
	}

	const newEnergy = await EnergyModel.create({ name, unit });

	return res.json(newEnergy);
};

export const getAll = async (_req, res) => {
	try {
		const roles = await EnergyModel.findAll();

		if (roles.length == 0) {
			return res.status(404).json({
				message: 'There are no energies.',
			});
		}

		return res.json(roles);
	} catch (error) {
		return res.status(500).json({
			api: 'getAllEnergies',
			error: 'Internal Server Error',
		});
	}
};

export const getById = async (req, res) => {
	try {
		const { id } = req.params;

		const energy = await EnergyModel.findByPk(id);
		if (!energy) {
			return res.status(404).json({
				api: 'getEnergyById',
				error: 'No Energy was found with this ID.',
			});
		}

		return res.json(energy);
	} catch (error) {
		return res.status(500).json({
			api: 'getEnergyById',
			error: 'Internal Server Error',
		});
	}
};

export const update = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, unit } = req.body;

		// See if this ID exists
		const energy = await EnergyModel.findByPk(id);
		if (!energy) {
			return res.status(404).json({
				api: 'updateEnergy',
				error: 'No Energy was found with this ID.',
			});
		}

		// See if there's already a energy with this name
		const energyNameExists = await EnergyModel.findOne({
			where: { name },
		});
		if (energyNameExists) {
			return res.status(500).json({
				error: 'There is already an energy with name',
			});
		}

		energy.name = name;
		energy.unit = unit;
		energy.save();

		return res.json(energy);
	} catch (error) {
		return res.status(500).json({
			error: 'Internal Server Error',
		});
	}
};

export const deleteEnergy = async (req, res) => {
	try {
		const { id } = req.params;

		// See if this ID exists
		const energy = await EnergyModel.findByPk(id);
		if (!energy) {
			return res.status(500).json({
				error: 'No Energy exists with this ID.',
			});
		}

		await energy.destroy();

		return res.json({
			api: 'Energy deleted successfully!',
		});
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
