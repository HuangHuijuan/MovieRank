const router = require('express').Router();
const auth = require('../models/auth');

router.get('/', requireLogin, movieRank);
router.get('/movies', requireLogin, movieRank);

router.get('/login', loginPage);
router.get('/signup', signupPage);
router.get('/logout', logout);
router.post('/login', login);
router.post('/register', register);

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
    if(errors) {
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
    if(errors) {
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
    route: '/',
    name: req.session.name,
    movies: movies,
  };

  res.render('movie_rank', data);
}

module.exports = router;