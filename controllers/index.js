const router = require('express').Router();

router.get('/', index);
router.get('/login', login);
router.get('/signup', signup);
router.get('/rank', rank);

function index(req, res) {
  const data = {
    route: '/',
    title: 'Index - Movie Rank'
  };
  res.render('movie_rank', data);
}

function login(req, res) {
  const data = {
    route: '/login',
    title: 'Login - Movie Rank'
  };
  res.render('login', data);
}

function signup(req, res) {
  const data = {
    route: '/signup',
    title: 'Sign Up - Movie Rank'
  };
  res.render('signup', data);
}

function rank(req, res) {
  const movies = [
    {
      movieId: 'a',
      title: "Justice League",
      genre: "Fun",
      rating: 5,
    },
    {
      movieId: 'b',
      title: "Thor",
      genre: "Fun",
      rating: 0,
    },
    {
      movieId: 'c',
      title: "Avengers: Infinite War",
      genre: "Fun",
      rating: 4,
    },
  ];

  const data = {
    route: '/rank',
    movies: movies,
  };

  res.render('movie_rank', data);
}

module.exports = router;