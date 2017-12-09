const db_accessor = require('./db_accessor.js');

function searchMovieByTitle(title, callback)
{
	const query = {
		text: `WITH m AS (SELECT * FROM Movies WHERE LOWER(title) LIKE LOWER(\'%${title}%\')
				SELECT m.movieid, title, genres, AVG(rating) avg_rating 
				FROM Ratings r, m
				WHERE r.movieid = m.movieid
				GROUP BY m.movieid
				ORDER BY avg_rating desc`
	};

	

	db_accessor._select(query, callback);
}
function searchMovieByTitleWithUID(title, userid, end, callback) 
{
	const query = {
		text: `WITH m AS (SELECT * FROM Movies WHERE LOWER(title) LIKE LOWER(\'%${title}%\')),
				u AS (SELECT r.movieid, rating FROM Ratings r, m WHERE r.userid = ${userid} and r.movieid = m.movieid),
				r AS (SELECT r.movieid, AVG(rating) avg_rating FROM Ratings r NATURAL JOIN m GROUP BY r.movieid ORDER BY avg_rating desc LIMIT ${end})
				SELECT m.movieid, title, genres, avg_rating, rating as u_rating 
				FROM r NATURAL JOIN (m NATURAL LEFT JOIN u)`
				
	};
	db_accessor._select(query, callback);
}

function rankMovie(callback)
{
	const query = {
		text: `SELECT m.movieid, title, genres, avg_rating 
				FROM Movies m, (SELECT movieid, AVG(rating) avg_rating FROM Ratings GROUP BY movieid) t 
				WHERE m.movieid = t.movieid 
				ORDER BY avg_rating desc`
	}

	db_accessor._select(query, callback);
}

function rankMovieWithUID(userid, end, callback)
{
	const query = {
		text: `With r AS 
				(SELECT movieid, AVG(rating) avg_rating FROM Ratings GROUP BY movieid ORDER BY avg_rating desc LIMIT ${end}),
				u AS (SELECT movieid, rating FROM Ratings r WHERE r.userid = ${userid}) 
				SELECT r.movieid, title, genres, avg_rating, u.rating as u_rating 
				FROM (r NATURAL LEFT JOIN u) NATURAL JOIN Movies`
	}

	db_accessor._select(query, callback);
}

function insertRating(uid, movie, score, callback)
{
	const query = {
		text: 'INSERT INTO Rating(userid, movieid, rating, timestamp)',
		values: [uid, movie, score, Date.now()]
	}

	db_accessor._insert(query, callback);
}

module.exports = {
	searchMovieByTitle,
	searchMovieByTitleWithUID,
	rankMovie,
	rankMovieWithUID,
	insertRating
}