import Router from 'express';
import {
	disable,
	enable,
	getAll,
	getById,
	getByTransactionId,
} from '../controllers/payment.controller.js';

//--ROUTES--//
const paymentRoutes = Router();

paymentRoutes.get('/getAll', getAll);
paymentRoutes.get('/getById/:id', getById);
paymentRoutes.get('/getByTransactionId/:transactionID', getByTransactionId);
paymentRoutes.put('/enable/:id', enable);
paymentRoutes.put('/disable/:id', disable); // Soft-delete

export { paymentRoutes };
