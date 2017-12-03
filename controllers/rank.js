const db_accessor = require(__dirname + '/db_accessor.js');

function rank()
{
	const query = {
		text: 'SELECT title, avg_rating FROM Movies m, (SELECT movieid, AVG(rating) avg_rating FROM Ratings GROUP BY movieid) t WHERE m.movieid = t.movieid ORDER BY avg_rating desc'
	}

	db_accessor._select(query, res => {
		console.log(res);
	})
}

module.exports = {
	rank,
}