import Router from 'express';
import { login, register, deactivate } from '../controllers/user.controller.js';

//--ROUTES--//
const usersRoutes = Router();

// http://localhost:4242/api/user/login
usersRoutes.post('/login', login);

// http://localhost:4242/api/user/register
usersRoutes.post('/register', register);

// http://localhost:4242/api/user/deactivate
usersRoutes.put('/deactivate/:id', deactivate);

// http://localhost:4242/api/user/activate
usersRoutes.put('/deactivate/:id', deactivate);

export { usersRoutes };
