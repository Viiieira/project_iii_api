import { Router } from 'express';
import {
	create,
	disable,
	enable,
	getAll,
	getByConsumerId,
	getById,
	getByListingId,
	update,
} from '../controllers/transaction.controller.js';

const transactionRoutes = Router();

transactionRoutes.get('/getAll', getAll);
transactionRoutes.get('/getById/:id', getById);
transactionRoutes.get('/getByListingId/:listingID', getByListingId);
transactionRoutes.get('/getByConsumerId/:consumerID', getByConsumerId);
transactionRoutes.put('/enable/:id', enable);
transactionRoutes.put('/disable/:id', disable);
transactionRoutes.put('/update/:id', update);
transactionRoutes.post('/create/', create);

export { transactionRoutes };
