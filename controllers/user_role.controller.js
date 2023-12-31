import { UserRoleModel } from '../models/user_role.model.js';

export const createUserRole = async (req, res) => {
	try {
		const { name } = req.body;

		// See if the name of the role is already being used
		const roleNameExists = await UserRoleModel.findOne({ where: { name } });
		if (roleNameExists) {
			return res.status(400).json({
				api: 'createUserRole',
				message: 'This Role Name is already being used.',
			});
		}

		const newRole = await UserRoleModel.create({ name });

		return res.json({ api: 'createUserRole', role: newRole });
	} catch (error) {
		console.error('Error in create UserRole:', error);
		return res
			.status(500)
			.json({ api: 'createUserRole', error: 'Internal Server Error' });
	}
};

export const getAllUserRoles = async (_req, res) => {
	try {
		const roles = await UserRoleModel.findAll();

		if (roles.length == 0) {
			return res.status(404).json({
				api: 'getAllUserRoles',
				message: 'No user roles found',
			});
		}

		return res.json(roles);
	} catch (error) {
		return res.status(500).json({
			api: 'getAllUserRoles',
			error: 'Internal Server Error',
		});
	}
};

export const updateUserRole = async (req, res) => {
	try {
		const { id } = req.params;
		const newName = req.body.name;

		// See if the ID exists
		const userRole = await UserRoleModel.findByPk(id);
		if (!userRole) {
			return res.status(404).json({
				api: 'updateUserRole',
				error: "This ID doesn't exist",
			});
		}

		// See if this newName is already taken
		const nameExists = await UserRoleModel.findOne({
			where: { name: newName },
		});
		if (nameExists) {
			return res.status(400).json({
				api: 'updateUserRole',
				error: 'This name is already taken.',
			});
		}

		// Update the record
		userRole.name = newName;
		await userRole.save();

		return res.json({
			api: 'updateUserRole',
			updatedUserRole: userRole,
		});
	} catch (error) {
		console.error('Error in updateUserRole:', error);
		return res.status(500).json({
			api: 'updateUserRole',
			error: 'Internal Server Error',
		});
	}
};

export const deleteUserRole = async (req, res) => {
	try {
		const { id } = req.params;

		// Find the ID of that role
		const role = await UserRoleModel.findByPk(id);
		if (!role) {
			return res.status(500).json({
				api: 'deleteUserRole',
				error: "This user role doesn't exist",
			});
		}

		await role.destroy();

		return res.json({
			api: 'deleteUserRole',
			message: 'User Role successfully deleted.',
		});
	} catch (error) {
		return res
			.status(500)
			.json({ api: 'deleteUserRole', error: 'Internal Server Error' });
	}
};
