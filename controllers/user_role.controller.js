import { UserRoleModel } from '../models/user_role.model.js';

export const create = async (req, res) => {
	const { id, name } = req.body;

	// See if this ID already exists
	const roleIDExists = await UserRoleModel.findByPk(id);
	if (roleIDExists) {
		return res.status(500).json({
			api: 'createUserRoleError',
			message: 'This Role ID already exists',
		});
	}

	// See if this User Role already exists
	const roleCount = await UserRoleModel.count({ where: { name } });
	if (roleCount > 0) {
		return res.status(400).json({
			api: 'createUserRole',
			message: 'This Role Name already exists',
		});
	}

	const newRole = await UserRoleModel.create({ id, name });

	return res.json(newRole);
};

export const getAll = async (_req, res) => {
	const roles = await UserRoleModel.getAll();
	if (!roles) {
		return res.status(500).json({ message: 'There are no roles.' });
	}

	return res.json(roles);
};
