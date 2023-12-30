import Router from 'express';
import {
	createUserRole,
	deleteUserRole,
	getAllUserRoles,
	updateUserRole,
} from '../controllers/user_role.controller.js';

//--ROUTES--//
const userRoleRoutes = Router();

// http://localhost:4242/api/todo/create
userRoleRoutes.post('/create', createUserRole);
userRoleRoutes.get('/getAll', getAllUserRoles);
userRoleRoutes.put('/update/:id', updateUserRole);
userRoleRoutes.delete('/delete/:id', deleteUserRole);

export { userRoleRoutes };
