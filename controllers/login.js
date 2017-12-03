const validator = require('validator');

const db_accessor = require(__dirname + '/db_accessor.js');

function login()
{
	// const email = request.body.email;
	// const pwd = request.body.password;
	const email = '123@gmail.com';
	const pwd = '123';

	let errors = [];

	if (!validator.isLength(email, { min: 1, max: 50}) || !validator.isEmail(email)) {
		errors.push('Invalid email');
	}

	if (!validator.isLength(pwd, { min: 1, max: 50})) {
		errors.push('Invalid password');
	}

	if (errors.length != 0) {

	}

	const query = {
		text: 'SELECT password FROM users WHERE email = $1',
		values: [email]
	}

	db_accessor._select(query, res => {
		if (res.length != 0 && pwd === res[0].password) {
			console.log('Login success!');
		} else {
			console.log('Incorrect password!');
		}
	})
}

module.exports = {
	login,
}