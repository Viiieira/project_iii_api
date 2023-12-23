import { UserModel } from '../models/user.model.js';
import { createToken } from '../utils/jwt.js';

export const login = async (req, res) => {
	const { username, password } = req.body;

	const user = await UserModel.findOne({
		where: {
			username,
			password,
		},
	});

	if (!user) {
		return res.status(401).json({ message: 'Login invalido' }); // 401 = unauthorized
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
	const { username, password } = req.body;

	const userExists = await UserModel.findAll({
		where: {
			username,
		},
	});

	if (userExists) {
		return res.status(500).json({ message: 'username already exists' });
	}

	// const { password: asujkhgbv, ...newUser } = await UserModel.create({
	// 	username: username,
	// 	password,
	// });

	// return res.json(newUser);

	const user = await UserModel.create({
		username: username,
		password,
	});

	return res.json(user);
};
