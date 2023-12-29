import Router from 'express';

import { usersRoutes } from './user.routes.js';
import { userRoleRoutes } from './user_role.routes.js';

const routes = Router();

// http://localhost:4242/api/user ....
routes.use('/user', usersRoutes);

// http://localhost:4242/api/user_role ....
routes.use('/user_role', userRoleRoutes);

export { routes };
