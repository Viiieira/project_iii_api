import Router from 'express';
import {
	create,
	deleteEnergy,
	getAll,
	getById,
	update,
} from '../controllers/energy.controller.js';

const energyRoutes = Router();

energyRoutes.get('/getAll', getAll);
energyRoutes.get('/getById/:id', getById);
energyRoutes.post('/create', create);
energyRoutes.put('/update/:id', update);
energyRoutes.delete('/delete/:id', deleteEnergy);

export { energyRoutes };
