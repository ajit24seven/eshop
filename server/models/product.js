const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		offer: { type: Number },
		productPictures: [{ img: { type: String } }],
		sold: {
			type: Number,
			default: 0,
		},
		shipping: {
			type: String,
			enum: ['Yes', 'No'],
		},
		color: {
			type: String,
			enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
		},
		brand: {
			type: String,
			enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
		},
		ratings: [
			{
				star: Number,
				postedBy: { type: ObjectId, ref: 'User' },
			},
		],
		reviews: [
			{
				userId: { type: ObjectId, ref: 'User' },
				review: String,
			},
		],
		category: {
			type: ObjectId,
			ref: 'Category',
			required: true,
		},
		createdBy: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
		inStock: {
			type: Boolean,
			required: true,
			enum: [true, false],
		},
		updatedAt: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
