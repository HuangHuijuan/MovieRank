const movieModel = require('../models/movie.js');

function rating(uid, movie, score)
{
	movieModel.insertRating(uid, movie, score);
}

module.exports = {
	rating,
}