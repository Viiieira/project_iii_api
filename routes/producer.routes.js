import Router from 'express';
import {
	create,
	getAllProducers,
	getById,
	update,
	deleteProducer,
} from '../controllers/producer.controller.js';

const producerRoutes = Router();

producerRoutes.post('/create/:idUser', create);
producerRoutes.get('/getAll', getAllProducers);
producerRoutes.get('/getById/:idGet', getById);
producerRoutes.put('/update/:idUpdate', update);
producerRoutes.delete('/delete/:idDelete', deleteProducer);

export { producerRoutes };
