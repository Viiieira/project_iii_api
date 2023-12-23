import Router from 'express';
import {
	create,
	getAllProducers,
	getById,
} from '../controllers/producer.controller.js';

const producerRoutes = Router();

producerRoutes.get('/getAll', getAllProducers);
producerRoutes.get('/getById/:idGet', getById);
producerRoutes.post('/create/:idUser', create);

export { producerRoutes };
