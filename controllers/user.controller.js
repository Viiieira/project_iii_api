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
		xpto: user.id,
		username: user.username,
		batatas: 2,
		role: user.role,
	}); // este payload, é o que futuramente vai estar dentro do req.user

	return res.json({
		token: `Bearer ${token}`,
	});
};

export const register = async (req, res) => {
	const { username, email, password, role, address, phone } = req.body;

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

	// const { password: asujkhgbv, ...newUser } = await UserModel.create({
	// 	username: username,
	// 	password,
	// });

	// return res.json(newUser);

	const user = await UserModel.create({
		username,
		email,
		password,
		role,
		address,
		phone,
	});

	return res.json(user);
};
