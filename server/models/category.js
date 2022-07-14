const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			require: 'Category name is required',
			minLength: [3, 'Too short'],
			maxLength: [32, 'Too long'],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
		parentId: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
