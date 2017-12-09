const router = require('express').Router();
const auth = require('../models/auth.js');
const movie = require('../models/movie.js');
const rank = require('../models/rank.js');
const searchController = require('./search.js');

router.get('/', requireLogin, movieRank);
router.get('/login', loginPage);
router.get('/signup', signupPage);
router.get('/logout', logout);
router.post('/login', login);
router.post('/register', register);
router.post('/movies/:movieId/:rating', addRatingToMovie);

function requireLogin(req, res, next) {
  if (req.session && req.session.userid) {
    req.userid = req.session.userid;
    next();
  } else {
    res.redirect('/login');
  }
}

function login(req, res) {
  const {email, password} = req.body;
  auth.login(email, password, (errors, user) => {
    if (errors) {
      console.log(errors)
      const data = {
        errors: errors,
        route: '/login',
        title: 'Login - Movie Rank'
      };
      res.render('login', data);
      return;
    }
    req.session.userid = user.userid;
    req.session.name = user.name;
    res.redirect('/');
  });
}

function register(req, res) {
  const {email, password, name} = req.body;
  auth.register(email, password, name, (errors, userid) => {
    if (errors) {
      const data = {
        errors: errors,
        route: '/signup',
        title: 'Sign Up - Movie Rank'
      };
      res.render('signup', data);
      return;
    }
    req.session.userid = userid;
    req.session.name = name;
    res.redirect('/');
  });
}

function logout(req, res) {
  req.session.userid = undefined;
  req.session.name = undefined;
  res.redirect('/login');
}

function index(req, res) {
  const data = {
    route: '/',
    name: req.session.name,
    title: 'Index - Movie Rank'
  };
  res.render('movie_rank', data);
}

function loginPage(req, res) {
  const data = {
    route: '/login',
    title: 'Login - Movie Rank'
  };
  res.render('login', data);
}

function signupPage(req, res) {
  const data = {
    route: '/signup',
    title: 'Sign Up - Movie Rank'
  };
  res.render('signup', data);
}

function movieRank(req, res) {
  let {page, search} = req.query;
  page = page || 1;
  console.log('movieRank', search, page);
  if(!search) {
    rank.rank(req.userid, page, (ret) => {
      const movies = ret.movies.map(movie => {
        movie.avg_rating = movie.avg_rating.toFixed(1);
        return movie;
      });
      const data = {
        route: '/',
        name: req.session.name,
        numOfPages: ret.numOfPages,
        movies: movies,
      };
      res.render('movie_rank', data);
    });
  }
  searchController.searchByTitle(search, req.userid, page, (ret) => {
    const movies = ret.movies.map(movie => {
      movie.avg_rating = movie.avg_rating.toFixed(1);
      return movie;
    });
    const data = {
      route: '/',
      name: req.session.name,
      numOfPages: ret.numOfPages,
      movies: movies,
    };
    res.render('movie_rank', data);
  });
}

function addRatingToMovie(req, res) {
  const {movieId, rating} = req.params;
  console.log('addRatingToMovie', movieId, rating, req.userid);
  movie.insertRating(req.userid, movieId, rating, () => {
    res.json({succ: 'success'});
  });
}

module.exports = router;