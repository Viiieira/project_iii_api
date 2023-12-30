import Router from 'express';
import {
	activate,
	deactivate,
	login,
	register,
} from '../controllers/user.controller.js';

//--ROUTES--//
const usersRoutes = Router();

// http://localhost:4242/api/user/activate
usersRoutes.put('/activate/:id', activate);

// http://localhost:4242/api/user/deactivate
usersRoutes.put('/deactivate/:id', deactivate);

// http://localhost:4242/api/user/login
usersRoutes.post('/login', login);

// http://localhost:4242/api/user/register
usersRoutes.post('/register', register);

export { usersRoutes };
