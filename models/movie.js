const db_accessor = require('./db_accessor.js');

function searchMovieByTitle(title, callback)
{
	const query = {
		text: `WITH m AS (SELECT * FROM Movies WHERE LOWER(title) LIKE LOWER(\'%${title}%\')
				SELECT m.movieid, title, genre, AVG(rating) avg_rating 
				FROM Ratings r, m
				WHERE r.movieid = m.movieid
				GROUP BY m.movieid
				ORDER BY avg_rating desc`
	};

	

	db_accessor._select(query, callback);
}
function searchMovieByTitleWithUID(title, userid, callback) 
{
	const query = {
		text: `WITH m AS (SELECT * FROM Movies WHERE LOWER(title) LIKE LOWER(\'%${title}%\')),
				u AS (SELECT r.movieid, rating FROM Ratings r, m WHERE r.userid = ${userid} and r.movieid = m.movieid),
				r AS (SELECT movieid, score FROM moviescore ORDER BY score DESC)
				SELECT m.movieid, title, genre, score, rating as u_rating 
				FROM r NATURAL JOIN (m NATURAL LEFT JOIN u)`
				
	};
	db_accessor._select(query, callback);
}

function rankMovie(callback)
{
	const query = {
		text: `SELECT m.movieid, title, genre, score 
				FROM Movies m, MovieScore s
				WHERE m.movieid = s.movieid 
				ORDER BY score DESC
				limit 10`
	}

	db_accessor._select(query, callback);
}

function rankMovieWithUID(userid, callback)
{
	const query = {
		text: `With r AS 
				(SELECT movieid, score FROM moviescore),
				u AS (SELECT movieid, rating FROM Ratings r WHERE r.userid = ${userid}) 
				SELECT r.movieid, title, genre, score, u.rating as u_rating 
				FROM (r NATURAL LEFT JOIN u) NATURAL JOIN Movies`
	}

	db_accessor._select(query, callback);
}

function insertRating(uid, movie, score, callback)
{
	const query = {
		text: 'INSERT INTO Ratings(userid, movieid, rating, timestamp) values ($1, $2, $3, $4) returning userid',
		values: [uid, movie, score, Date.now()]
	}
	console.log('insertRating', query.values);
	db_accessor._insert(query, callback);
}

function userRating(uid, mid, callback) {
	const query = {
		text: `SELECT movieid, rating FROM Ratings WHERE userid=${uid} and movieid=${mid}`
	}
}

module.exports = {
	searchMovieByTitle,
	searchMovieByTitleWithUID,
	rankMovie,
	rankMovieWithUID,
	insertRating,
	userRating
}
