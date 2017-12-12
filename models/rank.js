const db_accessor = require('./db_accessor.js');
const movieModel = require('./movie.js');

let movies = [];
let ratings = [];


function rank(userid, page, callback)
{
	movieModel.rankMovieWithUID(userid, res => {
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
			movies: res.slice(start, end)
		});
	});
	// if (movies.length == 0) {
	// 	movieModel.rankMovie(res => {
	// 		getRatings(res, page, userid, callback);
	// 	})
	// } else {
	// 	getRatings(movies, page, userid, callback);
	// }
	
}

function getRatings(movies, page, userid, callback) {
	const len = movies.length;
	let start = 0;
	let end = 10;
	if (page !== undefined) {
		start = (page - 1) * 10;
		end = Math.min(start + 10, len);
	}
	ratings = movies.slice(start, end);
	// console.log(ratings);
	ratings.forEach( e => {
		movieModel.userRating(userid, e.movieid, res => {
			if (res.length !== 0) {
				e.u_rating = res[0].rating;
			} else {
				e.u_rating = 0;
			}
		});
		console.log('....')
		console.log(e);
	}, callback({
		numOfPages: len,
		movies: ratings
	}));
	
}



function index(req, res) {
  const data = {
    rankPage: 'yes',
    title: 'Movie Rank'
  };
  res.render('rank', data);
}

module.exports = {
  rank(userid, page, callback) {
    movieModel.rankMovieWithUID(userid, res => {
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
        movies: res.slice(start, end)
      });
    });
  }
};
