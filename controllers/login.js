const validator = require('validator');

const db_accessor = require(__dirname + '/db_accessor.js');

function login()
{
	// const email = request.body.email;
	// const pwd = request.body.password;
	const email = '123@gmail.com';
	const pwd = '123';

	const query = {
		text: 'select password from users where email = $1',
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