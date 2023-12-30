import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';
import { createToken } from '../utils/jwt.js';

export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({
		where: {
			email,
		},
	});

	if (!user) {
		return res.status(401).json({
			api: 'login',
			message: 'Wrong credentials',
		});
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return res.status(401).json({
			api: 'login',
			message: 'Wrong credentials',
		});
	}

	const token = createToken({
		id: user.id,
		username: user.username,
		role: user.role,
	}); // este payload, é o que futuramente vai estar dentro do req.user

	return res.json({
		api: 'login',
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
		return res.status(500).json({
			api: 'register',
			message: 'Username already exists',
		});
	}

	const emailExists = await UserModel.findOne({
		where: {
			email,
		},
	});
	if (emailExists) {
		return res.status(500).json({
			api: 'register',
			message: 'This email is already taken',
		});
	}

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const user = await UserModel.create({
		roleID,
		username,
		email,
		password: hashedPassword,
		address,
		phone,
	});

	return res.json({ api: 'register', user });
};

export const deactivate = async (req, res) => {
	const { id } = req.params;

	const updatedUser = await UserModel.update(
		{ enabled: 0 },
		{ where: { id } }
	);

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
