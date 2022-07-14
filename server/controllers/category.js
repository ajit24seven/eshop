const Category = require('../models/category');
const slugify = require('slugify');
const ErrorHandler = require('../util/errorHandler');

function buildCategory(categories, parentId = null) {
	const categoryList = [];
	let category;

	if (parentId == null) {
		category = categories.filter(
			(cat) => cat.parentId === undefined || cat.parentId === ''
		);
	} else {
		category = categories.filter((cat) => cat.parentId === parentId);
	}

	for (let cat of category) {
		categoryList.push({
			_id: cat._id,
			name: cat.name,
			slug: cat.slug,
			children: buildCategory(categories, cat._id.toString()),
		});
	}

	return categoryList;
}

exports.createProducts = async (req, res, next) => {
	const { name, parentId } = req.body;
	if (name === '') {
		return next(new ErrorHandler('Name is required', 400));
	}
	const dbCategory = await Category.findOne({ name });
	if (dbCategory) return res.status(400).send('Category already exist');

	const category = await new Category({
		name,
		slug: slugify(name),
		parentId,
	}).save();

	res.json({ success: true, category: category });
};

exports.getAllProducts = async (req, res, next) => {
	try {
		const categories = await Category.find({})
			.sort({ createdAt: -1 })
			.exec();

		if (categories) {
			const categoryList = buildCategory(categories);
			res.json({ categories, categoryList });
		}
	} catch (error) {
		res.status(500).send('An error occurred', error);
	}
};

exports.getProductDetails = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const category = await Category.findOne({ slug }).exec();
		res.json(category);
	} catch (error) {
		res.status(500).send('an error occurred', error);
	}
};
exports.updateProduct = async (req, res, next) => {
	try {
		const { name, parentId } = req.body;
		const { slug } = req.params;

		const category = await Category.findOneAndUpdate(
			{ slug },
			{ name, slug: slugify(name), parentId },
			{ new: true }
		);
		res.json(category);
	} catch (error) {
		res.status(400).send('Updation failed', error);
	}
};

exports.deleteProduct = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const { id } = req.body;

		const hasChildren = await Category.findOne({
			parentId: id,
		}).exec();

		if (hasChildren) {
			return next(
				new ErrorHandler(
					'Please remove sub categories befor removing the parent',
					400
				)
			);
		}

		console.log(hasChildren);
		const dbCategory = await Category.findOne({ slug });
		if (!dbCategory) return res.status(400).send('Category does not exist');

		const category = await Category.findOneAndDelete({ slug });
		res.json(category);
	} catch (error) {
		res.status(400).send('Deletion failed', error);
	}
};
