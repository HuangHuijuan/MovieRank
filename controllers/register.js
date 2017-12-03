const validator = require('validator');

const db_accessor = require(__dirname + '/db_accessor.js');

function register() 
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

	db_accessor._select(check_duplicate_email_query, res => {
		if (res.length != 0) {
			console.log('Email already existed!');
		} else {
			insertUserData(email, username, pwd, genres);
		}
	})
}

function insertUserData(email, username, pwd, genres) 
{
	const str = genres.join('|');
	const query = {
		text: 'INSERT INTO Users(email, username, password, genres) VALUES ($1, $2, $3, $4) RETURNING userid',
		values: [email, username, pwd, str]
	};
	db_accessor._insert(query);

	//db_accessor._insert(query, uid => {
		// genres.forEach(element => {
		// 	const query = {
		// 		text: 'INSERT INTO Genres(userid, genre) VALUES ($1, $2)',
		// 		values: [uid, element]
		// 	};
		// 	db_accessor._insert(query);
		// });
	//});
}

module.exports = {
	register,
};

