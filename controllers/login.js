const validator = require('validator');

const userModel = require('../models/user.js');

function login(request, response)
{
	// const email = request.body.email;
	// const pwd = request.body.password;
	// const email = '123@gmail.com';
	// const pwd = '123';

	let errors = [];

	if (!validator.isLength(email, { min: 1, max: 50}) || !validator.isEmail(email)) {
		errors.push('Invalid email');
	}

	if (!validator.isLength(pwd, { min: 1, max: 50})) {
		errors.push('Invalid password');
	}

	if (errors.length != 0) {
		
	}
	userModel.findUser(email, user => {
		console.log(user);
		if (user) {
			if (user.password === pwd) {
				request.session.user = user;
				console.log('Login success!');
			} else {
				console.log('Incorrect password');
			}
		} else {
			console.log('Email doesn\'t exist!');
		}
	});

}

module.exports = {
	login,
}