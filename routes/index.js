import Router from 'express';

import { todoRoutes } from './todo.routes.js';
import { usersRoutes } from './user.routes.js';

const routes = Router();
// http://localhost:4242/api/todo ....
routes.use('/todo', todoRoutes);

// http://localhost:4242/api/user ....
routes.use('/user', usersRoutes);

export { routes };
