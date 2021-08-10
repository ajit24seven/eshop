require('dotenv').config();

module.exports = {
	DB: process.env.APP_DB,
	SECRET: process.env.APP_SECRET_KEY,
	PORT: process.env.APP_PORT,
};
