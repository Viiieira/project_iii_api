import Router from 'express';
import {
	activate,
	deactivate,
	getAll,
	login,
	register,
} from '../controllers/user.controller.js';

//--ROUTES--//
const usersRoutes = Router();

usersRoutes.put('/activate/:id', activate);
usersRoutes.put('/deactivate/:id', deactivate);
usersRoutes.post('/login', login);
usersRoutes.post('/register', register);

usersRoutes.get('/getAll', getAll);

export { usersRoutes };
