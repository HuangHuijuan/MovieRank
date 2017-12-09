const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();
const indexController = require('./controllers/index.js');
const registerController = require('./controllers/register.js');
const loginController = require('./controllers/login.js');
const searchController = require('./controllers/search.js');
const rankController = require('./controllers/rank.js');
const recommand = require('./controllers/recommand.js');
const session = require('client-sessions');
const userModel = require('./models/user.js');

//Here we are configuring express to use body-parser as middle-ware.
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add session handler middleware
app.use(session({
  cookieName: 'session',
  secret: 'movierank',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use('/', indexController);
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    userModel.findUser(req.session.user.email, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

// app.get('/', requireLogin, indexController);
// app.get('/rank', requireLogin, rankController.index);

app.get('/', indexController);
app.get('/rank', rankController.index);

app.post('/recommand', function(req, res){
  var param = req.body.userid;
  console.log(param);
  recommand._credence_recommand(param, (result) => res.json(result));
});


const server = app.listen(3001, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



// registerController.register();


// const db_accessor = require('./controllers/db_accessor.js');

// // const delete_query = {
// // 	text: 'delete from users where username = $1',
// // 	values: ['Alice']
// // }
// // db_accessor._delete(delete_query);

// const select_query = {
// 	text: 'select * from users limit 10'
// }
// db_accessor._select(select_query, res => {
// 	console.log(res);
// })

// const userid = 2;

// recommand._credence_recommand(userid, (result) => console.log(result));

// loginController.login();

searchController.searchByTitle();




