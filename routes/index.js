import Router from 'express';

import { producerRoutes } from './producer.routes.js';
import { todoRoutes } from './todo.routes.js';
import { usersRoutes } from './user.routes.js';

const routes = Router();
// http://localhost:4242/api/todo ....
routes.use('/todo', todoRoutes);

// http://localhost:4242/api/user ....
routes.use('/user', usersRoutes);

// http://localhost:4242/api/producer ....
routes.use('/producer', producerRoutes);

export { routes };
