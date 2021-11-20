const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res, next) => {
	try {
		const { name } = req.body;
		const dbCategory = await Category.findOne({ name });
		if (dbCategory) return res.status(400).send('Category already exist');

		const category = await new Category({
			name,
			slug: slugify(name),
		}).save();

		res.json(category);
	} catch (error) {
		res.status(400).send('An error occurred', error);
	}
};
exports.list = async (req, res, next) => {
	try {
		const categories = await Category.find({})
			.sort({ createdAt: -1 })
			.exec();
		res.json(categories);
	} catch (error) {
		res.status(500).send('An error occurred', error);
	}
};
exports.read = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const category = await Category.findOne({ slug }).exec();
		res.json(category);
	} catch (error) {
		res.status(500).send('an error occurred', error);
	}
};
exports.update = async (req, res, next) => {
	try {
		const { name } = req.body;
		const { slug } = req.params;

		const category = await Category.findOneAndUpdate(
			{ slug },
			{ name, slug: slugify(name) },
			{ new: true }
		);
		res.json(category);
	} catch (error) {
		res.status(400).send('Updation failed', error);
	}
};
exports.remove = async (req, res, next) => {
	try {
		const { slug } = req.params;

		const dbCategory = await Category.findOne({ slug });
		if (!dbCategory) return res.status(400).send('Category does not exist');

		const category = await Category.findOneAndDelete({ slug });
		res.json(category);
	} catch (error) {
		res.status(400).send('Deletion failed', error);
	}
};
