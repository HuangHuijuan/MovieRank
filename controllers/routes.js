const router = require('express').Router();
const auth = require('../models/auth');

router.get('/', movieRank);
router.get('/login', loginPage);
router.get('/signup', signupPage);
router.get('/movies', movieRank);

router.post('/login', login);
router.post('/register', register);

function login(req, res) {
  const {email, password} = req.body;
  auth.login(email, password, (err, userid) => {
    if(err) {
     return;
    }
    req.session.userid = userid;
    res.redirect('/');
  });
}

function register(req, res) {
  const {email, password} = req.body;
  auth.register(email, password, name, (err, userid) => {
    if(err) {
      return;
    }
    req.session.userid = userid;
    res.redirect('/');
  });
}

function index(req, res) {
  const data = {
    route: '/',
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