const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { DB, PORT } = require('./config');
const { success, error } = require('console');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const errorMiddleware = require('./middlewares/error');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Routes Middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

app.use(errorMiddleware);
// Server

try {
	mongoose.connect(
		DB,
		{
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true,
		},
		() => console.log(`Successfully connected with the databse ${DB}`)
	);

	// Create server
	app.listen(PORT, () => {
		console.log(`Server started on Port ${PORT}`);
	});
} catch (err) {
	console.log(`Server started on Port ${err}`);
}
