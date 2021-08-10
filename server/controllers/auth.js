const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
	const { name, picture, email } = req.user;

	const user = await User.findOneAndUpdate(
		{ email },
		{ name, picture },
		{ new: true }
	);

	if (user) {
		res.json(user);
	} else {
		const newUser = await new User({
			email,
			name,
			picture,
		}).save();

		res.json(newUser);
	}
};

exports.currentUser = (req, res) => {
	User.findOne({ email: req.user.email }).exec((error, user) => {
		if (error) throw new error();
		res.json(user);
	});
};
