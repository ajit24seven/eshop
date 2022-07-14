const Product = require('../models/product');
const User = require('../models/user');
const slugify = require('slugify');
const ErrorHandler = require('../util/errorHandler');

exports._getAll = async (req, res, next) => {
	try {
		let products = await Product.find({})
			.limit(parseInt(req.params.count))
			.populate('category')
			.populate('createdBy')
			.populate('ratings')
			.populate('reviews')
			.populate('subs')
			.sort([['createdAt', 'desc']])
			.exec();
		res.status(200).json({
			success: true,
			product: products,
		});
	} catch (err) {
		next(new ErrorHandler(err.message, 400));
	}
};

exports._create = async (req, res, next) => {
	try {
		req.body.slug = slugify(req.body.title);

		const product = await Product.findOne({ slug: req.body.slug });
		if (product) {
			return next(new ErrorHandler('Product is already exist', 400));
		}

		let productPictures = [];

		if (req.files && req.files.length > 0) {
			productPictures = req.files.map((file) => {
				return { img: file.location };
			});
		}

		req.body.productPictures = productPictures;

		const newProduct = await new Product(req.body).save();
		if (newProduct.error) return res.status(400).json({ error });
		res.status(201).json({
			success: true,
			product: newProduct,
		});
	} catch (err) {
		next(new ErrorHandler(err.message, 400));
	}
};

exports._getOne = async (req, res, next) => {
	try {
		const product = await Product.findOne({ slug: req.params.slug })
			.populate('category')
			.populate('createdBy')
			.populate('ratings')
			.populate('reviews')
			.populate('subs')
			.sort([['createdAt', 'desc']])
			.exec();

		res.status(200).json({
			success: true,
			product: product,
		});
	} catch (err) {
		next(new ErrorHandler(err.message, 400));
	}
};

exports._update = async (req, res, next) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const product = await Product.findOne({ slug: req.params.slug });

		if (!product) {
			return next(new ErrorHandler('Product is not available', 400));
		}

		const updated = await Product.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true }
		).exec();

		res.status(200).json({
			success: true,
			product: updated,
		});
	} catch (err) {
		next(new ErrorHandler('Product is update failed', 400));
	}
};

exports._delete = async (req, res, next) => {
	try {
		const product = await Product.findOne({ slug: req.params.slug });

		if (!product) {
			return next(new ErrorHandler('Product is not available', 400));
		}

		const deleted = await Product.findOneAndRemove({
			slug: req.params.slug,
		}).exec();

		res.status(200).json({
			success: true,
			product: deleted,
		});
	} catch (err) {
		next(new ErrorHandler('Product is delete failed', 400));
	}
};
