import Router from 'express';
import { create, getAll } from '../controllers/user_role.controller.js';

//--ROUTES--//
const userRoleRoutes = Router();

// http://localhost:4242/api/todo/create
userRoleRoutes.post('/create', create);
userRoleRoutes.get('/getAll', getAll);

export { userRoleRoutes };
