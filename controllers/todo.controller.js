import { TodoModel } from '../models/todo.model.js';

// Get All Todos
export const getAllTodos = async (_req, res) => {
	const todos = await TodoModel.findAll();
	return res.json(todos);
};

// Get Todo by ID
export const getById = async (req, res) => {
	const id = req.params.idGet;
	const todo = await TodoModel.findByPk(id);
	if (!todo) {
		return res.status(500).json({ message: 'No Todos with this ID.' });
	}

	return res.json(todo);
};

// Create a new Todo
export const create = async (req, res) => {
	try {
		const { todoText } = req.body;

		// See if this Todo exists
		const existingTodo = await TodoModel.findOne({ where: { todoText } });
		if (existingTodo) {
			return res
				.status(400)
				.json({ message: 'Todo with this text already exists.' });
		}

		const newTodo = await TodoModel.create({ todoText });

		return res.status(201).json(newTodo);
	} catch (error) {
		return res.status(500).json({ message: 'Error creating Todo.' });
	}
};

// Update Todo by ID
export const update = async (req, res) => {
	try {
		const id = req.params.idUpdate;
		const { todoText } = req.body;

		// See if the ID exists
		const todo = await TodoModel.findByPk(id);
		if (!todo) {
			return res.status(404).json({ message: 'Todo not found.' });
		}

		// See if there's already a todo item with the same text
		const existingTodo = await TodoModel.findOne({ where: { todoText } });
		if (existingTodo) {
			return res
				.status(400)
				.json({ message: 'Todo with this text already exists.' });
		}

		await todo.update({ todoText });

		return res.json(todo);
	} catch (error) {
		return res.status(500).json({ message: 'Error updating Todo.' });
	}
};

// Delete Todo by ID
export const deleteTodo = async (req, res) => {
	try {
		const id = req.params.idDelete;

		const todo = await TodoModel.findByPk(id);
		if (!todo) {
			return res.status(404).json({ message: 'Todo not found.' });
		}

		await todo.destroy();

		return res.json({ message: 'Todo deleted successfully.' });
	} catch (error) {
		return res.status(500).json({ message: 'Error deleting Todo.' });
	}
};

// // Create New Todo
// export const create = async (req, res) => {
// 	const { todoText } = req.body;

// 	// Verify is this todo item already exists
// 	const todoExists = await TodoModel.findAll({
// 		where: {
// 			todoText: todoText,
// 		},
// 	});

// 	if (todoExists) {
// 		return res.status(500).json({ message: 'This todo already exists' });
// 	}

// 	const createdTodo = await TodoModel.create({ todoText });
// 	return res.json(createdTodo);
// };

// // Update Todo
// export const update = async (req, res) => {
// 	// Buscar id do endpoint recebido
// 	const id = req.params.idUpdate;
// 	const { newTodoText } = req.body;

// 	// Replace if it exists
// 	const todoExists = await TodoModel.findByPk(id);
// 	if (!todoExists) {
// 		return res.status(500).json({ message: 'No todo was found.' });
// 	}

// 	const updatedTodo = await TodoModel.update(
// 		{ todoText: newTodoText },
// 		{ where: { id: id } }
// 	);

// 	return res.json({ api: 'updateTodo', newItem: updatedTodo });
// };

// // Delete Todo
// export const deleteTodo = async (req, res) => {
// 	const id = req.params.idDelete;

// 	// Verify is this todo item exists
// 	const todoExists = await TodoModel.findByPk(id);
// 	if (!todoExists) {
// 		return res.status(500).json({ message: "This todo doesn't exist." });
// 	}

// 	const deletedTodo = await TodoModel.destroy({
// 		where: { id: id },
// 	});
// 	return res.json({ api: 'deleteTodo', deletedTodo });
// };
