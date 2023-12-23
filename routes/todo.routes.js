import Router from 'express';
import {
	create,
	deleteTodo,
	getAllTodos,
	getById,
	update,
} from '../controllers/todo.controller.js';
import { authRequired } from '../utils/jwt.js';

//--ROUTES--//
const todoRoutes = Router();

// http://localhost:4242/api/todo/getAll
todoRoutes.get('/getAll', getAllTodos);
todoRoutes.get('/getById/:idGet', getById);
todoRoutes.post('/create', authRequired, create);
todoRoutes.put('/update/:idUpdate', authRequired, update);
todoRoutes.delete('/delete/:idDelete', authRequired, deleteTodo);

export { todoRoutes };
