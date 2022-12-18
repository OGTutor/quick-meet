const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get('port') ?? 8080;

// if (process.env.NODE_ENV === 'production') {
// 	console.log('Production');
// } else {
// 	console.log('Development');
// }

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'));
		app.listen(PORT, () => {
			console.log(chalk.green(`Server has been started on port ${PORT}...`));
		});
	} catch (error) {
		console.log(chalk.red(error.message));
		process.exit(1);
	}
}

start();
