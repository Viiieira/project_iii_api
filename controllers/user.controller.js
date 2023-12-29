import { UserModel } from '../models/user.model.js';
import { createToken } from '../utils/jwt.js';

export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({
		where: {
			email,
			password,
		},
	});

	if (!user) {
		return res.status(401).json({ message: 'Wrong credentials' }); // 401 = unauthorized
	}
	const token = createToken({
		id: user.id,
		username: user.username,
		role: user.role,
	}); // este payload, é o que futuramente vai estar dentro do req.user

	return res.json({
		token: `Bearer ${token}`,
	});
};

export const register = async (req, res) => {
	const { roleID, username, email, password, address, phone } = req.body;

	const usernameExists = await UserModel.findOne({
		where: {
			username,
		},
	});
	if (usernameExists) {
		return res.status(500).json({ message: 'username already exists' });
	}

	const emailExists = await UserModel.findOne({
		where: {
			email,
		},
	});
	if (emailExists) {
		return res.status(500).json({ message: 'email already exists' });
	}

	const user = await UserModel.create({
		roleID,
		username,
		email,
		password,
		address,
		phone,
	});

	return res.json(user);
};

export const deactivate = async (req, res) => {
	const { id } = req.params;

	const updatedUser = await UserModel.update({ enabled: 0 }, { where: { id } });

	if (updatedUser[0] === 1) {
		return res.json({
			message: 'User was deactivated successfully.',
		});
	} else {
		return res.status(500).json({
			message: 'User not found or enabled field not updated',
		});
	}
};
