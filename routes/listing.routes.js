import Router from 'express';
import {
	create,
	disableListing,
	enableListing,
	getAll,
	getByEnergyId,
	getById,
	getByProducerId,
	update,
} from '../controllers/listing.controller.js';

const listingRoutes = Router();

listingRoutes.get('/getAll', getAll);
listingRoutes.get('/getById/:id', getById);
listingRoutes.get('/getByProducerId/:producerID', getByProducerId);
listingRoutes.get('/getByEnergyId/:energyID', getByEnergyId);
listingRoutes.post('/create', create);
listingRoutes.put('/update/:id', update);
listingRoutes.put('/enable/:id', enableListing);
listingRoutes.put('/disable/:id', disableListing);

export { listingRoutes };
