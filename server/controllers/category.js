const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res, next) => {
	try {
		const { name } = req.body;
		const dbCategory = await Category.findOne({ name });
		if (dbCategory) return res.status(400).send('category already exist');

		const category = new Category({
			name,
			slugify: slugify(name),
		});

		category.save((error, res) => {
			if (error) return res.status(400).send('an error occurred', error);
			res.status(200).send({ message: 'category was created' });
		});
	} catch (error) {
		res.status(400).send('an error occurred', error);
	}
};
exports.list = async (req, res, next) => {
	try {
	} catch (error) {}
};
exports.read = async (req, res, next) => {
	try {
	} catch (error) {}
};
exports.update = async (req, res, next) => {
	try {
	} catch (error) {}
};
exports.remove = async (req, res, next) => {
	try {
	} catch (error) {}
};
