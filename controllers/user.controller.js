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
			error: 'Wrong credentials',
		});
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return res.status(401).json({
			api: 'login',
			error: 'Wrong credentials',
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
	try {
		const { id } = req.params;

		// See if the ID exists
		const user = await UserModel.findByPk(id);
		if (!user) {
			return res.status(404).json({
				api: 'deactivate',
				error: "This ID doesn't exist",
			});
		}

		user.enabled = false;
		await user.save();

		return res.json({
			api: 'deactivate',
			user,
		});
	} catch (error) {
		return res.status(500).json({
			api: 'deactivate',
			error: 'Server Internal Error',
		});
	}
};

export const activate = async (req, res) => {
	const { id } = req.params;

	// See if the ID exists
	const user = await UserModel.findByPk(id);
	if (!user) {
		return res.status(404).json({
			api: 'activate',
			error: "This ID doesn't exist",
		});
	}

	user.enabled = true;
	await user.save();

	return res.json({
		api: 'activate',
		user,
	});
};
