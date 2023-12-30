import Router from 'express';

import { usersRoutes } from './user.routes.js';
import { userRoleRoutes } from './user_role.routes.js';
import { energyRoutes } from './energy.routes.js';

const routes = Router();

// http://localhost:4242/api/user ....
routes.use('/user', usersRoutes);

// http://localhost:4242/api/user_role ....
routes.use('/user_role', userRoleRoutes);

// http://localhost:4242/api/energy
routes.use('/energy', energyRoutes)

export { routes };
