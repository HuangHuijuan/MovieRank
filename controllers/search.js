const movieModel = require('../models/movie.js');

function searchByTitle(title, userid, page, callback)
{
	


	movieModel.searchMovieByTitleWithUID(title, userid, end, res => {
		const len = res.length;
		const numOfPages = Math.ceil(len / 10);
		let start = 0;
		let end = 10;
		if (page !== undefined) {
			start = (page - 1) * 10;
			end = Math.min(start + 10, len);
		}
		callback({ 
			numOfPages: numOfPages,
			movies: res.slice(start, end);
		});
	});
}

// function searchByTag()
// {
// 	//const tag = request.body.tag;
// 	const tag = 'comedy';

// 	const query = {
// 		text: `SELECT * FROM Movies where LOWER(genres) LIKE LOWER(\'%${tag}%\');`,
// 	};

// 	db_accessor._select(query, res => {
// 		console.log(res);
// 	});
// }

module.exports = {
	searchByTitle,
	// searchByTag
};