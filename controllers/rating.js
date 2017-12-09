const movieModel = require('../models/movie.js');

function rating()
{
	const uid = request.session.user.userid;
	const movie = request.body.movie;
	const score = request.body.score;

	movieModel.insertRating(uid, movie, score);
}

module.exports = {
	rating,
}