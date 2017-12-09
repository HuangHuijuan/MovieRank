const movieModel = require('./movie.js');

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
