import { ProducerModel } from '../models/producer.model.js';
import { UserModel } from '../models/user.model.js';

// Get All Producers
export const getAllProducers = async (_req, res) => {
	const producers = await ProducerModel.findAll();

	return res.json(producers);
};

// Get Producer By ID
export const getById = async (req, res) => {
	const id = req.params.idGet;
	const producer = await ProducerModel.findByPk(id);
	if (!producer) {
		return res.status(500).json({ message: 'No Producer with this ID' });
	}

	return res.json(producer);
};

// Create Producer
export const create = async (req, res) => {
	try {
		const { idUser } = req.params;
		const { productionCapacity } = req.body;

		// See if there's already a producer with that ID
		const producerExists = await ProducerModel.findByPk(idUser);
		if (producerExists) {
			return res.status(500).json({ message: 'Producer already exists.' });
		}

		// See if this ID exists
		const userExists = await UserModel.findOne({
			where: {
				id: idUser,
			},
		});
		if (!userExists) {
			return res.status(500).json({ message: "There's no User with this ID." });
		}

		// Create the Producer
		const newProducer = await ProducerModel.create({ productionCapacity });

		return res.status(201).json(newProducer);
	} catch (error) {
		return res.status(500).json({ message: 'Error creating Producer.' });
	}
};
