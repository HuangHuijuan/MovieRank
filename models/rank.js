const movieModel = require('./movie.js');

function rank(userid, page, callback)
{
	let start = 0;
	let end = 10;
	if (page !== undefined) {
		start = (page - 1) * 10;
		end = start + 10;
	}

	movieModel.rankMovieWithUID(userid, end, res => {
		const len = res.length;
		const numOfPages = Math.ceil(len / 10);
		callback({
			numOfPages: numOfPages,
			movies: res.slice(start)
		});
	});
}

module.exports = {
	rank,
}
