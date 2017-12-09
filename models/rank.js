const db_accessor = require('./db_accessor.js');

function rank(userid, page, callback)
{
	let start = 0;
	let end = 10;
	if (page !== undefined) {
		start = (page - 1) * 10;
		end = Math.min(start + 10, len);
	}

	movieModel.rankMovieWithUID(userid, 10, res => {
		const len = res.length;
		const numOfPages = Math.ceil(len / 10);
		callback({
			numOfPages: numOfPages,
			movies: res.slice(start, end)
		});
	});
}

function index(req, res) {
  const data = {
    rankPage: 'yes',
    title: 'Movie Rank'
  };
  res.render('rank', data);
}

module.exports = {
	rank,
	index
}