const db_accessor = require(__dirname + '/db_accessor.js');
const movieModel = require('../models/movie.js');

function rank(userid)
{
	const userid = request.session.user.userid;
	const page = request.params.page;

	let start = 0;
	let end = 10;
	if (page !== undefined) {
		start = (page - 1) * 10;
		end = Math.min(start + 10, len);
	}

	movieModel.rankMovieWithUID(userid, 10, res => {
		const len = res.length;
		const numOfPages = Math.ceil(len / 10);
		response.render('', { /* TODO */
			numOfPages: numOfPages,
			movies: res.slice(start, end)
		});
	
		// console.log(res);
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
