const db_accessor = require('../models/db_accessor.js');

function rating()
{
	const uid = request.body.userid;
	const movie = request.body.movie;
	const score = request.body.score;

	const check_user_query = {
		text: 'SELECT userid FROM Users WHERE userid=$1',
		values: [uid]
	}

	db_accessor.select(check_user_query, res => {
		if (res.length == 0) {

		} else {
			insertRating(uid, movie, score);
		}
	});
}

function insertRating(uid, movie, score)
{
	const query = {
		text: 'INSERT INTO Rating(userid, movieid, rating, timestamp)',
		values: [uid, movie, score, Date.now()]
	}

	db_accessor._insert(query);
}

module.exports = {
	rating,
}