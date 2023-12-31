import Router from 'express';

import { energyRoutes } from './energy.routes.js';
import { listingRoutes } from './listing.routes.js';
import { paymentRoutes } from './payment.routes.js';
import { transactionRoutes } from './transaction.routes.js';
import { usersRoutes } from './user.routes.js';
import { userEnergyRoutes } from './user_energy.routes.js';
import { userRoleRoutes } from './user_role.routes.js';

const routes = Router();

routes.use('/user', usersRoutes);
routes.use('/user_role', userRoleRoutes);
routes.use('/energy', energyRoutes);
routes.use('/user_energy', userEnergyRoutes);
routes.use('/listing', listingRoutes);
routes.use('/transaction', transactionRoutes);
routes.use('/payment', paymentRoutes);

export { routes };
