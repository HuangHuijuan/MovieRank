const validator = require('validator');

const db_accessor = require(__dirname + '/db_accessor.js');

const userModel = require('../models/user.js');

function register(request, response) 
{
	// const email = request.body.email;
	// const pwd = request.body.password;
	// const username = request.body.username;
	// const genres = request.body.genres;

	const email = '123@gmail.com';
	const pwd = '123';
	const username = 'Alice';
	const genres = ['Romantics', 'Humor', 'Actions'];

	const errors = [];

	if (!validator.isLength(pwd, {min: 1, max: 50})) {
		errors.push('Invalid password');
	}
	if (genres.length < 3) {
		errors.push('You must select at least 3 geners');
	}
	if (!validator.isLength(username, {min: 1, max: 50})) {
		errors.push('Invalid username');
	}
	if (!validator.isEmail(email)) {
		errors.push('Invalid email');
	}

	const check_duplicate_email_query = {
		text: 'select email from users where email = $1',
		values: [email]
	}

	if (errors.length !== 0) {

	}

	userModel.findUser(email, user => {
		if (user) {
			console.log('Email already existed!');
		} else {
			userModel.addUser(email, username, pwd, genres, function() {
				console.log('Register success!');
			});		
		}
	});
}

module.exports = {
	register,
};

