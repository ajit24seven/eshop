const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
	{
		name: 'string',
		email: {
			type: 'string',
			required: true,
			index: true,
		},
		role: {
			type: 'string',
			default: 'subscriber',
		},
		cart: {
			type: 'array',
			default: [],
		},
		address: 'string',
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
